import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const VideoModal = ({ isOpen, onClose, videos: propVideos, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  const defaultVideos = [
    { src: '/images/gallery/Y&I main.mp4', title: 'Yash & Isha Main' },
    { src: '/images/gallery/Aamby Valley wedding.mp4', title: 'Aamby Valley Wedding' },
    { src: '/images/gallery/F&G 3.mp4', title: 'Foram & Gunj Celebrations' }
  ];

  const videos = propVideos && propVideos.length > 0 ? propVideos : defaultVideos;

  if (!isOpen) return null;

  const nextVideo = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const prevVideo = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-10">
      {/* Close Background */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-black rounded-lg overflow-hidden shadow-2xl animate-fade-in aspect-[9/16] max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-calico text-white rounded-full transition-colors duration-300 backdrop-blur-sm"
        >
          <X size={24} />
        </button>

        {/* Video Player */}
        <video 
          key={videos[currentIndex].src} // Force reload on source change
          className="absolute top-0 left-0 w-full h-full object-cover"
          controls
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videos[currentIndex].src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Navigation Arrows */}
        <button 
          onClick={prevVideo}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-calico text-white rounded-full transition-colors duration-300 backdrop-blur-sm"
        >
          <ChevronLeft size={32} />
        </button>

        <button 
          onClick={nextVideo}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-calico text-white rounded-full transition-colors duration-300 backdrop-blur-sm"
        >
          <ChevronRight size={32} />
        </button>

      </div>
    </div>
  );
};

export default VideoModal;
