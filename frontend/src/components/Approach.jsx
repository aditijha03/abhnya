import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Approach = () => {
  return (
    <section id="about" className="py-24 bg-pastelWhite overflow-hidden">
      <div className="w-[95%] max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:pr-10 text-matteBlack"
        >
          <span className="text-xs uppercase tracking-widest text-calico mb-5 block">Our Approach</span>
          <h2 className="text-4xl lg:text-5xl leading-tight mb-8 font-heading text-matteBlack">
            Where Every Detail Tells a <span className="font-greatVibes text-calico block text-5xl lg:text-6xl mt-1 font-normal capitalize">Story.</span>
          </h2>
          <p className="text-lightBlack mb-10 text-lg">
            At <b>अbhnya</b>, we believe every celebration should feel effortless, personal, and truly unforgettable. <br></br>Guided by thoughtful detailing, seamless flow, and refined aesthetics, we curate experiences that come together beautifully from start to finish.<br></br> We go beyond planning to create moments that are meaningful, immersive, and designed to leave a lasting impression on you and your guests.
          </p>
          <a href="#services" className="btn-outline inline-flex items-center gap-2">
            Our Process <ArrowRight size={16} />
          </a>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative grid grid-cols-2 grid-rows-2 gap-4 h-[400px] md:h-[600px] w-full"
        >
          <img src="/images/gallery/Y&I 22.jpg" alt="Approach Image 1" className="w-full h-full object-cover rounded-md shadow-lg" />
          <img src="/images/gallery/Y&I 5.jpg" alt="Approach Image 2" className="w-full h-full object-cover object-[center_75%] rounded-md shadow-lg" />
          <img src="/images/gallery/F&G 2.jpg" alt="Approach Image 3" className="w-full h-full object-cover rounded-md shadow-lg" />
          <img src="/images/IMG_2052.PNG" alt="Approach Image 4" className="w-full h-full object-cover rounded-md shadow-lg" />
          <svg className="hidden md:block absolute left-[50%] top-[70%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-[#c29c6d] opacity-100 pointer-events-none z-10 drop-shadow-md" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M100,200 C90,150 110,100 100,50" />
            <path d="M102,170 C130,160 150,130 140,110 C120,120 105,140 102,170" />
            <path d="M98,140 C70,130 50,100 60,80 C80,90 95,110 98,140" />
            <path d="M101,110 C130,100 140,70 130,50 C110,60 105,80 101,110" />
            <path d="M99,80 C70,70 60,40 70,20 C90,30 95,50 99,80" />
            <path d="M100,50 C115,30 110,10 100,5 C90,10 85,30 100,50" />
            {/* Small floral buds */}
            <circle cx="140" cy="110" r="2" fill="currentColor" />
            <circle cx="60" cy="80" r="2" fill="currentColor" />
            <circle cx="130" cy="50" r="2" fill="currentColor" />
            <circle cx="70" cy="20" r="2" fill="currentColor" />
            <circle cx="100" cy="5" r="3" fill="currentColor" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Approach;
