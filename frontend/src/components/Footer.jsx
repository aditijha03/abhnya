import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import { FaInstagram, FaFacebook, FaYoutube, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="footer" className="bg-matteBlack text-grayCust pt-20 pb-8 border-t border-[#222]">
      <div className="w-[95%] max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12 mb-12">
          
          <div className="flex flex-col gap-6 max-w-xs">
            <a href="#home" className="inline-block mb-2">
              <img src="/images/logo.png" alt="Abhnya by AS Events" className="h-16 w-auto object-contain" />
            </a>
            <p className="text-sm text-grayCust leading-relaxed">
              Luxury wedding planning & bespoke celebrations crafted with passion, precision and perfection.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/abhnya_by_as_events" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 text-calico flex items-center justify-center transition-all hover:bg-calico hover:text-matteBlack"><FaInstagram size={18} /></a>
              <a href="https://www.facebook.com/profile.php?id=61590043773189" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 text-calico flex items-center justify-center transition-all hover:bg-calico hover:text-matteBlack"><FaFacebook size={18} /></a>
              <a href="https://www.youtube.com/@अbhnyabyASEvents" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 text-calico flex items-center justify-center transition-all hover:bg-calico hover:text-matteBlack"><FaYoutube size={18} /></a>
              <a href="https://in.pinterest.com/abhnyabyasevents/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 text-calico flex items-center justify-center transition-all hover:bg-calico hover:text-matteBlack"><FaPinterest size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg mb-6 tracking-wider font-heading">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-sm hover:text-calico transition-colors">Home</a></li>
              <li><a href="#about" className="text-sm hover:text-calico transition-colors">About Us</a></li>
              <li><a href="#services" className="text-sm hover:text-calico transition-colors">Services</a></li>
              <li><a href="#gallery" className="text-sm hover:text-calico transition-colors">Gallery</a></li>
              <li><a href="#stories" className="text-sm hover:text-calico transition-colors">Stories</a></li>
              <li><a href="#contact" className="text-sm hover:text-calico transition-colors">Contact</a></li>
            </ul>
          </div>



          {/* Contact */}
          <div>
            <h4 className="text-white text-lg mb-6 tracking-wider font-heading">Get In Touch</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+917678076137" className="flex items-center gap-3 text-sm hover:text-calico transition-colors">
                  <Phone size={18} className="text-calico shrink-0" /> +91 76780 76137
                </a>
              </li>
              <li>
                <a href="mailto:abhnyabyasevents@gmail.com" className="flex items-center gap-3 text-sm hover:text-calico transition-colors">
                  <Mail size={18} className="text-calico shrink-0" /> abhnyabyasevents@gmail.com
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=A+wing,+Aditya+Heritage,+405-406,+Kanti+Nagar,+J+B+Nagar,+Andheri+East,+Mumbai,+Maharashtra+400099" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-calico transition-colors">
                  <MapPin size={18} className="text-calico shrink-0" /> A wing, Aditya Heritage, 405-406, Kanti Nagar, J B Nagar, Andheri East, Mumbai, Maharashtra 400099
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm"><Globe size={18} className="text-calico shrink-0" /> Available for travel worldwide</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; 2026 Abhnya by AS Events. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-calico transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-calico transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
