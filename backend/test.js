require('dotenv').config();
const axios = require('axios');

async function test() {
  try {
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
    console.log("Response keys:", Object.keys(response.data));
    if (response.data.edge_owner_to_timeline_media && response.data.edge_owner_to_timeline_media.edges) {
      const firstPost = response.data.edge_owner_to_timeline_media.edges[0];
      console.log("Shortcode:", firstPost.node ? firstPost.node.shortcode : firstPost.shortcode);
    } else {
      console.log("No edges found");
    }
  } catch (error) {
    console.error(error.message);
  }
}
test();
