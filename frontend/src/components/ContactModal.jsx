import React, { useState } from 'react';
import BaseFormModal from './BaseFormModal';

const ContactModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Capitalize all keys so they appear nicely in Google Sheets
    const capitalizedData = {};
    for (const key in data) {
      capitalizedData[key.charAt(0).toUpperCase() + key.slice(1)] = data[key];
    }
    capitalizedData.formType = 'Contact';
    
    // Fire and forget fetch to Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbzRGSq3R7ggarpw8CWwIhp6n0f7clTExChV0AwbQJdJ32wAxkUW9fWagLLkPU9W3g_RpA/exec', {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams(capitalizedData),
    }).catch(error => console.error('Error submitting to Google Sheets:', error));
    
    const message = `Hello Abhnya By AS Events,\n\nI would like to inquire about your services.\n\n*Details:*\nName: ${data.name || ''}\nEmail: ${email}\nPhone: ${data.phone || ''}\nEvent Date: ${data.date || ''}\n\n*Message:*\n${data.message || ''}`;
    const whatsappUrl = `https://wa.me/917678076137?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
      callback(true);
    }, 500);
  };

  return (
    <BaseFormModal
      isOpen={isOpen}
      onClose={() => {
        setEmail('');
        setEmailError('');
        onClose();
      }}
      preTitle="Let's Plan"
      title="Your Dream Wedding"
      submitText="Submit Inquiry"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      maxWidth="max-w-[600px]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Phone</label>
          <input type="tel" name="phone" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury" placeholder="+91 98765 43210" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Event Date</label>
          <input type="text" name="date" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury" placeholder="DD/MM/YYYY or TBD" />
        </div>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Message</label>
        <textarea name="message" rows="3" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors resize-none disabled:opacity-50 input-luxury" placeholder="Tell us a bit about your vision..."></textarea>
      </div>
    </BaseFormModal>
  );
};

export default ContactModal;
