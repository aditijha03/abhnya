import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ReactLenis } from 'lenis/react';
import { Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Approach from './components/Approach';
import Gallery from './components/Gallery';
import InstaReels from './components/InstaReels';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Cta from './components/Cta';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import ConsultationModal from './components/ConsultationModal';
import PlanningModal from './components/PlanningModal';
import VideoModal from './components/VideoModal';
import LookbookModal from './components/LookbookModal';
import FloatingSocials from './components/FloatingSocials';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isPlanningModalOpen, setIsPlanningModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLookbookModalOpen, setIsLookbookModalOpen] = useState(false);

  const hasAutoOpened = useRef(false);

  useEffect(() => {
    // Option 1: Pop up after 10 seconds
    const timer = setTimeout(() => {
      if (!hasAutoOpened.current) {
        setIsConsultationModalOpen(true);
        hasAutoOpened.current = true;
      }
    }, 10000);

    // Option 3: Exit Intent (mouse moves out of the top of the browser)
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasAutoOpened.current) {
        setIsConsultationModalOpen(true);
        hasAutoOpened.current = true;
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="antialiased relative">
        <Helmet>
        <title>अbhnya by AS Events | Luxury Wedding Planners</title>
        <meta name="description" content="From intimate ceremonies to grand destination weddings, Abhnya by AS Events creates beautifully planned luxury wedding celebrations with personalized planning, elegant décor, and flawless execution." />
        <meta name="keywords" content="Luxury Wedding Planner, Destination Weddings, Wedding Decor, Premium Event Planning, Abhnya, AS Events" />
        <link rel="canonical" href="https://abhnya-events.com/" />
      </Helmet>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsConsultationModalOpen(true)} onOpenVideoModal={() => setIsVideoModalOpen(true)} />
      <Stats />
      <Approach />
      <Gallery />
      <InstaReels />
      <Services />
      <Testimonials />
      <Cta onOpenModal={() => setIsConsultationModalOpen(true)} />
      <Footer />
      
      {/* Floating Elements */}
      <FloatingSocials />
      
      {/* Floating CTA: Circular Sparkles Icon on Mobile, Full Badge on Desktop */}
      <button 
        onClick={() => setIsPlanningModalOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-calico text-white p-4 sm:px-6 sm:py-4 rounded-full shadow-2xl hover:bg-calico/90 hover:scale-105 active:scale-95 transition-all duration-300 font-heading font-bold uppercase tracking-widest text-xs flex items-center gap-2 animate-pulse-periodic cursor-pointer"
        aria-label="Plan Your Dream Event"
        title="Plan Your Dream Event"
      >
        <Sparkles size={20} className="text-white shrink-0" />
        <span className="hidden sm:inline">Plan Your Dream Event</span>
      </button>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ConsultationModal isOpen={isConsultationModalOpen} onClose={() => setIsConsultationModalOpen(false)} />
      <PlanningModal isOpen={isPlanningModalOpen} onClose={() => setIsPlanningModalOpen(false)} />
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
        <LookbookModal isOpen={isLookbookModalOpen} onClose={() => setIsLookbookModalOpen(false)} />
      </div>
    </ReactLenis>
  );
}

export default App;
