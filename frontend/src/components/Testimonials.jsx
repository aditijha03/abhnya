import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonialsData = [
  {
    text: "An excellent experience working with Abhnya by AS events! The founders are amazing — prompt, professional, and they truly understand their work. They even suggested creative ideas I hadn’t thought of. What sets them apart is the detailing. They look into every single aspect of a project to make sure it’s perfect. They’ve made all my big moments special — from birthdays to my wedding, to my baby shower and my baby’s homecoming. One call and my work is done. I never have to worry because they take care of everything so beautifully. Highly recommend them for any event, big or small!",
    name: "Prerna Shewani",
    venue: "",
    image: "/images/avatar_couple_1.jpg"
  },
  {
    text: "From the first family meeting to the final bidaai song, every single event was handled so beautifully and seamlessly. Gujarati weddings are full of emotions, traditions, last-minute chaos, and nonstop celebrations — and this team managed it all with so much warmth, professionalism, and attention to detail. From the décor and coordination to guest management and timelines, everything felt effortless for us and our families. What truly stood out was how personally involved they were — it never felt like “just another wedding.” They understood our vision, respected our traditions, and made every function feel special in its own way. So many guests told us how smooth, organised, and stunning everything was. If you’re looking for a team that genuinely cares and knows how to execute a big fat Gujarati wedding perfectly, I’d wholeheartedly recommend them. Forever grateful for making our wedding memories so beautiful ✨",
    name: "Foram Parmar",
    venue: "",
    image: "/images/avatar_couple_2.jpg"
  },
  {
    text: "Thanks to Abhinav, Sanya, and the whole team for managing things smoothly 🙏🏻 You did amazingly well ❤️",
    name: "Shivam Rathi",
    venue: "",
    image: "/images/avatar_couple_3.jpg"
  },
  {
    text: "Kudos to Abhinav, Sanya and the entire team for making our event a smooth show! We were quite worried initially, especially since things had been finalised at very short notice, but you guys managed everything so well! And even the small inputs at the perfect time were very helpful — Abhinav, thanks for reminding me to send people with Shivam for pag phera 😂 We’re truly happy to have been recommended to your services! And we would definitely do the same 😊",
    name: "Akanksha Rathi",
    venue: "",
    image: "/images/avatar_couple_1.jpg"
  },
  {
    text: "Heartfelt gratitude to Abhinav and Sanya for being truly amazing throughout the wedding celebrations of our daughter Ishika. Your dedication, perfect coordination, and tireless efforts made it possible to manage the entire wedding fest so beautifully. Without you both, this would not have been possible. With sincere thanks and appreciation 🙏",
    name: "Bhanushali and Gala Family",
    venue: "",
    image: "/images/avatar_couple_2.jpg"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  return (
    <section id="stories" className="bg-matteBlack text-white text-center relative py-16 sm:py-24">
      
      {/* Fully Visible Tulip Floral Artwork on Left & Right (No Clipping) */}
      <div className="absolute inset-0 max-w-[1400px] mx-auto pointer-events-none z-0 flex justify-between items-center px-4 sm:px-8">
        {/* Left Tulip */}
        <svg className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 text-calico opacity-20" viewBox="0 0 250 250" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M 90 50 Q 100 30, 110 50 C 120 80, 130 100, 100 120 C 70 100, 80 80, 90 50 Z" />
          <path d="M 100 120 Q 95 180, 110 240" />
          <path d="M 100 170 C 70 160, 40 120, 50 80 C 65 110, 80 140, 97 185" />
        </svg>

        {/* Right Tulip */}
        <svg className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 text-calico opacity-20 scale-x-[-1]" viewBox="0 0 250 250" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M 90 50 Q 100 30, 110 50 C 120 80, 130 100, 100 120 C 70 100, 80 80, 90 50 Z" />
          <path d="M 100 120 Q 95 180, 110 240" />
          <path d="M 100 170 C 70 160, 40 120, 50 80 C 65 110, 80 140, 97 185" />
        </svg>
      </div>

      <div className="w-[92%] sm:w-[95%] max-w-[1100px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 flex items-center justify-center gap-3 sm:gap-5 text-white">
            <span className="w-8 sm:w-12 h-px bg-calico block"></span>
            Kind Words From <span className="script-text ml-1.5">Our Couples</span>
            <span className="w-8 sm:w-12 h-px bg-calico block"></span>
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-md mx-auto">
            Real stories from couples who trusted us with their unforgettable moments.
          </p>
        </div>
        
        {/* Sleek, Borderless Floating Testimonial Container */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="max-w-[700px] mx-auto relative px-4 sm:px-8 py-4 sm:py-6"
        >

          {/* Minimal Golden Quote Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-2.5 bg-calico/10 rounded-full text-calico">
              <Quote size={24} className="rotate-180 fill-calico/30" />
            </div>
          </div>
          
          {/* Quote Text */}
          <div className="transition-all duration-500 min-h-[140px] sm:min-h-[120px] flex flex-col justify-center">
            <p className="font-heading text-lg sm:text-xl md:text-2xl leading-relaxed italic font-light text-white/90">
              "{testimonialsData[currentIndex].text}"
            </p>
          </div>
          
          {/* Author / Couple Metadata */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6">
            <img 
              src={testimonialsData[currentIndex].image} 
              alt={testimonialsData[currentIndex].name} 
              className="w-12 h-12 rounded-full object-cover border-2 border-calico/80 shadow-md" 
            />
            <div className="flex flex-col items-start text-left">
              <span className="text-xs sm:text-sm text-calico tracking-wider uppercase font-heading font-semibold">
                {testimonialsData[currentIndex].name}
              </span>
              <span className="text-[10px] sm:text-xs text-white/50 tracking-widest uppercase mt-0.5">
                {testimonialsData[currentIndex].venue}
              </span>
            </div>
          </div>

          {/* Sleek Navigation Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8">
            <button 
              onClick={prevSlide} 
              className="p-2 rounded-full border border-calico/30 text-calico/80 hover:text-white hover:bg-calico hover:border-calico transition-all duration-300 bg-white/5 cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2">
              {testimonialsData.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex ? 'bg-calico w-6' : 'bg-white/20 w-2 hover:bg-calico/50'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide} 
              className="p-2 rounded-full border border-calico/30 text-calico/80 hover:text-white hover:bg-calico hover:border-calico transition-all duration-300 bg-white/5 cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
