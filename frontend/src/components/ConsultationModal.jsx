import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import BaseFormModal from './BaseFormModal';

const ConsultationModal = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e, callback) => {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      callback(false);
      return;
    }
    setEmailError('');
    setIsSubmitting(true);
    
    const message = `Hello Abhnya By AS Events,\n\nI would like to book a consultation.\n\n*Details:*\nName: ${data.name || ''}\nEmail: ${email}\nPhone: ${data.phone || ''}\nType: ${data.type || ''}\nPreferred Date: ${data.date || ''}\nPreferred Time: ${data.time || ''}\n\n*Additional Details:*\n${data.message || ''}`;
    const whatsappUrl = `https://wa.me/917678076137?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
      callback(true);
    }, 500);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  const isExpired = timeLeft === 0;

  const timerContent = (
    <>
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
      <p className="text-[10px] text-matteBlack/60 mt-1.5 text-center tracking-wide">
        We'll contact you within 24 hours. No spam, ever.
      </p>
    </>
  );

  return (
    <BaseFormModal
      isOpen={isOpen}
      onClose={() => {
        setEmail('');
        setEmailError('');
        onClose();
      }}
      preTitle="Book Your"
      title="Consultation"
      submitText={isExpired ? '₹49 Consultation' : 'Book Consultation'}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      maxWidth="max-w-[600px]"
      timerContent={timerContent}
      successSubtitle="Your planning request has been received."
      successMessage="Our event specialist will personally review your details and contact you within 24 hours via WhatsApp. We're excited to help bring your dream event to life."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Name</label>
          <input type="text" name="name" required disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury" placeholder="John & Jane" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Email</label>
          <input 
            type="email"
            name="email" 
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
          <input type="tel" name="phone" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury" placeholder="WhatsApp Number" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Consultation Type</label>
          <div className="relative">
            <select name="type" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury appearance-none pr-8 cursor-pointer">
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
          <input type="date" name="date" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Preferred Time</label>
          <input type="time" name="time" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury" />
        </div>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Additional Details</label>
        <textarea name="message" rows="1" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors resize-none disabled:opacity-50 input-luxury" placeholder="Tell us about your dream celebration..."></textarea>
      </div>
    </BaseFormModal>
  );
};

export default ConsultationModal;
