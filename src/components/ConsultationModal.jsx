import React, { useState, useEffect } from 'react';
import { X, Check, Loader2, ChevronDown } from 'lucide-react';

const ConsultationModal = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(300);
  
  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormFadingOut, setIsFormFadingOut] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  
  // Animation States
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Validation States
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Handle Mount/Unmount Animations
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => {
        setAnimating(true);
      });
      // Reset states
      setIsFormFadingOut(false);
      setShowSuccessScreen(false);
      setIsSubmitting(false);
      setEmail('');
      setEmailError('');
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setMounted(false), 220);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setAnimating(false);
    setTimeout(() => {
      onClose();
    }, 220);
  };

  // Handle Timer
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Inline Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setIsSubmitting(true);
    
    // Simulate API Sequence: Spinner -> Fade out form -> Slide in success screen
    setTimeout(() => {
      setIsSubmitting(false);
      setIsFormFadingOut(true);
      
      setTimeout(() => {
        setShowSuccessScreen(true);
        // Auto-scroll to top
        const modalContent = document.getElementById('consultation-modal-content');
        if (modalContent) modalContent.scrollTop = 0;
      }, 300);
    }, 1000);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  const isExpired = timeLeft === 0;

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-matteBlack/80 backdrop-blur-[8px] transition-opacity duration-[220ms] ease-[cubic-bezier(.22,1,.36,1)] ${animating ? 'opacity-100' : 'opacity-0'} cursor-pointer`}
        onClick={handleClose}
      ></div>
      
      {/* Modal Content */}
      <div 
        className={`relative bg-pastelWhite/90 backdrop-blur-xl border border-white/20 w-full max-w-[600px] max-h-[95vh] flex flex-col rounded-lg shadow-[0_30px_80px_rgba(0,0,0,0.35)] overflow-hidden z-10 transition-all duration-[220ms] ease-[cubic-bezier(.22,1,.36,1)] ${animating ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-lightBlack to-matteBlack px-6 pb-6 pt-10 text-center relative border-b border-calico shrink-0 overflow-hidden">
          {/* Subtle gold glow behind text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.15]">
            <div className="w-48 h-24 bg-calico rounded-full blur-[60px]"></div>
          </div>
          
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 text-grayCust/70 hover:text-calico transition-colors cursor-pointer z-10"
          >
            <X size={26} strokeWidth={1.5} />
          </button>
          <h2 className="relative text-4xl text-white font-heading font-semibold z-10">
            <span className="font-script text-calico block -mb-2.5 text-[1.75rem] font-normal leading-none">Book Your</span>
            Consultation
          </h2>
        </div>

        {/* Scrollable Body */}
        <div id="consultation-modal-content" className="p-5 md:p-6 overflow-y-auto flex-1 min-h-0 relative scroll-smooth">
          
          {/* Form Content */}
          <div className={`transition-all duration-300 ${showSuccessScreen ? 'hidden' : 'block'} ${isFormFadingOut ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Name</label>
                  <input type="text" required disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury" placeholder="John & Jane" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Email</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if(emailError) setEmailError(''); }}
                    disabled={isSubmitting} 
                    className={`w-full bg-transparent border-b py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury ${emailError ? 'border-red-500' : 'border-lightBlack/30'}`} 
                    placeholder="hello@example.com" 
                  />
                  {emailError && <p className="text-red-500 text-[10px] mt-1 tracking-wide">{emailError}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Phone</label>
                  <input type="tel" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury" placeholder="WhatsApp Number" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Consultation Type</label>
                  <div className="relative">
                    <select disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury appearance-none pr-8 cursor-pointer">
                      <option value="virtual">Virtual (Zoom/Meet)</option>
                      <option value="in-person">In-Person Meeting</option>
                      <option value="phone">Phone Call</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-matteBlack/50 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Preferred Date</label>
                  <input type="date" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Preferred Time</label>
                  <input type="time" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Additional Details</label>
                <textarea rows="1" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors resize-none disabled:opacity-50 input-luxury" placeholder="Tell us about your dream celebration..."></textarea>
              </div>

              {/* Timer and Price Display */}
              <div className="flex flex-col items-center justify-center text-center mt-1">
                {!isExpired ? (
                  <>
                    <div className="text-sm font-medium mb-1.5 text-matteBlack leading-relaxed">
                      Complete your booking within <span className="font-bold text-calicoDark bg-calicoDark/10 px-2 py-0.5 rounded mx-1 inline-block">{formattedTime}</span> to unlock your complimentary consultation
                    </div>
                    <div className="flex items-center justify-center gap-2.5 my-1">
                      <span className="line-through decoration-[1.5px] text-matteBlack/70 font-semibold text-[15px]">₹49</span>
                      <span className="font-bold text-[15px] text-calicoDark uppercase tracking-widest">Free</span>
                    </div>
                    <span className="text-[10px] text-matteBlack/60 uppercase tracking-widest mt-0.5">Limited-time introductory offer</span>
                  </>
                ) : (
                  <div className="text-sm font-semibold text-calicoDark mb-1 italic">
                    Complimentary booking window has closed.
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center mt-1">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`btn-primary w-full flex justify-center items-center gap-2 text-center text-base font-semibold !py-2.5 transition-all duration-300 ${
                    isSubmitting ? 'opacity-80' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <><Loader2 size={18} className="animate-spin" /> Booking...</>
                  ) : isExpired ? (
                    '₹49 Consultation'
                  ) : (
                    'Book Consultation'
                  )}
                </button>
                <p className="text-[10px] text-matteBlack/60 mt-1.5 text-center tracking-wide">
                  We'll contact you within 24 hours. No spam, ever.
                </p>
              </div>
            </form>
          </div>

          {/* Success Screen */}
          {showSuccessScreen && (
            <div className="flex flex-col items-center justify-center text-center py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 rounded-full bg-[#F8F3EA] shadow-[0_0_20px_rgba(227,192,150,0.35)] flex items-center justify-center mb-6 text-calicoDark animate-in zoom-in-50 duration-500 delay-150 fill-mode-both">
                <Check size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-3xl font-heading text-matteBlack mb-2">Thank You!</h3>
              <p className="text-matteBlack/80 font-semibold mb-6">Your planning request has been received.</p>
              
              <div className="w-12 h-[1px] bg-calico mb-6 opacity-50"></div>
              
              <p className="text-sm text-matteBlack/70 max-w-[85%] mx-auto leading-relaxed mb-10">
                Our event specialist will personally review your details and contact you within 24 hours via WhatsApp or email.<br/><br/>
                We're excited to help bring your dream event to life.
              </p>
              
              <button 
                onClick={handleClose}
                className="btn-outline w-full sm:w-auto px-10"
              >
                Return Home
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;
