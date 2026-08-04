require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

// In-memory cache
let cachedReels = null;
let lastFetchTime = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Fallback data in case the RapidAPI call fails or we hit limits
const fallbackReels = [
  {
    id: 1,
    videoSrc: '/images/gallery/Aamby valley carnival.mp4',
    likes: '12.4K',
    comments: '342',
    isLocal: true,
  },
  {
    id: 2,
    videoSrc: '/images/gallery/Aamby Valley wedding.mp4',
    likes: '8.9K',
    comments: '156',
    isLocal: true,
  },
  {
    id: 3,
    videoSrc: '/images/gallery/F&G 3.mp4',
    likes: '15.2K',
    comments: '428',
    isLocal: true,
  }
];

app.get('/api/reels', async (req, res) => {
  const now = Date.now();

  // If cache is valid, return it immediately
  if (cachedReels && lastFetchTime && (now - lastFetchTime < CACHE_DURATION)) {
    // Returning cached Instagram reels
    return res.json(cachedReels);
  }

  // Otherwise, fetch from RapidAPI
  try {
    // Fetching fresh Instagram data from RapidAPI...
    
    // Most Instagram scrapers use /profile or a similar endpoint and take a username
    const options = {
      method: 'GET',
      url: `https://${process.env.RAPIDAPI_HOST}/profile`,
      params: { username: 'abhnya_by_as_events' },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
      }
    };

    const response = await axios.request(options);
    const data = response.data;
    
    // Attempt to parse out reels/posts from the standard Instagram looter response format.
    // If we can't parse it (because the endpoint structure varies), we will fall back to local data.
    let parsedReels = [];
    
    // Very naive mapping assuming standard graphQL edge nodes or direct array
    const posts = data.items || (data.graphql && data.graphql.user && data.graphql.user.edge_owner_to_timeline_media?.edges) || data.edge_owner_to_timeline_media?.edges || [];
    
    if (posts.length > 0) {
      const host = req.get('host');
      const protocol = req.headers['x-forwarded-proto'] || req.protocol;
      const backendUrl = `${protocol}://${host}`;

      parsedReels = posts.slice(0, 3).map((post, index) => {
        const item = post.node || post;
        const rawUrl = item.video_url || item.display_url || item.thumbnail_src;
        return {
          id: item.id || index,
          shortcode: item.shortcode,
          videoSrc: `${backendUrl}/api/proxy?url=${encodeURIComponent(rawUrl)}`,
          likes: item.edge_liked_by ? item.edge_liked_by.count : (item.like_count || '1K+'),
          comments: item.edge_media_to_comment ? item.edge_media_to_comment.count : (item.comment_count || '50+'),
          isLocal: false
        };
      });
    }

    if (parsedReels.length > 0) {
      cachedReels = parsedReels;
      lastFetchTime = now;
      // Cache updated successfully
      return res.json(cachedReels);
    } else {
      // API returned data, but no posts found. Using fallback.
      return res.json(fallbackReels);
    }

  } catch (error) {
    console.error('Error fetching from RapidAPI:', error.message);
    // If the API fails (e.g. limit reached, wrong endpoint), return fallback videos so site doesn't break
    // Serving fallback local reels
    return res.json(fallbackReels);
  }
});

// Proxy endpoint to bypass Instagram CDN CORS/Hotlink protection
app.get('/api/proxy', async (req, res) => {
  try {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send('No URL provided');
    
    const response = await axios({
      method: 'GET',
      url: targetUrl,
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'video/webm,video/ogg,video/*;q=0.9,application/ogg;q=0.7,audio/*;q=0.6,*/*;q=0.5'
      }
    });

    // Pass through relevant headers
    if (response.headers['content-type']) {
      res.setHeader('Content-Type', response.headers['content-type']);
    }
    if (response.headers['content-length']) {
      res.setHeader('Content-Length', response.headers['content-length']);
    }

    response.data.pipe(res);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).send('Proxy error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
