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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerSolid ? 'bg-white border-b border-gray-200 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto flex justify-between items-center px-6 py-4 md:py-6 lg:py-8 lg:px-12">
          <Link to="/" onClick={() => handleNavClick('/')} className={`flex flex-col items-start leading-none font-heading select-none cursor-pointer transition-colors duration-300 ${headerSolid ? 'text-brand-dark' : 'text-white'}`}>
            <span className="text-lg md:text-xl lg:text-2xl font-light tracking-[0.15em] uppercase">First</span>
            <span className={`text-xl md:text-2xl lg:text-3xl font-bold tracking-tight uppercase transition-colors duration-300 ${headerSolid ? 'text-brand-primary' : 'text-white'}`}>Generation</span>
            <span className={`text-[0.55rem] md:text-[0.60rem] lg:text-[0.7rem] font-medium tracking-[0.5em] uppercase mt-1 transition-colors duration-300 ${headerSolid ? 'text-gray-500' : 'text-white/80'}`}>Homes</span>
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
      <section className="px-6 py-24 lg:py-32 border-t border-gray-300 bg-white" id="contact-form-section">
        <div className="max-w-3xl lg:max-w-4xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl lg:text-6xl font-heading mb-4 text-brand-dark tracking-tight">Let's get started</h2>
            <p className="text-gray-600 lg:text-xl">Fill out the form below and our team will get back to you shortly.</p>
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
      <footer className="bg-brand-gray border-t border-gray-300">
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 gap-x-8 mb-16 lg:mb-24">
            <div className="md:col-span-2">
              <div className="flex flex-col items-start leading-none font-heading select-none mb-8">
                <span className="text-xl font-light tracking-[0.15em] uppercase">First</span>
                <span className="text-2xl font-bold tracking-tight uppercase text-brand-primary">Generation</span>
                <span className="text-[0.60rem] font-medium tracking-[0.5em] uppercase mt-1 text-gray-500">Homes</span>
              </div>
              <div className="flex flex-col items-start gap-4 mt-2">
                <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="text-brand-dark font-medium hover:text-brand-primary transition-colors">matthew.kalesanwo@fgipgroup.net</a>
                <a 
                  href="https://wa.me/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-md font-medium hover:bg-[#20bd5a] transition-colors shadow-sm mt-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send us a dm on Whatsapp
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 md:col-span-2 w-full">
              <div className="flex flex-col gap-4 text-lg font-light">
                <Link to="/" onClick={() => window.scrollTo(0,0)} className="text-left hover:text-brand-primary transition-colors">Home</Link>
                <Link to="/services" onClick={() => window.scrollTo(0,0)} className="text-left hover:text-brand-primary transition-colors">Services</Link>
                <Link to="/portfolio" onClick={() => window.scrollTo(0,0)} className="text-left hover:text-brand-primary transition-colors">Portfolio</Link>
                <Link to="/team" onClick={() => window.scrollTo(0,0)} className="text-left hover:text-brand-primary transition-colors">Team</Link>
              </div>

              <div className="flex flex-col gap-4 text-lg font-light">
                <a href="https://www.linkedin.com/company/first-generation-homes-llc/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">LinkedIn</a>
                <a href="https://www.instagram.com/firstgenerationhomesllc/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">Instagram</a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm mb-16 border-t border-gray-300 pt-12">
            <div>
              <h4 className="text-brand-primary font-bold text-base mb-2">Chicago HQ</h4>
              <p className="text-gray-600">444 W Lake Street<br/>Suite 1700<br/>Chicago, IL 60606</p>
            </div>
            <div>
              <h4 className="text-brand-primary font-bold text-base mb-2">Houston</h4>
              <p className="text-gray-600">Houston, Texas<br/>United States</p>
            </div>
            <div>
              <h4 className="text-brand-primary font-bold text-base mb-2">Lagos</h4>
              <p className="text-gray-600">Lekki & Ikeja Offices<br/>Lagos, Nigeria</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 pt-8 border-t border-gray-300">
            <p className="mb-4 md:mb-0">Copyright © 2026 First Generation Homes, Inc. All rights reserved.</p>
            <a href="#" className="hover:text-brand-dark transition-colors">Privacy Policy</a>
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
