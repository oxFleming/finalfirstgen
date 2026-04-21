import React, { useEffect, useState } from 'react';
import { Menu, ArrowRight, X, MessageCircle } from 'lucide-react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Services from './Services';
import Portfolio from './Portfolio';
import Team from './Team';
import Home from './Home';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const isHome = location.pathname === '/';
  const headerSolid = isScrolled || !isHome;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const errors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
      valid = false;
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      valid = false;
    }

    setFormErrors(errors);

    if (valid) {
      setFormStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 5000);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    if (location.pathname === path) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-brand-gray font-sans selection:bg-brand-primary selection:text-white">
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerSolid ? 'bg-white shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 lg:py-5 lg:px-12">
          <Link to="/" onClick={() => handleNavClick('/')} className={`flex flex-col items-start leading-none font-heading select-none cursor-pointer transition-colors duration-300 ${headerSolid ? 'text-brand-dark' : 'text-white'}`}>
            <span className="text-base md:text-lg font-light tracking-[0.15em] uppercase">First</span>
            <span className={`text-lg md:text-xl font-bold tracking-tight uppercase transition-colors duration-300 ${headerSolid ? 'text-brand-primary' : 'text-white'}`}>Generation</span>
            <span className={`text-[0.5rem] md:text-[0.55rem] font-medium tracking-[0.5em] uppercase mt-1 transition-colors duration-300 ${headerSolid ? 'text-gray-500' : 'text-white/80'}`}>Homes</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-12 text-sm font-medium tracking-widest uppercase">
            <Link to="/" onClick={() => handleNavClick('/')} className={`hover:text-brand-primary transition-colors ${headerSolid ? 'text-brand-dark' : 'text-white/90'}`}>Home</Link>
            <Link to="/services" onClick={() => handleNavClick('/services')} className={`hover:text-brand-primary transition-colors ${headerSolid ? 'text-brand-dark' : 'text-white/90'}`}>Services</Link>
            <Link to="/portfolio" onClick={() => handleNavClick('/portfolio')} className={`hover:text-brand-primary transition-colors ${headerSolid ? 'text-brand-dark' : 'text-white/90'}`}>Portfolio</Link>
            <Link to="/team" onClick={() => handleNavClick('/team')} className={`hover:text-brand-primary transition-colors ${headerSolid ? 'text-brand-dark' : 'text-white/90'}`}>Team</Link>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className={`lg:hidden p-2 transition-colors duration-300 ${headerSolid ? 'text-brand-dark hover:text-brand-primary' : 'text-white hover:text-white/80'}`}>
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/team" element={<Team />} />
      </Routes>

      {/* Footer CTA & Contact Form */}
      <section className="px-6 py-24 border-t border-gray-300 bg-white" id="contact-form-section">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading mb-4 text-brand-dark tracking-tight">Let's get started</h2>
            <p className="text-gray-600 text-lg">Fill out the form below and our team will get back to you shortly.</p>
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if (formErrors.name) setFormErrors({...formErrors, name: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-md border ${formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-colors`}
                  placeholder="Your Name"
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if (formErrors.email) setFormErrors({...formErrors, email: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-md border ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-colors`}
                  placeholder="your@email.com"
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea 
                id="message" 
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData({...formData, message: e.target.value});
                  if (formErrors.message) setFormErrors({...formErrors, message: ''});
                }}
                className={`w-full px-4 py-3 rounded-md border ${formErrors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-colors`}
                placeholder="How can we help you?"
              ></textarea>
              {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button type="submit" className="w-full sm:w-auto bg-brand-primary text-white px-8 py-3 rounded-md font-medium hover:bg-brand-dark transition-colors flex items-center justify-center gap-2">
                Send Message <ArrowRight className="w-4 h-4" />
              </button>
              {formStatus && <p className="text-green-600 font-medium">{formStatus}</p>}
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#fafafa] border-t border-gray-200 text-brand-dark font-sans flex flex-col justify-between h-[calc(100vh-86px)] pt-6 lg:pt-8 pb-3 md:pb-5 relative z-10 overflow-hidden">
        <div className="max-w-[85rem] mx-auto px-6 lg:px-12 w-full flex-1 flex flex-col justify-between h-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-1 min-h-0">
             {/* Left Column: Sketch & Contact */}
             <div className="lg:col-span-4 flex flex-col justify-between pr-0 lg:pr-8 min-h-0 pb-2">
               
               {/* Sketch Image */}
               <div className="w-full relative opacity-80 mix-blend-multiply contrast-125 flex-1 min-h-[180px] max-h-[260px] lg:max-h-[320px] shrink-0 mb-6 lg:mb-8 mt-2 lg:mt-3">
                 <img src="https://picsum.photos/seed/blueprint3/800/800" alt="Architectural Sketch" className="absolute inset-0 w-full h-full object-contain object-left grayscale" referrerPolicy="no-referrer" />
               </div>

               {/* Regional Contacts */}
               <div className="flex flex-col gap-1 text-[13px] md:text-[14px] font-light text-gray-800 shrink-0">
                 <p>Upstate Region: <span className="text-gray-600">(312) 555-0198</span></p>
                 <p>Coastal Region: <span className="text-gray-600">(713) 555-0145</span></p>
                 <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="text-brand-primary font-medium hover:underline mt-0.5 text-[13px] xl:text-[14px]">matthew.kalesanwo@fgipgroup.net</a>
               </div>
             </div>

             {/* Right Column: Links & Locations */}
             <div className="lg:col-span-8 flex flex-col justify-between pl-0 lg:pl-12 xl:pl-16 min-h-0 pb-2">
                
                {/* 3 Columns of Links */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-4 lg:mb-4 pt-0 shrink-0">
                  <div className="flex flex-col gap-1.5 text-[13px] lg:text-[14px] text-gray-600 font-light">
                    <Link to="/portfolio" onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors text-gray-800 font-medium pb-0.5 text-[15px]">Portfolio</Link>
                    <Link to="/portfolio" className="hover:text-brand-primary transition-colors truncate" title="Custom Homes">Custom Homes</Link>
                    <Link to="/portfolio" className="hover:text-brand-primary transition-colors truncate" title="Luxury Estates">Luxury Estates</Link>
                    <Link to="/portfolio" className="hover:text-brand-primary transition-colors truncate" title="Renovations">Renovations</Link>
                    <Link to="/portfolio" className="hover:text-brand-primary transition-colors line-clamp-2 md:line-clamp-1 truncate" title="International & Investment Projects">International &amp; Investment Projects</Link>
                  </div>
                  <div className="flex flex-col gap-1.5 text-[13px] lg:text-[14px] text-gray-600 font-light">
                    <Link to="/team" onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors text-gray-800 font-medium pb-0.5 text-[15px]">About</Link>
                    <Link to="/services" onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors">Services</Link>
                    <Link to="/team" onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors">Team</Link>
                    <Link to="/" onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors">Contact</Link>
                  </div>
                  <div className="flex flex-col gap-1.5 text-[13px] lg:text-[14px] text-gray-600 font-light pr-4">
                    <p className="text-transparent hidden sm:block select-none pointer-events-none mb-0 leading-none pb-0.5 text-[15px]">Social</p>
                    <a href="#" className="hover:text-brand-primary transition-colors text-gray-800">Facebook</a>
                    <a href="https://www.linkedin.com/company/first-generation-homes-llc/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">LinkedIn</a>
                    <a href="https://www.instagram.com/firstgenerationhomesllc/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">Instagram</a>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <div className="flex-1 w-full flex flex-col justify-center items-start py-2">
                   <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-medium hover:bg-[#20bd5a] transition-colors shadow-sm text-[13px] lg:text-[14px]">
                      <MessageCircle className="w-4 h-4" />
                      Contact us on whatsapp now
                   </a>
                </div>

                {/* Locations Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mt-auto shrink-0 pt-4">
                   <div>
                      <h4 className="text-brand-primary font-medium text-[15px] leading-none mb-1">Chicago, IL</h4>
                      <p className="text-gray-600 text-[12px] font-light leading-relaxed">444 W Lake Street<br/>Suite 1700<br/>Chicago, IL 60606</p>
                   </div>
                   <div>
                      <h4 className="text-brand-primary font-medium text-[15px] leading-none mb-1">Houston, TX</h4>
                      <p className="text-gray-600 text-[12px] font-light leading-relaxed">Houston, Texas<br/>United States</p>
                   </div>
                   <div>
                      <h4 className="text-brand-primary font-medium text-[15px] leading-none mb-1">Lagos, NG</h4>
                      <p className="text-gray-600 text-[12px] font-light leading-relaxed">Lekki &amp; Ikeja Offices<br/>Lagos, Nigeria</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Bottom Section (Copyright Edge) */}
          <div className="flex flex-col md:flex-row justify-between items-center text-[12px] text-gray-500 pt-3 mt-4 border-t border-gray-300 w-full shrink-0">
             <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
               <p>Copyright © 2026 First Generation Homes, Inc. All rights reserved.</p>
               <a href="#" className="hover:text-brand-dark transition-colors">Privacy Policy</a>
             </div>
             <p className="mt-2 md:mt-0 font-medium tracking-wide">Powered by FGIP</p>
          </div>
        </div>
      </footer>

      {/* Full Screen Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col items-start leading-none font-heading select-none text-brand-dark">
              <span className="text-lg md:text-xl font-light tracking-[0.15em] uppercase">First</span>
              <span className="text-xl md:text-2xl font-bold tracking-tight uppercase text-brand-primary">Generation</span>
              <span className="text-[0.55rem] md:text-[0.60rem] font-medium tracking-[0.5em] uppercase text-gray-500 mt-1">Homes</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-brand-dark hover:text-brand-primary transition-colors">
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-8 text-3xl font-heading font-light">
            <Link to="/" onClick={() => handleNavClick('/')} className="hover:text-brand-primary transition-colors">Home</Link>
            <Link to="/services" onClick={() => handleNavClick('/services')} className="hover:text-brand-primary transition-colors">Services</Link>
            <Link to="/portfolio" onClick={() => handleNavClick('/portfolio')} className="hover:text-brand-primary transition-colors">Portfolio</Link>
            <Link to="/team" onClick={() => handleNavClick('/team')} className="hover:text-brand-primary transition-colors">Team</Link>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[200] bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}

export default App;
