import React, { useState } from 'react';
import { X, Download, CheckCircle, Mail } from 'lucide-react';

const LookbookModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate API call to save email
    setTimeout(() => {
      setStatus('success');
      
      // Trigger actual download of the lookbook
      const link = document.createElement('a');
      link.href = '/AS_Events_Lookbook.pdf'; // Dummy path for now
      link.download = 'AS_Events_Lookbook.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset and close after a few seconds
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setStatus('idle');
          setEmail('');
        }, 500); // Wait for modal fade out
      }, 3000);
      
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      {/* Background overlay click to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={() => status !== 'loading' && onClose()}></div>

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fade-in z-10 text-center">
        {/* Close Button */}
        <button 
          onClick={onClose}
          disabled={status === 'loading'}
          className="absolute top-4 right-4 text-gray-400 hover:text-matteBlack transition-colors disabled:opacity-50"
        >
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div className="py-8 animate-fade-in flex flex-col items-center">
            <CheckCircle size={64} className="text-green-500 mb-4" />
            <h3 className="text-2xl font-heading mb-2 text-matteBlack">Success!</h3>
            <p className="text-lightBlack">Your Lookbook is downloading now...</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-calico/10 rounded-full flex items-center justify-center mx-auto mb-6 text-calico">
              <Download size={32} />
            </div>
            
            <h3 className="text-3xl mb-3 flex flex-col items-center">
              <span className="script-text block mb-1">Exclusive Access</span>
              Download Lookbook
            </h3>
            
            <p className="text-lightBlack text-sm mb-8 px-4">
              Enter your best email below to instantly receive our luxury event design Lookbook and pricing guide.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-lightBlack mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-calico focus:ring-1 focus:ring-calico transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-calico text-white py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-matteBlack transition-colors duration-300 mt-2 disabled:opacity-70 disabled:cursor-wait"
              >
                {status === 'loading' ? 'Preparing File...' : 'Send Me The Lookbook'}
              </button>
            </form>
            <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-wider">Your information is 100% secure.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LookbookModal;
