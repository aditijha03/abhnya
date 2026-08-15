import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import BaseFormModal from './BaseFormModal';

const PlanningModal = ({ isOpen, onClose }) => {
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
    
    data.formType = 'Planning';
    
    // Fire and forget fetch to Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbzRGSq3R7ggarpw8CWwIhp6n0f7clTExChV0AwbQJdJ32wAxkUW9fWagLLkPU9W3g_RpA/exec', {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams(data),
    }).catch(error => console.error('Error submitting to Google Sheets:', error));
    
    const message = `Hello Abhnya By AS Events,\n\nI would like to start planning an event.\n\n*Details:*\nName: ${data.name || ''}\nEmail: ${email}\nPhone: ${data.phone || ''}\nEvent Type: ${data.type || ''}\nGuests: ${data.guests || ''}\nBudget: ${data.budget || ''}\nLocation: ${data.location || ''}\n\n*Vision:*\n${data.message || ''}`;
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
      preTitle="Plan Your"
      title="Dream Event"
      submitText="Submit Planning Details"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      maxWidth="max-w-[700px]"
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
          <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Event Type</label>
          <div className="relative">
            <select name="type" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury appearance-none pr-8 cursor-pointer">
              <option value="wedding">Wedding</option>
              <option value="engagement">Engagement</option>
              <option value="anniversary">Anniversary</option>
              <option value="destination">Destination Wedding</option>
              <option value="corporate">Corporate Gala</option>
              <option value="other">Other Event</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-matteBlack/50 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Estimated Guest Count</label>
          <div className="relative">
            <select name="guests" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury appearance-none pr-8 cursor-pointer">
              <option value="under50">Under 50</option>
              <option value="50to150">50 - 150</option>
              <option value="150to300">150 - 300</option>
              <option value="300to500">300 - 500</option>
              <option value="500plus">500+</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-matteBlack/50 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Target Budget Range</label>
          <div className="relative">
            <select name="budget" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury appearance-none pr-8 cursor-pointer">
              <option value="10l-20l">₹10 Lakhs - ₹20 Lakhs</option>
              <option value="20l-50l">₹20 Lakhs - ₹50 Lakhs</option>
              <option value="50l-1cr">₹50 Lakhs - ₹1 Crore</option>
              <option value="1cr-plus">₹1 Crore +</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-matteBlack/50 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Location / Venue Preference</label>
        <input type="text" name="location" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors disabled:opacity-50 input-luxury" placeholder="City, specific venue, or 'Not decided yet'" />
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-matteBlack mb-1 font-semibold">Tell Us About Your Vision</label>
        <textarea name="message" rows="1" disabled={isSubmitting} className="w-full bg-transparent border-b border-lightBlack/30 py-1 text-[15px] text-matteBlack focus:outline-none transition-colors resize-none disabled:opacity-50 input-luxury" placeholder="Describe the vibe, themes, colors, or any special requests..."></textarea>
      </div>
    </BaseFormModal>
  );
};

export default PlanningModal;
