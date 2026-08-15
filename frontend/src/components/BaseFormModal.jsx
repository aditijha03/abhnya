import React, { useState, useEffect } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BaseFormModal = ({ 
  isOpen, 
  onClose, 
  preTitle,
  title, 
  submitText = "Submit", 
  isSubmitting,
  onSubmit, 
  children,
  successTitle = "Thank You!",
  successSubtitle = "Your request has been received.",
  successMessage = "We'll contact you shortly.\n\nWe're excited to hear more about your vision.",
  maxWidth = "max-w-[600px]",
  timerContent = null
}) => {
  const [isFormFadingOut, setIsFormFadingOut] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => {
        setAnimating(true);
      });
      setIsFormFadingOut(false);
      setShowSuccessScreen(false);
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e, (success) => {
      if (success) {
        setIsFormFadingOut(true);
        setTimeout(() => {
          navigate('/thankyou');
        }, 300);
      }
    });
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div 
        className={`absolute inset-0 bg-matteBlack/80 backdrop-blur-[8px] transition-opacity duration-[220ms] ease-[cubic-bezier(.22,1,.36,1)] ${animating ? 'opacity-100' : 'opacity-0'} cursor-pointer`}
        onClick={handleClose}
      ></div>
      
      <div 
        className={`relative bg-pastelWhite/90 backdrop-blur-xl border border-white/20 w-full ${maxWidth} max-h-[95vh] flex flex-col rounded-lg shadow-[0_30px_80px_rgba(0,0,0,0.35)] overflow-hidden z-10 transition-all duration-[220ms] ease-[cubic-bezier(.22,1,.36,1)] ${animating ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'}`}
      >
        <div className="bg-gradient-to-br from-lightBlack to-matteBlack px-6 pb-6 pt-10 text-center relative border-b border-calico shrink-0 overflow-hidden">
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
            {preTitle && <span className="font-script text-calico block -mb-2.5 text-[1.75rem] font-normal leading-none">{preTitle}</span>}
            {title}
          </h2>
        </div>

        <div id="base-modal-content" className="p-5 md:p-8 overflow-y-auto flex-1 min-h-0 relative scroll-smooth">
          <div className={`transition-all duration-300 ${isFormFadingOut ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
            <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
              {children}

              {timerContent}

              <div className="flex flex-col items-center mt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`btn-primary w-full flex justify-center items-center gap-2 text-center text-base font-semibold !py-3 transition-all duration-300 ${
                    isSubmitting ? 'opacity-80' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <><Loader2 size={18} className="animate-spin" /> Processing...</>
                  ) : submitText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseFormModal;
