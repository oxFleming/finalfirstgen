import React, { useEffect, useState } from 'react';
import { Menu, ArrowRight, X, MessageCircle } from 'lucide-react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Services from './Services';
import Portfolio from './Portfolio';
import Team from './Team';
import Home from './Home';
import FAQ from './FAQ';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const isHome = location.pathname === '/';
  const headerSolid = isScrolled || !isHome;

  const handleFormSubmit = async (e: React.FormEvent) => {
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
      setFormStatus('Sending message...');
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setFormStatus('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setFormStatus(''), 5000);
        } else {
          setFormStatus(result.error || 'Failed to send message.');
        }
      } catch (error) {
        console.error(error);
        setFormStatus('Failed to send message. Please try again.');
      }
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
    <div className="min-h-screen bg-transparent font-sans selection:bg-brand-primary selection:text-white relative">
      
      {/* Global Colorful Mesh Background */}
      <div className="bg-mesh">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerSolid ? 'bg-white/70 backdrop-blur-2xl shadow-sm border-b border-white/50' : 'bg-transparent'}`}>
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
            <Link to="/faq" onClick={() => handleNavClick('/faq')} className={`hover:text-brand-primary transition-colors ${headerSolid ? 'text-brand-dark' : 'text-white/90'}`}>FAQ</Link>
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
        <Route path="/faq" element={<FAQ />} />
      </Routes>

      {/* Footer CTA & Contact Form */}
      <section className="px-6 py-24 border-t border-white/40 bg-white/30 backdrop-blur-3xl relative z-10" id="contact-form-section">
        <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-2xl p-8 lg:p-12 rounded-[2rem] shadow-2xl border border-white/50">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading mb-4 text-brand-dark tracking-tight">Let's get started</h2>
            <p className="text-gray-700 text-lg">Fill out the form below and our team will get back to you shortly.</p>
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if (formErrors.name) setFormErrors({...formErrors, name: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-md border ${formErrors.name ? 'border-red-500 bg-red-50' : 'border-white/60 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-colors shadow-sm`}
                  placeholder="Your Name"
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if (formErrors.email) setFormErrors({...formErrors, email: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-md border ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-white/60 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-colors shadow-sm`}
                  placeholder="your@email.com"
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-1">Message *</label>
              <textarea 
                id="message" 
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData({...formData, message: e.target.value});
                  if (formErrors.message) setFormErrors({...formErrors, message: ''});
                }}
                className={`w-full px-4 py-3 rounded-md border ${formErrors.message ? 'border-red-500 bg-red-50' : 'border-white/60 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-colors shadow-sm`}
                placeholder="How can we help you?"
              ></textarea>
              {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
            </div>
            <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full xl:w-auto">
                <button type="submit" className="w-full sm:w-auto bg-brand-primary text-white px-8 py-3 rounded-md font-medium hover:bg-brand-dark transition-colors flex items-center justify-center gap-2 shadow-md lg:text-lg whitespace-nowrap">
                  Send Message <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
                  <span className="text-gray-600 font-medium text-[15px] whitespace-nowrap">Contact us directly on Whatsapp:</span>
                  <a 
                    href="https://wa.me/2347037412354" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white p-2 md:p-2.5 rounded-full hover:bg-[#20bd5a] transition-all hover:scale-105 shadow-md flex items-center justify-center cursor-pointer shrink-0 group"
                    title="Chat on WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
              </div>
              {formStatus && <p className="text-green-600 font-medium">{formStatus}</p>}
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white/40 backdrop-blur-3xl border-t border-white/50 text-brand-dark font-sans flex flex-col justify-between h-auto lg:h-[calc(100vh-86px)] min-h-[calc(100vh-86px)] pt-10 lg:pt-8 pb-3 md:pb-5 relative z-10 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="max-w-[85rem] mx-auto px-6 lg:px-12 w-full flex-1 flex flex-col justify-between h-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 flex-1 min-h-0">
             {/* Left Column: Sketch & Contact */}
             <div className="lg:col-span-4 flex flex-col justify-between pr-0 lg:pr-8 min-h-0 pb-2 mb-4 lg:mb-0">
               
               {/* Sketch Image */}
               <div className="w-[calc(100%+3rem)] -mx-6 lg:mx-0 lg:w-full relative opacity-80 mix-blend-multiply contrast-125 flex-1 min-h-[220px] max-h-[260px] lg:max-h-[320px] shrink-0 mb-6 lg:mb-8 -mt-10 lg:mt-3 lg:bg-transparent">
                 <img src="/images/mission/footer.jpg" alt="Architectural Sketch" className="absolute inset-0 w-full h-full object-cover lg:object-contain lg:object-left object-center grayscale" referrerPolicy="no-referrer" />
               </div>

               {/* Regional Contacts */}
               <div className="flex flex-col gap-1 text-[13px] md:text-[14px] font-light text-gray-800 shrink-0 text-center lg:text-left mt-4 lg:mt-0">
                 <p>Direct Line: <span className="text-gray-600">+1 630 326 5117</span></p>
                 <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="text-brand-primary font-medium hover:underline mt-0.5 text-[13px] xl:text-[14px]">matthew.kalesanwo@fgipgroup.net</a>
               </div>
             </div>

             {/* Right Column: Links & Locations */}
             <div className="lg:col-span-8 flex flex-col justify-between pl-0 lg:pl-12 xl:pl-16 min-h-0 pb-2">
                
                {/* 3 Columns of Links */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 lg:mb-4 pt-4 lg:pt-0 shrink-0">
                  <div className="flex flex-col gap-2 lg:gap-1.5 text-[13px] lg:text-[14px] text-gray-600 font-light">
                    <Link to="/portfolio" state={{ category: "All" }} onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors text-gray-800 font-medium pb-1 md:pb-0.5 text-[15px]">Portfolio</Link>
                    <Link to="/portfolio" state={{ category: "Custom Homes" }} onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors truncate" title="Custom Homes">Custom Homes</Link>
                    <Link to="/portfolio" state={{ category: "Luxury Estates" }} onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors truncate" title="Luxury Estates">Luxury Estates</Link>
                    <Link to="/portfolio" state={{ category: "Renovations & Custom Interiors" }} onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors truncate" title="Renovations & Custom Interiors">Renovations &amp; Custom Interiors</Link>
                    <Link to="/portfolio" state={{ category: "International & Investment Projects" }} onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors pr-2" title="International & Investment Projects">International &amp; Investment Projects</Link>
                  </div>
                  <div className="flex flex-col gap-2 lg:gap-1.5 text-[13px] lg:text-[14px] text-gray-600 font-light">
                    <Link to="/team" onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors text-gray-800 font-medium pb-1 md:pb-0.5 text-[15px]">About</Link>
                    <Link to="/services" onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors">Services</Link>
                    <Link to="/team" onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors">Team</Link>
                    <Link to="/faq" onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors">FAQ</Link>
                    <Link to="/" onClick={() => window.scrollTo(0,0)} className="hover:text-brand-primary transition-colors">Contact</Link>
                  </div>
                  <div className="flex flex-col gap-2 lg:gap-1.5 text-[13px] lg:text-[14px] text-gray-600 font-light pr-4 col-span-2 md:col-span-1 mt-2 md:mt-0">
                    <p className="text-transparent hidden md:block select-none pointer-events-none mb-0 leading-none pb-0.5 text-[15px]">Social</p>
                    <a href="#" className="hover:text-brand-primary transition-colors text-gray-800">Facebook</a>
                    <a href="https://www.linkedin.com/company/first-generation-homes-llc/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">LinkedIn</a>
                    <a href="https://www.instagram.com/firstgenerationhomesllc/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">Instagram</a>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <div className="flex-1 w-full flex flex-col justify-center items-center lg:items-start py-8 lg:py-2">
                   <a href="https://wa.me/2347037412354" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 lg:py-2.5 rounded-full font-medium hover:bg-[#20bd5a] transition-colors shadow-sm text-[13px] lg:text-[14px]">
                      <MessageCircle className="w-4 h-4 lg:w-4 lg:h-4" />
                      Contact us on whatsapp now
                   </a>
                </div>

                {/* Locations Row */}
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-6 mt-auto shrink-0 pt-4 pb-4 lg:pb-0 border-t lg:border-t-0 border-gray-200">
                   <div>
                      <h4 className="text-brand-primary font-medium text-[15px] leading-none mb-1.5 lg:mb-1">Chicago, IL</h4>
                      <p className="text-gray-600 text-[12px] font-light leading-relaxed">444 W Lake Street<br/>Suite 1700<br/>Chicago, IL 60606</p>
                   </div>
                   <div>
                      <h4 className="text-brand-primary font-medium text-[15px] leading-none mb-1.5 lg:mb-1">Houston, TX</h4>
                      <p className="text-gray-600 text-[12px] font-light leading-relaxed">Houston, Texas<br/>United States</p>
                   </div>
                   <div>
                      <h4 className="text-brand-primary font-medium text-[15px] leading-none mb-1.5 lg:mb-1">Lagos, NG</h4>
                      <p className="text-gray-600 text-[12px] font-light leading-relaxed">Lekki &amp; Ikeja Offices<br/>Lagos, Nigeria</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Bottom Section (Copyright Edge) */}
          <div className="flex flex-col lg:flex-row justify-between items-center text-[12px] text-gray-500 pt-5 lg:pt-3 mt-4 border-t border-gray-300 w-full shrink-0 text-center lg:text-left pb-4 lg:pb-0">
             <div className="flex flex-col lg:flex-row items-center gap-2 md:gap-6">
               <p>Copyright © 2026 First Generation Homes, Inc. All rights reserved.</p>
               <a href="#" className="hover:text-brand-dark transition-colors">Privacy Policy</a>
             </div>
             <p className="mt-3 lg:mt-0 font-medium tracking-wide">Powered by FGIP</p>
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
            <Link to="/faq" onClick={() => handleNavClick('/faq')} className="hover:text-brand-primary transition-colors">FAQ</Link>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/2347037412354" 
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
