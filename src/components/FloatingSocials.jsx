import React from 'react';
import { FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';
import { FaPinterest } from 'react-icons/fa';

const FloatingSocials = () => {
  return (
    <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-5 items-center">
      {/* Decorative Top Line */}
      <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-white/30"></div>
      
      <a 
        href="https://www.instagram.com/abhnya_by_as_events/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white bg-black/70 backdrop-blur-md p-3 rounded-full hover:bg-calico hover:-translate-x-1 hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300 border border-white/10"
      >
        <FiInstagram size={22} />
      </a>
      
      <a 
        href="https://www.facebook.com/profile.php?id=61590043773189" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white bg-black/70 backdrop-blur-md p-3 rounded-full hover:bg-calico hover:-translate-x-1 hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300 border border-white/10"
      >
        <FiFacebook size={22} />
      </a>
      
      <a 
        href="https://www.youtube.com/@अbhnyabyASEvents" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white bg-black/70 backdrop-blur-md p-3 rounded-full hover:bg-calico hover:-translate-x-1 hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300 border border-white/10"
      >
        <FiYoutube size={22} />
      </a>
      
      <a 
        href="https://in.pinterest.com/abhnyabyasevents/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white bg-black/70 backdrop-blur-md p-3 rounded-full hover:bg-calico hover:-translate-x-1 hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300 border border-white/10"
      >
        <FaPinterest size={22} />
      </a>

      {/* Decorative Bottom Line */}
      <div className="w-[1px] h-16 bg-gradient-to-t from-transparent to-white/30"></div>
    </div>
  );
};

export default FloatingSocials;
