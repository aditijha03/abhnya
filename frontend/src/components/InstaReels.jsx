import React, { useState, useEffect } from 'react';
import { FiInstagram, FiPlay, FiHeart, FiMessageCircle, FiSend } from 'react-icons/fi';
import VideoModal from './VideoModal';

const InstaReels = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReelIndex, setActiveReelIndex] = useState(null);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/reels`);
        const data = await response.json();
        setReels(data);
      } catch (error) {
        console.error('Error fetching reels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  return (
    <section id="reels" className="section-padding bg-cream/30">
      <div className="w-[95%] max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4 text-calico">
            <FiInstagram size={32} />
          </div>
          <h2 className="text-4xl mb-4 flex items-center justify-center gap-5">
            <span className="w-12 h-px bg-calico block"></span>
            Follow Our <span className="script-text ml-2">Journey</span>
            <span className="w-12 h-px bg-calico block"></span>
          </h2>
          <p className="text-matteBlack/70 max-w-2xl mx-auto">
            Get a behind-the-scenes look at our magical events and design process on Instagram.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64 mb-12">
            <div className="animate-spin text-calico">
              <FiInstagram size={48} />
            </div>
          </div>
        ) : (
          /* Reels Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mb-12 max-w-[1000px] mx-auto">
            {reels.map((reel, index) => (
              <div 
                onClick={() => setActiveReelIndex(index)}
                key={reel.id} 
                className="group relative overflow-hidden rounded-xl shadow-xl bg-matteBlack cursor-pointer aspect-[9/16] block border border-white/10"
              >
                {/* Clean Video/Image Background */}
                {(reel.isLocal || (reel.videoSrc && (reel.videoSrc.includes('.mp4') || reel.videoSrc.includes('.mov')))) ? (
                  <video
                    src={reel.videoSrc}
                    className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                    loop
                    muted
                    playsInline
                    referrerPolicy="no-referrer"
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => {
                      e.target.pause();
                      e.target.currentTime = 0;
                    }}
                  />
                ) : (
                  <img 
                    src={reel.videoSrc} 
                    alt="Instagram Reel"
                    className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* Luxurious Hover UI Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-6">
                  <div className="flex justify-end transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <FiInstagram className="text-white drop-shadow-md" size={24} />
                  </div>
                  
                  <div className="flex justify-center items-center h-full pb-8">
                    <div className="bg-black/40 p-5 rounded-full backdrop-blur-md border border-white/20 transform scale-50 group-hover:scale-100 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-110 hover:bg-calico group-hover:text-white cursor-pointer">
                      <FiPlay className="text-calico group-hover:text-white transition-colors duration-300 w-8 h-8 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cinematic Video Pop-up */}
        <VideoModal 
          isOpen={activeReelIndex !== null} 
          onClose={() => setActiveReelIndex(null)}
          initialIndex={activeReelIndex || 0}
          videos={reels.map(r => ({ src: r.videoSrc, title: 'Instagram Reel' }))}
        />

        {/* CTA */}
        <div className="text-center">
          <a 
            href="https://www.instagram.com/abhnya_by_as_events/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <FiInstagram size={18} />
            अBHNYA
          </a>
        </div>

      </div>
    </section>
  );
};

export default InstaReels;
