import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, X, Film, Maximize2, Loader2 } from 'lucide-react';
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
    id: 'v5',
    type: 'video',
    title: 'Foram & Gunj - The Celebration',
    category: 'Celebration',
    src: '/images/gallery/F&G 3.mp4',
    aspect: 'aspect-[9/16]'
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
    id: 'v7',
    type: 'video',
    title: 'Fairmont Mumbai Royal Reception',
    category: 'Video',
    src: '/images/gallery/Fairmont Mumbai.mp4',
    aspect: 'aspect-[9/16]'
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
    id: 'v36',
    type: 'video',
    title: 'Yash & Isha - The Main Event',
    category: 'Couple',
    src: '/images/gallery/Y&I main.mp4',
    aspect: 'aspect-[9/16]'
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
    id: 'v8',
    type: 'video',
    title: 'V&Y - A Timeless Union',
    category: 'Video',
    src: '/images/gallery/V&Y.mp4',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_0',
    type: 'video',
    title: 'F&G 6',
    category: 'Video',
    src: '/images/gallery/videos/F&G 6.mp4',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_1',
    type: 'video',
    title: 'F&G 7',
    category: 'Video',
    src: '/images/gallery/videos/F&G 7.mp4',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_2',
    type: 'video',
    title: 'IMG_0561',
    category: 'Video',
    src: '/images/gallery/videos/IMG_0561.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_3',
    type: 'video',
    title: 'IMG_1667',
    category: 'Video',
    src: '/images/gallery/videos/IMG_1667.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_4',
    type: 'video',
    title: 'IMG_1868',
    category: 'Video',
    src: '/images/gallery/videos/IMG_1868.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_5',
    type: 'video',
    title: 'IMG_1946',
    category: 'Video',
    src: '/images/gallery/videos/IMG_1946.webm',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_6',
    type: 'video',
    title: 'IMG_5255',
    category: 'Video',
    src: '/images/gallery/videos/IMG_5255.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_7',
    type: 'video',
    title: 'IMG_5269',
    category: 'Video',
    src: '/images/gallery/videos/IMG_5269.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_8',
    type: 'video',
    title: 'IMG_5503',
    category: 'Video',
    src: '/images/gallery/videos/IMG_5503.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_9',
    type: 'video',
    title: 'IMG_5506',
    category: 'Video',
    src: '/images/gallery/videos/IMG_5506.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_10',
    type: 'video',
    title: 'IMG_5507',
    category: 'Video',
    src: '/images/gallery/videos/IMG_5507.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_11',
    type: 'video',
    title: 'IMG_6421',
    category: 'Video',
    src: '/images/gallery/videos/IMG_6421.webm',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_12',
    type: 'video',
    title: 'IMG_6426',
    category: 'Video',
    src: '/images/gallery/videos/IMG_6426.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_13',
    type: 'video',
    title: 'IMG_6540',
    category: 'Video',
    src: '/images/gallery/videos/IMG_6540.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_14',
    type: 'video',
    title: 'IMG_8698',
    category: 'Video',
    src: '/images/gallery/videos/IMG_8698.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_15',
    type: 'video',
    title: 'IMG_8699',
    category: 'Video',
    src: '/images/gallery/videos/IMG_8699.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_16',
    type: 'video',
    title: 'IMG_8914',
    category: 'Video',
    src: '/images/gallery/videos/IMG_8914.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_17',
    type: 'video',
    title: 'IMG_8973',
    category: 'Video',
    src: '/images/gallery/videos/IMG_8973.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_18',
    type: 'video',
    title: 'IMG_8980',
    category: 'Video',
    src: '/images/gallery/videos/IMG_8980.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_19',
    type: 'video',
    title: 'IMG_9003',
    category: 'Video',
    src: '/images/gallery/videos/IMG_9003.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_20',
    type: 'video',
    title: 'IMG_9405',
    category: 'Video',
    src: '/images/gallery/videos/IMG_9405.mov',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'new_v_21',
    type: 'video',
    title: 'Video-45042',
    category: 'Video',
    src: '/images/gallery/videos/Video-45042.mp4',
    aspect: 'aspect-[9/16]'
  }
];

const Gallery = () => {
  
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

  const filteredItems = galleryItems;

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
  }, [scrollToIndex]);

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
                  {activeMediaIndex + 1} / {filteredItems.length}
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
