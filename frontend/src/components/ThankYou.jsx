import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pastelWhite px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden border border-calico/20">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-calico via-calicoDark to-calico"></div>
        
        <div className="flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 rounded-full bg-[#F8F3EA] shadow-[0_0_30px_rgba(227,192,150,0.4)] flex items-center justify-center mb-8 text-calicoDark animate-in zoom-in-50 duration-500 delay-150 fill-mode-both">
            <Check size={40} strokeWidth={2.5} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading text-matteBlack mb-4">Thank You!</h1>
          <p className="text-lg md:text-xl text-matteBlack/80 font-semibold mb-8">
            Your request has been received.
          </p>
          
          <div className="w-16 h-[2px] bg-calico mb-8 opacity-50"></div>
          
          <p className="text-base text-matteBlack/70 max-w-lg mx-auto leading-relaxed mb-12">
            Our event specialist will personally review your details and contact you within 24 hours. We're excited to help bring your dream event to life.
          </p>
          
          <Link 
            to="/" 
            className="btn-primary inline-flex justify-center items-center px-10 py-3 text-base font-semibold"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
