import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, X, Image as ImageIcon, Film, Maximize2, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const galleryItems = [
  {
    id: 'v1',
    type: 'video',
    title: 'Aamby Valley Carnival Extravaganza',
    category: 'Video',
    src: '/images/gallery/Aamby valley carnival.mp4',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'i22',
    type: 'image',
    title: 'Yash & Isha - Beautiful Decor',
    category: 'Couple',
    src: '/images/gallery/Y&I 20.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i12',
    type: 'image',
    title: 'Yash & Isha - Traditional Attire',
    category: 'Couple',
    src: '/images/gallery/Y&I 11.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i20',
    type: 'image',
    title: 'Yash & Isha - Sparkling Exits',
    category: 'Couple',
    src: '/images/gallery/Y&I 19.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'v5',
    type: 'video',
    title: 'Foram & Gunj - The Celebration',
    category: 'Celebration',
    src: '/images/gallery/F&G 3.mp4',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'i13',
    type: 'image',
    title: 'Yash & Isha - Family Blessings',
    category: 'Couple',
    src: '/images/gallery/Y&I 12.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i31',
    type: 'image',
    title: 'Yash & Isha - Groom Arrival',
    category: 'Couple',
    src: '/images/gallery/Y&I 5.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i18',
    type: 'image',
    title: 'Yash & Isha - Candid Laughter',
    category: 'Couple',
    src: '/images/gallery/Y&I 17.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'v2',
    type: 'video',
    title: 'Aamby Valley Grand Wedding',
    category: 'Video',
    src: '/images/gallery/Aamby Valley wedding.mp4',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'i14',
    type: 'image',
    title: 'Yash & Isha - Reception Glamour',
    category: 'Couple',
    src: '/images/gallery/Y&I 13.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i35',
    type: 'image',
    title: 'Yash & Isha - Sindoor Moment',
    category: 'Couple',
    src: '/images/gallery/Y&I 9.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i10',
    type: 'image',
    title: 'Yash & Isha - Pre-Wedding Romance',
    category: 'Couple',
    src: '/images/gallery/Y&I 1.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'v7',
    type: 'video',
    title: 'Fairmont Mumbai Royal Reception',
    category: 'Video',
    src: '/images/gallery/Fairmont Mumbai.mp4',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'i4',
    type: 'image',
    title: 'Foram & Gunj - Sacred Vows',
    category: 'Celebration',
    src: '/images/gallery/F&G 2.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i27',
    type: 'image',
    title: 'Yash & Isha - Celebration Vibes',
    category: 'Couple',
    src: '/images/gallery/Y&I 25.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i25',
    type: 'image',
    title: 'Yash & Isha - Elegant Touches',
    category: 'Couple',
    src: '/images/gallery/Y&I 23.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'v6',
    type: 'video',
    title: 'Fairfield Marriott Elegance',
    category: 'Video',
    src: '/images/gallery/Fairfield.mp4',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'i16',
    type: 'image',
    title: 'Yash & Isha - Cake Cutting',
    category: 'Couple',
    src: '/images/gallery/Y&I 15.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i28',
    type: 'image',
    title: 'Yash & Isha - A Perfect Ending',
    category: 'Couple',
    src: '/images/gallery/Y&I 26.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i30',
    type: 'image',
    title: 'Yash & Isha - Bridal Glow',
    category: 'Couple',
    src: '/images/gallery/Y&I 4.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'v36',
    type: 'video',
    title: 'Yash & Isha - The Main Event',
    category: 'Couple',
    src: '/images/gallery/Y&I main.mp4',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'i34',
    type: 'image',
    title: 'Yash & Isha - Sacred Pheras',
    category: 'Couple',
    src: '/images/gallery/Y&I 8.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i21',
    type: 'image',
    title: 'Yash & Isha - Joyful Haldi',
    category: 'Couple',
    src: '/images/gallery/Y&I 2.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i15',
    type: 'image',
    title: 'Yash & Isha - First Dance',
    category: 'Couple',
    src: '/images/gallery/Y&I 14.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'v9',
    type: 'video',
    title: 'Cinematic Wedding Highlights',
    category: 'Video',
    src: '/images/gallery/Video-45042.mp4',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'i24',
    type: 'image',
    title: 'Yash & Isha - Table Settings',
    category: 'Couple',
    src: '/images/gallery/Y&I 22.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i11',
    type: 'image',
    title: 'Yash & Isha - The Mandap Magic',
    category: 'Couple',
    src: '/images/gallery/Y&I 10.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i19',
    type: 'image',
    title: 'Yash & Isha - Twilight Portraits',
    category: 'Couple',
    src: '/images/gallery/Y&I 18.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'v8',
    type: 'video',
    title: 'V&Y - A Timeless Union',
    category: 'Video',
    src: '/images/gallery/V&Y.mp4',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'i3',
    type: 'image',
    title: 'Foram & Gunj - Vibrant Sangeet',
    category: 'Celebration',
    src: '/images/gallery/F&G 1.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i29',
    type: 'image',
    title: 'Yash & Isha - Mehendi Details',
    category: 'Couple',
    src: '/images/gallery/Y&I 3.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i17',
    type: 'image',
    title: 'Yash & Isha - Toast to Love',
    category: 'Couple',
    src: '/images/gallery/Y&I 16.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i26',
    type: 'image',
    title: 'Yash & Isha - Musical Nights',
    category: 'Couple',
    src: '/images/gallery/Y&I 24.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i33',
    type: 'image',
    title: 'Yash & Isha - Varmala Ceremony',
    category: 'Couple',
    src: '/images/gallery/Y&I 7.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i23',
    type: 'image',
    title: 'Yash & Isha - Floral Mandap',
    category: 'Couple',
    src: '/images/gallery/Y&I 21.jpg',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'i32',
    type: 'image',
    title: 'Yash & Isha - The Grand Entrance',
    category: 'Couple',
    src: '/images/gallery/Y&I 6.jpg',
    aspect: 'aspect-[4/5]'
  }
];

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [centeredIndex, setCenteredIndex] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);

  const handleDownloadLookbook = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder("Lookbook-Gallery");

      const fetchPromises = galleryItems.map(async (item, index) => {
        try {
          const response = await fetch(item.src);
          const blob = await response.blob();
          
          // Extract filename from URL (e.g. '/images/gallery/Y&I 20.jpg' -> 'Y&I 20.jpg')
          let filename = item.src.split('/').pop();
          if (!filename) {
            const extension = item.src.split('.').pop() || (item.type === 'video' ? 'mp4' : 'jpg');
            filename = `gallery_item_${index}.${extension}`;
          }
          // decode in case there are URL-encoded characters like %20
          filename = decodeURIComponent(filename);

          folder.file(filename, blob);
        } catch (err) {
          console.error(`Failed to fetch ${item.src}`, err);
        }
      });

      await Promise.all(fetchPromises);
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "Lookbook_Gallery.zip");
    } catch (error) {
      console.error("Error creating zip file:", error);
      alert("Failed to download the lookbook. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const filteredItems = galleryItems.filter(item => {
    if (filter === 'photos') return item.type === 'image';
    if (filter === 'videos') return item.type === 'video';
    return true;
  });

  // Center an item by index
  const scrollToIndex = useCallback((index) => {
    if (!scrollContainerRef.current || !cardRefs.current[index]) return;
    const container = scrollContainerRef.current;
    const card = cardRefs.current[index];
    
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const targetScrollLeft = cardCenter - container.clientWidth / 2;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: 'smooth'
    });
    setCenteredIndex(index);
  }, []);

  // Recalculate closest card to center on scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    filteredItems.forEach((_, idx) => {
      const card = cardRefs.current[idx];
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== centeredIndex) {
      setCenteredIndex(closestIndex);
    }
  };

  // Reset to first item when filter changes
  useEffect(() => {
    setCenteredIndex(0);
    setTimeout(() => {
      scrollToIndex(0);
    }, 100);
  }, [filter, scrollToIndex]);

  // Initial scroll position
  useEffect(() => {
    const timer = setTimeout(() => scrollToIndex(0), 200);
    return () => clearTimeout(timer);
  }, [scrollToIndex]);

  // Auto-play centered video ref
  const videoRefs = useRef({});

  useEffect(() => {
    // Pause all non-centered videos, play centered video if it's a video
    Object.keys(videoRefs.current).forEach((idxStr) => {
      const idx = parseInt(idxStr, 10);
      const vid = videoRefs.current[idxStr];
      if (vid) {
        if (idx === centeredIndex) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
          vid.currentTime = 0;
        }
      }
    });
  }, [centeredIndex]);

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeMediaIndex !== null) {
        if (e.key === 'Escape') setActiveMediaIndex(null);
        else if (e.key === 'ArrowRight') setActiveMediaIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
        else if (e.key === 'ArrowLeft') setActiveMediaIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
      } else {
        if (e.key === 'ArrowRight') scrollToIndex(Math.min(filteredItems.length - 1, centeredIndex + 1));
        else if (e.key === 'ArrowLeft') scrollToIndex(Math.max(0, centeredIndex - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMediaIndex, centeredIndex, filteredItems.length, scrollToIndex]);

  return (
    <section id="gallery" className="section-padding bg-cream/20 relative overflow-hidden py-16 sm:py-24">
      <div className="w-[95%] max-w-[1500px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-calico mb-2 block">Gallery</span>
          <h2 className="text-4xl md:text-5xl mb-3 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-calico hidden sm:block"></span>
            Real Weddings, <span className="script-text ml-2">Real Stories</span>
            <span className="w-12 h-px bg-calico hidden sm:block"></span>
          </h2>
          <p className="text-matteBlack/70 max-w-2xl mx-auto text-sm sm:text-base">
            Explore every highlight in our 3D coverflow showcase.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-full shadow-sm border border-calico/20">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === 'all'
                  ? 'bg-calico text-white shadow-md'
                  : 'text-matteBlack/70 hover:text-calicoDark'
              }`}
            >
              All ({galleryItems.length})
            </button>
            <button
              onClick={() => setFilter('photos')}
              className={`px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                filter === 'photos'
                  ? 'bg-calico text-white shadow-md'
                  : 'text-matteBlack/70 hover:text-calicoDark'
              }`}
            >
              <ImageIcon size={14} /> Photos ({galleryItems.filter(i => i.type === 'image').length})
            </button>
            <button
              onClick={() => setFilter('videos')}
              className={`px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                filter === 'videos'
                  ? 'bg-calico text-white shadow-md'
                  : 'text-matteBlack/70 hover:text-calicoDark'
              }`}
            >
              <Film size={14} /> Videos ({galleryItems.filter(i => i.type === 'video').length})
            </button>
          </div>
        </div>

        {/* 3D Coverflow Single-Row Container */}
        <div className="relative group py-6">
          
          {/* Left / Right Edge Gradient Overlay for Smooth Fading */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-cream via-cream/60 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-cream via-cream/60 to-transparent z-20 pointer-events-none" />

          {/* Navigation Arrows */}
          <button
            onClick={() => scrollToIndex(Math.max(0, centeredIndex - 1))}
            disabled={centeredIndex === 0}
            className={`absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full border border-calico/30 transition-all duration-300 backdrop-blur-md shadow-xl ${
              centeredIndex > 0
                ? 'bg-white/90 text-calicoDark hover:bg-calico hover:text-white hover:border-calico cursor-pointer'
                : 'bg-white/40 text-gray-300 border-gray-200 cursor-not-allowed'
            }`}
            aria-label="Previous Item"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scrollToIndex(Math.min(filteredItems.length - 1, centeredIndex + 1))}
            disabled={centeredIndex === filteredItems.length - 1}
            className={`absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full border border-calico/30 transition-all duration-300 backdrop-blur-md shadow-xl ${
              centeredIndex < filteredItems.length - 1
                ? 'bg-white/90 text-calicoDark hover:bg-calico hover:text-white hover:border-calico cursor-pointer'
                : 'bg-white/40 text-gray-300 border-gray-200 cursor-not-allowed'
            }`}
            aria-label="Next Item"
          >
            <ChevronRight size={24} />
          </button>

          {/* Single Row Horizontal Coverflow Scroll Track */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex items-center overflow-x-auto scrollbar-none scroll-smooth py-10 px-[35vw] sm:px-[40vw] gap-6 sm:gap-10 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredItems.map((item, index) => {
              const isCentered = index === centeredIndex;

              return (
                <div
                  key={item.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  onClick={() => {
                    if (isCentered) {
                      setActiveMediaIndex(index);
                    } else {
                      scrollToIndex(index);
                    }
                  }}
                  className={`relative flex-shrink-0 snap-center transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden bg-matteBlack ${
                    isCentered
                      ? 'w-[280px] sm:w-[340px] md:w-[380px] aspect-[9/14] scale-105 sm:scale-110 z-20 shadow-[0_20px_50px_rgba(212,175,55,0.35)] border-2 border-calico opacity-100 ring-4 ring-calico/20'
                      : 'w-[220px] sm:w-[260px] md:w-[290px] aspect-[9/14] scale-90 sm:scale-95 z-10 opacity-55 hover:opacity-85 border border-calico/20 grayscale-[20%] hover:grayscale-0'
                  }`}
                >
                  {/* Media (Video or Image) */}
                  {item.type === 'video' ? (
                    <div className="w-full h-full relative">
                      {Math.abs(index - centeredIndex) <= 2 && (
                        <video
                          ref={(el) => (videoRefs.current[index] = el)}
                          src={item.src}
                          className="w-full h-full object-cover"
                          loop
                          muted
                          playsInline
                        />
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full relative">
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700"
                      />
                    </div>
                  )}

                  {/* Overlay Content */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 flex flex-col justify-between p-6 ${
                      isCentered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMediaIndex(index);
                        }}
                        className="p-2.5 bg-white/20 hover:bg-calico backdrop-blur-md rounded-full text-white transition-colors duration-300 cursor-pointer shadow-md"
                        title="View Fullscreen"
                      >
                        <Maximize2 size={16} />
                      </button>
                    </div>

                    <div>
                      <span className="text-calico text-xs font-bold uppercase tracking-widest block mb-1">
                        {item.category}
                      </span>
                      {isCentered && (
                        <p className="text-white/70 text-xs mt-1 animate-fade-in flex items-center gap-1">
                          Click to expand fullscreen
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Item Indicator & Title Bar */}
          <div className="mt-4 flex flex-col items-center justify-center gap-2">
            <div className="text-center">
              <span className="text-calico font-heading text-xs font-bold tracking-widest uppercase">
                {String(centeredIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
              </span>
            </div>

            {/* Progress Dots Track */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full px-4 py-2 scrollbar-none">
              {filteredItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === centeredIndex
                      ? 'w-8 bg-calico'
                      : 'w-2 bg-calico/30 hover:bg-calico/60'
                  }`}
                  aria-label={`Jump to item ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
          <a
            href="#stories"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-calico text-calicoDark rounded-md font-heading font-bold uppercase tracking-widest text-xs hover:bg-calico hover:text-white transition-all duration-300 shadow-sm"
          >
            View All Stories <ArrowRight size={16} />
          </a>
          <button
            onClick={handleDownloadLookbook}
            disabled={isDownloading}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-calico text-white rounded-md font-heading font-bold uppercase tracking-widest text-xs hover:bg-matteBlack transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isDownloading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Downloading...
              </>
            ) : (
              'Download Our Lookbook'
            )}
          </button>
        </div>

      </div>

      {/* Lightbox / Media Viewer Modal */}
      {activeMediaIndex !== null && filteredItems[activeMediaIndex] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-md">
          {/* Backdrop Click to Close */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setActiveMediaIndex(null)}
          ></div>

          <div className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col items-center justify-center">
            
            {/* Top Bar with Title & Close */}
            <div className="w-full flex items-center justify-between text-white mb-3 px-2">
              <div>
                <span className="text-calico text-xs font-bold uppercase tracking-widest block">
                  {filteredItems[activeMediaIndex].category} ({activeMediaIndex + 1} / {filteredItems.length})
                </span>
              </div>
              <button
                onClick={() => setActiveMediaIndex(null)}
                className="p-2 bg-white/10 hover:bg-calico text-white rounded-full transition-colors duration-300 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Media Box */}
            <div className="relative w-full flex items-center justify-center max-h-[78vh] overflow-hidden rounded-xl bg-black border border-white/10 shadow-2xl">
              {filteredItems[activeMediaIndex].type === 'video' ? (
                <video
                  key={filteredItems[activeMediaIndex].src}
                  src={filteredItems[activeMediaIndex].src}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={filteredItems[activeMediaIndex].src}
                  alt={filteredItems[activeMediaIndex].title}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg"
                />
              )}

              {/* Prev Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMediaIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-calico text-white rounded-full transition-colors duration-300 backdrop-blur-sm cursor-pointer shadow-lg"
                aria-label="Previous media"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Next Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMediaIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-calico text-white rounded-full transition-colors duration-300 backdrop-blur-sm cursor-pointer shadow-lg"
                aria-label="Next media"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center gap-1.5 mt-4 overflow-x-auto max-w-full px-4 py-1">
              {filteredItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeMediaIndex ? 'w-6 bg-calico' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
