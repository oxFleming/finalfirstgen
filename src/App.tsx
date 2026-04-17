import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, ArrowRight, Play, X, MessageCircle } from 'lucide-react';
import { Highlight, Button, SectionHeader, AccordionItem } from './components/ui';
import Services from './Services';
import Portfolio from './Portfolio';
import Team from './Team';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [activeReachAccordion, setActiveReachAccordion] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const teamWrapperRef = useRef<HTMLDivElement>(null);
  const teamContainerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

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

  const headerSolid = isScrolled || currentPage !== 'home';

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (currentPage === 'home') {
        // Stats Counter Animation
        if (statsRef.current && numberRef.current) {
          gsap.to(numberRef.current, {
            innerHTML: 99.9,
            duration: 2,
            snap: { innerHTML: 0.1 },
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 75%",
            },
            onUpdate: function() {
              if (numberRef.current) {
                numberRef.current.innerHTML = Number(this.targets()[0].innerHTML).toFixed(1);
              }
            }
          });
        }

        // Horizontal Scroll Team
        if (teamWrapperRef.current && teamContainerRef.current) {
          gsap.to(teamContainerRef.current, {
            x: () => -(teamContainerRef.current!.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: teamWrapperRef.current,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              end: () => "+=" + teamContainerRef.current!.scrollWidth
            }
          });
        }

        // Featured Projects Parallax & Active State
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card) => {
          const img = card.querySelector('.project-image');
          if (img) {
            gsap.to(img, {
              yPercent: 20,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            });
          }

          ScrollTrigger.create({
            trigger: card,
            start: "top center",
            end: "bottom center",
            toggleClass: "is-active",
          });
        });
      }

      // Fade up elements
      const fadeElements = document.querySelectorAll('.fade-up');
      fadeElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });
    });

    // Refresh ScrollTrigger after a short delay to account for mobile layout shifts and image loads
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-brand-gray font-sans selection:bg-brand-primary selection:text-white">
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 transition-all duration-300 ${headerSolid ? 'bg-white border-b border-gray-200 shadow-sm' : 'bg-transparent'}`}>
        <div onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }} className={`flex flex-col items-start leading-none font-heading select-none cursor-pointer transition-colors duration-300 ${headerSolid ? 'text-brand-dark' : 'text-white'}`}>
          <span className="text-lg md:text-xl font-light tracking-[0.15em] uppercase">First</span>
          <span className={`text-xl md:text-2xl font-bold tracking-tight uppercase transition-colors duration-300 ${headerSolid ? 'text-brand-primary' : 'text-white'}`}>Generation</span>
          <span className={`text-[0.55rem] md:text-[0.60rem] font-medium tracking-[0.5em] uppercase mt-1 transition-colors duration-300 ${headerSolid ? 'text-gray-500' : 'text-white/80'}`}>Homes</span>
        </div>
        <button onClick={() => setIsMenuOpen(true)} className={`p-2 transition-colors duration-300 ${headerSolid ? 'text-brand-dark hover:text-brand-primary' : 'text-white hover:text-white/80'}`}>
          <Menu className="w-7 h-7" />
        </button>
      </header>

      {currentPage === 'home' && (
        <main>
          {/* Hero Section */}
          <section className="relative h-[90vh] flex flex-col justify-center px-6 overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
          alt="Luxury Home Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80"></div>
        
        <div className="relative z-10 mt-20 fade-up">
          <h1 className="text-6xl md:text-8xl font-medium text-white leading-[1.1] mb-6 font-heading">
            We build<br />around <span className="italic font-light">you</span>
          </h1>
          <p className="text-xl text-white/90 mb-10 font-light">Client Focused. Community First.</p>
          <button onClick={() => { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }} className="bg-white/90 backdrop-blur-sm text-brand-dark rounded-full px-8 py-4 font-medium flex items-center gap-3 hover:bg-white transition-colors">
            Contact Us Now <ArrowRight className="w-5 h-5 text-brand-primary" />
          </button>
        </div>

        <div className="absolute bottom-8 left-6 right-6 flex justify-between text-white/80 text-xs tracking-[0.2em] uppercase font-bold fade-up z-10">
          <span>People</span>
          <span className="w-4 h-[1px] bg-white/50 my-auto"></span>
          <span>Principles</span>
          <span className="w-4 h-[1px] bg-white/50 my-auto"></span>
          <span>Progress</span>
        </div>
      </section>

      {/* Who We Are */}
      <section className="px-6 py-24 bg-brand-gray">
        <SectionHeader 
          subtitle="WHO WE ARE" 
          title={<>Real Estate Development & Construction the <Highlight>Right Way</Highlight></>} 
        />
        <p className="text-lg text-gray-700 leading-relaxed mb-10 fade-up">
          First Generation Homes LLC is a U.S.-based real estate development and construction company headquartered in Chicago, Illinois. Operating as part of the broader FGIP ecosystem, we focus on residential construction, renovation, and development projects while also supporting international real estate initiatives.
        </p>
        <div className="fade-up">
          <Button>About Us</Button>
        </div>
      </section>

      {/* Video Placeholder */}
      <section className="px-6 pb-24">
        <div className="relative aspect-video rounded-sm overflow-hidden fade-up">
          <img src="https://picsum.photos/seed/home-video/800/450" alt="Video thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <button className="w-20 h-20 rounded-full border-2 border-white/50 flex items-center justify-center backdrop-blur-sm hover:bg-white/10 transition-colors">
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </button>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="px-6 py-12">
        <SectionHeader 
          subtitle="OUR MISSION" 
          title={<>We are providers of superior, passionate service leaving a <Highlight>positive impact</Highlight> on everyone we involve, while bringing honor to God.</>} 
        />
        <div className="relative mt-16 h-[500px] fade-up">
          <img src="https://picsum.photos/seed/home-team1/600/800" alt="Team members" className="w-3/4 h-[400px] object-cover rounded-sm absolute left-0 top-0" referrerPolicy="no-referrer" />
          <img src="https://picsum.photos/seed/home-team2/600/400" alt="Team with truck" className="w-2/3 h-[250px] object-cover rounded-sm absolute right-0 bottom-0 border-4 border-brand-gray shadow-xl" referrerPolicy="no-referrer" />
        </div>
      </section>

      {/* Services (Moved Up) */}
      <section className="px-6 py-24 bg-white">
        <SectionHeader 
          subtitle="SERVICES" 
          title={<>Full-circle, <Highlight>proven</Highlight> building services at an unmatched <Highlight>value</Highlight>.</>} 
        />
        <div className="mb-16 fade-up">
          <Button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }}>View Services</Button>
        </div>

        <div className="border-t border-gray-300 fade-up">
          <AccordionItem 
            title="Custom Residential Construction" 
            content="We design and construct custom homes tailored to client specifications. Projects typically involve architectural design collaboration, structural construction, interior finishing, and landscaping integration."
            isOpen={activeAccordion === 0}
            onClick={() => setActiveAccordion(activeAccordion === 0 ? null : 0)}
          />
          <AccordionItem 
            title="Home Renovation & Modernization" 
            content="We undertake full-scale residential renovation projects aimed at upgrading existing homes and increasing property value, including kitchen remodels, bathroom renovations, and structural upgrades."
            isOpen={activeAccordion === 1}
            onClick={() => setActiveAccordion(activeAccordion === 1 ? null : 1)}
          />
          <AccordionItem 
            title="Building Development" 
            content="Transforming land into residential or mixed-use developments. Activities include development planning, building construction, project management, and development consulting."
            isOpen={activeAccordion === 2}
            onClick={() => setActiveAccordion(activeAccordion === 2 ? null : 2)}
          />
          <AccordionItem 
            title="Materials & Finishing" 
            content="We support construction projects through sourcing and installation of building finishing materials, including tile products, wood flooring, kitchen fixtures, and interior finishing materials."
            isOpen={activeAccordion === 3}
            onClick={() => setActiveAccordion(activeAccordion === 3 ? null : 3)}
          />
        </div>
      </section>

      {/* Trusted By - Infinite Marquee */}
      <section className="py-16 bg-white overflow-hidden border-y border-gray-200">
        <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-10 text-center">Trusted by:</h3>
        <div className="flex w-[200%] animate-marquee opacity-60 hover:opacity-100 transition-opacity duration-500">
          {[1, 2].map((set) => (
            <div key={set} className="flex justify-around items-center w-1/2 px-4 gap-16">
              <div className="font-bold text-3xl font-heading tracking-tighter">LUMINA</div>
              <div className="font-serif italic text-2xl">Oak & Stone</div>
              <div className="font-bold text-2xl tracking-widest">VERTEX</div>
              <div className="font-light text-3xl font-heading">NEXUS</div>
              <div className="font-bold text-2xl">ELEVATE</div>
              <div className="font-serif text-2xl">Crestview</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 py-24 bg-brand-gray">
        <h2 className="text-4xl md:text-5xl font-light text-brand-primary mb-6 fade-up font-heading">Featured Projects</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-10 fade-up max-w-2xl">
          Every distinct home in our diverse portfolio represents one uncommon commitment: Our determination to make your vision, experience and satisfaction the top priority. When you put people first, results follow—and these projects speak for themselves.
        </p>
        <div className="mb-16 fade-up">
          <Button onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>View Portfolio</Button>
        </div>

        <div className="relative mt-16 pb-32">
          {[
            { title: 'The Horizon Villa', loc: 'Chicago, IL', tag: 'Luxury Residential', img: 'home-proj1' },
            { title: 'Eco-Modern Retreat', loc: 'Houston, TX', tag: 'Sustainable', img: 'home-proj2' },
            { title: 'The Glass Pavilion', loc: 'Lekki, Lagos', tag: 'Architecture', img: 'home-proj3' },
            { title: 'Heritage Estate', loc: 'Chicago, IL', tag: 'Renovation', img: 'home-proj4' }
          ].map((proj, i) => (
            <div 
              key={i} 
              className="project-card sticky w-full bg-brand-gray group cursor-pointer"
              style={{ top: '100px' }}
              onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}
            >
              <div className="border-t border-gray-300 pt-8 pb-16">
                <h3 className="text-3xl md:text-4xl font-medium mb-1 transition-colors duration-300 font-heading group-[.is-active]:text-[#D32F2F] group-hover:text-[#D32F2F]">{proj.title}</h3>
                <p className="text-gray-600 mb-4 text-lg">{proj.loc}</p>
                <div className="flex justify-between items-center mb-8">
                  <span className="inline-block border border-gray-300 bg-gray-50 text-gray-500 text-sm px-3 py-1 rounded-sm uppercase tracking-wider">{proj.tag}</span>
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-colors duration-300 group-[.is-active]:border-[#D32F2F] group-[.is-active]:text-[#D32F2F] group-hover:border-[#D32F2F] group-hover:text-[#D32F2F]">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
                <div className="w-full aspect-[16/9] overflow-hidden relative">
                  <img 
                    src={`https://picsum.photos/seed/${proj.img}/1000/600`} 
                    alt={proj.title} 
                    className="project-image absolute top-[-15%] left-0 w-full h-[130%] object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Reach (Moved Down) */}
      <section className="px-6 py-24 bg-white border-t border-gray-300 mt-12">
        <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-10">OUR REACH</h3>
        <div className="border-t border-gray-300 fade-up">
          <AccordionItem 
            title="USA" 
            content="Headquartered in Chicago, Illinois, we deliver premium residential construction, renovation, and development projects across the United States, adhering to the highest standards of quality and modern lifestyle demands."
            isOpen={activeReachAccordion === 0}
            onClick={() => setActiveReachAccordion(activeReachAccordion === 0 ? null : 0)}
          />
          <AccordionItem 
            title="Europe" 
            content="Our European operations focus on strategic real estate initiatives, bringing our expertise in design, construction management, and premium finishing products to select international markets."
            isOpen={activeReachAccordion === 1}
            onClick={() => setActiveReachAccordion(activeReachAccordion === 1 ? null : 1)}
          />
          <AccordionItem 
            title="Africa" 
            content="We support international real estate development across Africa, leveraging the broader FGIP ecosystem to provide strategic expertise in residential development planning and infrastructure."
            isOpen={activeReachAccordion === 2}
            onClick={() => setActiveReachAccordion(activeReachAccordion === 2 ? null : 2)}
          />
        </div>
      </section>

      {/* Large Image */}
      <section className="w-full h-[70vh]">
        <img src="https://picsum.photos/seed/home-crane/1200/800" alt="Construction site" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </section>

      {/* Building for the best */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-light mb-6 fade-up font-heading">
          Building for the <Highlight>best</Highlight>
        </h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto fade-up">
          Our passion is building homes, improving communities, and growing relationships.
        </p>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img src="https://picsum.photos/seed/home-workers/1200/800" alt="Workers" className="absolute inset-0 w-full h-full object-cover grayscale opacity-30" referrerPolicy="no-referrer" />
        <div className="relative z-10 text-center">
          <div className="text-8xl md:text-[12rem] font-light text-brand-primary tracking-tighter leading-none font-heading">
            <span ref={numberRef}>0</span>%
          </div>
          <p className="text-xl md:text-2xl font-medium mt-4 text-brand-dark">Customer Satisfaction</p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 py-32 bg-gray-200 text-center">
        <p className="text-3xl md:text-4xl font-light text-brand-primary leading-tight mb-10 fade-up font-heading">
          "We truly appreciate your commitment on this project. I wanted to acknowledge the satisfaction on our remodel. I must give a 100% satisfied mark as you not only finished the job early and under budget, but with great sub-contractors and excellent workmanship. The job was done very efficiently and timely."
        </p>
        <div className="fade-up">
          <p className="font-medium text-lg">Raja Bilal</p>
          <p className="text-gray-600">CEO Focus with Raja</p>
        </div>
      </section>

      {/* Our Team - Horizontal Scroll */}
      <section ref={teamWrapperRef} className="bg-white py-24 overflow-hidden">
        <div className="px-6 mb-12 fade-up">
          <SectionHeader subtitle="LEADERSHIP" title={<>Meet the <Highlight>Executives</Highlight></>} />
        </div>
        <div ref={teamContainerRef} className="flex gap-8 px-6 w-max h-[60vh] min-h-[400px]">
          {[
            { name: "Remy Okunbena", role: "Managing Director", img: "remy" },
            { name: "Mathew Kalesanwo", role: "VP, Revenue Growth & Business Development", img: "mathew" },
            { name: "Olufolake Olumogba", role: "Director of Project Development & Infrastructure", img: "olufolake" },
            { name: "Arc. Sandra Airunugba", role: "Lead Architect and Project Manager", img: "sandra" }
          ].map((exec, i) => (
            <div key={i} className="w-[80vw] md:w-[30vw] h-full relative group shrink-0 rounded-xl overflow-hidden">
              <img src={`https://picsum.photos/seed/${exec.img}/800/1000`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                <h3 className="text-3xl font-heading mb-2">{exec.name}</h3>
                <p className="text-brand-primary tracking-widest uppercase text-sm font-bold">{exec.role}</p>
              </div>
            </div>
          ))}
          {/* View All Button Card */}
          <div className="w-[80vw] md:w-[30vw] h-full flex items-center justify-center shrink-0 bg-brand-gray rounded-xl p-12">
            <div className="text-center">
              <h3 className="text-3xl font-heading mb-6 text-brand-dark">The Minds Behind the Vision</h3>
              <Button onClick={() => { setCurrentPage('team'); window.scrollTo(0,0); }}>View Full Team</Button>
            </div>
          </div>
        </div>
      </section>
      </main>
      )}

      {currentPage === 'services' && <Services />}
      {currentPage === 'portfolio' && <Portfolio />}
      {currentPage === 'team' && <Team />}

      {/* Footer CTA & Contact Form */}
      <section className="px-6 py-24 border-b border-gray-300 bg-white" id="contact-form-section">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <h2 className="text-4xl font-heading mb-4 text-brand-dark">Let's get started</h2>
            <p className="text-gray-600">Fill out the form below and our team will get back to you shortly.</p>
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-6 fade-up" noValidate>
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
      <footer className="px-6 py-16 bg-brand-gray">
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-16 text-sm">
          <div>
            <p className="font-medium mb-1">US Operations:</p>
            <p className="text-gray-600">Chicago, IL | Houston, TX</p>
          </div>
          <div>
            <p className="font-medium mb-1">International:</p>
            <p className="text-gray-600">Lagos, Nigeria</p>
          </div>
          <div className="col-span-2 flex flex-col items-start gap-4 mt-2">
            <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="text-brand-primary font-medium text-lg break-all">matthew.kalesanwo@fgipgroup.net</a>
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-md font-medium hover:bg-[#20bd5a] transition-colors shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
              Send us a dm on Whatsapp
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-4 text-lg font-light mb-16">
          <button onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }} className="text-left hover:text-brand-primary transition-colors">Home</button>
          <button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="text-left hover:text-brand-primary transition-colors">Services</button>
          <button onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }} className="text-left hover:text-brand-primary transition-colors">Portfolio</button>
          <button onClick={() => { setCurrentPage('team'); window.scrollTo(0,0); }} className="text-left hover:text-brand-primary transition-colors">Team</button>
        </div>

        <div className="grid grid-cols-2 gap-y-4 text-lg font-light border-t border-b border-gray-300 py-8 mb-12">
          <a href="https://www.linkedin.com/company/first-generation-homes-llc/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">LinkedIn</a>
          <a href="https://www.instagram.com/firstgenerationhomesllc/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">Instagram</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm mb-16">
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

        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">Copyright © 2026 First Generation Homes, Inc. All rights reserved.</p>
          <a href="#" className="hover:text-brand-dark transition-colors">Privacy Policy</a>
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
            <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); window.scrollTo(0,0); }} className="hover:text-brand-primary transition-colors">Home</button>
            <button onClick={() => { setCurrentPage('services'); setIsMenuOpen(false); window.scrollTo(0,0); }} className="hover:text-brand-primary transition-colors">Services</button>
            <button onClick={() => { setCurrentPage('portfolio'); setIsMenuOpen(false); window.scrollTo(0,0); }} className="hover:text-brand-primary transition-colors">Portfolio</button>
            <button onClick={() => { setCurrentPage('team'); setIsMenuOpen(false); window.scrollTo(0,0); }} className="hover:text-brand-primary transition-colors">Team</button>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}

export default App;
