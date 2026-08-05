import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeartHandshake, 
  Plane, 
  Castle, 
  Flower2, 
  Music, 
  ConciergeBell,
  ArrowRight
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'Wedding Planning',
      desc: 'End-to-end planning with seamless execution.',
      icon: <HeartHandshake size={32} />
    },
    {
      title: 'Destination Weddings',
      desc: 'Curating unforgettable destination weddings, wherever you choose to celebrate.',
      icon: <Plane size={32} />
    },
    {
      title: 'Venue Selection',
      desc: 'Helping you find the perfect venue that reflects your style, guest list, and budget.',
      icon: <Castle size={32} />
    },
    {
      title: 'Décor & Styling',
      desc: 'Curating décor concepts with trusted design partners.',
      icon: <Flower2 size={32} />
    },
    {
      title: 'Hospitality & Logistics',
      desc: 'RSVP management, guest hospitality, accommodations, transportation, and on-ground coordination.',
      icon: <ConciergeBell size={32} />
    },
    {
      title: 'Entertainment & Vendor Curation',
      desc: 'Curating the perfect team of artists and vendors for your celebration.',
      icon: <Music size={32} />
    }
  ];

  return (
    <section id="services" className="section-padding bg-pastelWhite">
      <div className="w-[95%] max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 flex items-center justify-center gap-5">
            <span className="w-12 h-px bg-calico block"></span>
            Our Signature <span className="script-text ml-2">Services</span>
            <span className="w-12 h-px bg-calico block"></span>
          </h2>
        </div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {services.map((svc, idx) => (
            <motion.div 
              key={idx} 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white p-10 text-center border border-calico/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:shadow-2xl active:-translate-y-1 cursor-pointer"
            >
              <div className="w-12 h-12 mx-auto mb-5 text-calico flex items-center justify-center">
                {svc.icon}
              </div>
              <h3 className="text-xl mb-4">{svc.title}</h3>
              <p className="text-lightBlack text-sm">{svc.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-16">
          <a href="#testimonials" className="inline-flex items-center gap-2 text-calico font-heading font-bold uppercase tracking-widest text-sm hover:text-lightBlack transition-colors duration-300">
            Read Client Love <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
