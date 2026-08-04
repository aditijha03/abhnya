import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Stories', href: '#stories' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-matteBlack/95 backdrop-blur-md py-3.5 shadow-xl' : 'bg-transparent py-6 border-b border-white/10'}`}>
      <div className="w-[95%] max-w-[1400px] mx-auto flex justify-between items-center">
          <a href="#home" className="flex items-center group">
            <img 
              src="/images/logo.png" 
              alt="Abhnya by AS Events" 
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled ? 'h-14 md:h-16 lg:h-18' : 'h-16 md:h-20 lg:h-24'
              }`} 
            />
          </a>
        
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-10 lg:gap-12 list-none">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="text-white text-[13px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:text-calico">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-5">
          <button onClick={onOpenModal} className="btn-primary cursor-pointer">Inquire Now</button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden text-white cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-matteBlack flex flex-col items-center gap-5 py-5 shadow-xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-sm uppercase tracking-wider transition-colors duration-300 hover:text-calico"
            >
              {link.name}
            </a>
          ))}
          <button className="btn-primary mt-2 cursor-pointer" onClick={() => { setIsMobileMenuOpen(false); onOpenModal(); }}>Inquire Now</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
