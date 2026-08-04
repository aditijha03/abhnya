import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Handshake, ShieldCheck } from 'lucide-react';

const Stats = () => {
  const brandValues = [
    {
      title: 'Personalized Planning',
      icon: <Sparkles size={26} className="text-calico stroke-[1.5]" />
    },
    {
      title: 'Pan India Services',
      icon: <MapPin size={26} className="text-calico stroke-[1.5]" />
    },
    {
      title: 'Curated Vendor Network',
      icon: <Handshake size={26} className="text-calico stroke-[1.5]" />
    },
    {
      title: 'Seamless Execution',
      icon: <ShieldCheck size={26} className="text-calico stroke-[1.5]" />
    },
  ];

  return (
    <section className="bg-matteBlack text-white py-14 border-t border-b border-lightBlack">
      <div className="w-[95%] max-w-[1400px] mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center"
        >
          {brandValues.map((item, index) => (
            <motion.div 
              key={index} 
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col items-center justify-center py-6 px-4 border-b border-calico/15 sm:border-b-0 ${
                index % 2 === 0 ? 'sm:border-r border-calico/15' : ''
              } ${index < 3 ? 'lg:border-r lg:border-calico/15' : 'lg:border-r-0'} ${
                index < 2 ? 'sm:border-b sm:border-calico/15 lg:border-b-0' : ''
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-calico/10 border border-calico/20 flex items-center justify-center mb-4 transition-all duration-300 hover:scale-110 hover:bg-calico/20 hover:border-calico/40">
                {item.icon}
              </div>
              <h4 className="font-heading text-xs sm:text-sm uppercase tracking-widest text-grayCust font-semibold">
                {item.title}
              </h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
