import React from 'react';
import { ArrowRight } from 'lucide-react';

const Cta = ({ onOpenModal }) => {
  return (
    <section id="contact" className="bg-cover bg-center bg-fixed text-white py-24" style={{ backgroundImage: "linear-gradient(rgba(23,23,23,0.8), rgba(23,23,23,0.8)), url('/images/gallery/Y&I 21.jpg')" }}>
      <div className="w-[95%] max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
        <div>
          <h2 className="text-4xl text-white mb-4">
            Your Dream Wedding<br />
            <span className="script-text block mt-2">Is Closer Than You Think</span>
          </h2>
          <p className="text-grayCust text-lg">Let's make it unforgettable together.</p>
        </div>
        <button onClick={onOpenModal} className="btn-primary inline-flex items-center gap-2 whitespace-nowrap cursor-pointer">
          Schedule a Consultation <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default Cta;
