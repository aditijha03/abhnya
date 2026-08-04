import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = ({ onOpenModal, onOpenVideoModal }) => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center bg-matteBlack overflow-hidden">
      
      {/* Video Background with Mobile Focal Alignment */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute right-0 top-0 w-full md:w-[60%] h-full object-cover object-[70%_center] md:object-center z-0 filter contrast-[1.08] saturate-[1.15] brightness-[1.04] transform-gpu"
      >
        <source src="/images/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay for Mobile (Full height dual gradient for maximum text contrast) */}
      <div 
        className="md:hidden absolute inset-0 z-10 pointer-events-none" 
        style={{ background: 'linear-gradient(to top, rgba(23,23,23,0.96) 0%, rgba(23,23,23,0.85) 40%, rgba(23,23,23,0.65) 70%, rgba(23,23,23,0.5) 100%)' }}
      ></div>

      {/* Gradient Overlay for Desktop (Left to Right) - Solid #171717 up to 40% to seamlessly cover the video's left edge, then smoothly fading out */}
      <div 
        className="hidden md:block absolute inset-0 z-10 pointer-events-none" 
        style={{ background: 'linear-gradient(to right, #171717 0%, #171717 40%, rgba(23, 23, 23, 0.8) 48%, rgba(23, 23, 23, 0.3) 62%, transparent 80%)' }}
      ></div>

      <div className="w-[95%] max-w-[1400px] mx-auto relative z-20">
        <div className="text-white max-w-[800px] mt-28 md:mt-36 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] md:drop-shadow-none">
          <span className="text-sm md:text-base uppercase tracking-[4px] text-calico mb-2 block font-medium">Luxury Wedding Planners</span>
          <h1 className="text-[3.5rem] sm:text-[4rem] leading-[1.1] mb-6 text-white md:text-[5.5rem] lg:text-[6.5rem]">
            Celebrate<br />
            <span className="font-script text-calico">Your Love Story</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-grayCust mb-12 max-w-[620px] leading-relaxed md:leading-[1.8]">
            From intimate ceremonies to grand destination weddings, we create beautifully planned wedding celebrations with personalized planning, elegant décor, and flawless execution - turning your dream wedding into unforgettable memories.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-5 md:gap-6">
            <button onClick={onOpenModal} className="btn-primary !px-10 !py-4 md:!px-12 md:!py-4 !text-sm md:!text-[15px] inline-flex items-center gap-3 cursor-pointer w-full sm:w-auto justify-center shadow-lg">
              Book Consultation <ArrowRight size={18} />
            </button>
            <button onClick={onOpenVideoModal} className="px-10 py-4 md:px-12 md:py-4 bg-transparent border border-white/60 text-white font-heading font-semibold uppercase tracking-widest text-sm md:text-[15px] hover:bg-white hover:text-matteBlack transition-all duration-300 inline-flex items-center gap-3 cursor-pointer w-full sm:w-auto justify-center shadow-lg">
              Watch Our Showreel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
