import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';
import { Highlight, Button, SectionHeader, AccordionItem } from './components/ui';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [activeReachAccordion, setActiveReachAccordion] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const teamWrapperRef = useRef<HTMLDivElement>(null);
  const teamContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Fade up elements
      const fadeElements = document.querySelectorAll('.fade-up');
      fadeElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });
    });

    // Refresh ScrollTrigger after a short delay
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo(0,0);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex flex-col justify-center px-6 overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
          alt="Luxury Home Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80"></div>
        
        <div className="relative z-10 fade-up max-w-7xl mx-auto w-full">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium text-white leading-[1] mb-6 font-heading tracking-tight">
            We build<br />around <span className="italic font-light">you</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 font-light">Client Focused. Community First.</p>
          <button onClick={() => { document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="bg-white/90 backdrop-blur-sm text-brand-dark rounded-full px-8 py-4 font-medium flex items-center gap-3 hover:bg-white transition-colors cursor-pointer w-max">
            Contact Us Now <ArrowRight className="w-5 h-5 text-brand-primary" />
          </button>
        </div>

        <div className="absolute bottom-8 lg:bottom-12 left-6 right-6 lg:left-12 lg:right-12 flex justify-between text-white/80 text-xs tracking-[0.2em] uppercase font-bold fade-up z-10">
          <span>People</span>
          <span className="w-4 h-[1px] bg-white/50 my-auto"></span>
          <span>Principles</span>
          <span className="w-4 h-[1px] bg-white/50 my-auto"></span>
          <span>Progress</span>
        </div>
      </section>

      {/* Merged Redesign */}
      <section className="px-6 py-16 lg:py-20 flex items-center bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          {/* Text Side (Left) */}
          <div className="order-2 lg:order-1 fade-up pr-0 lg:pr-8">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.1] mb-5 text-gray-800 tracking-tight font-heading">
              Real Estate Development &amp;<br className="hidden lg:block"/> Construction the <span className="bg-brand-primary text-white px-3 py-1 inline-block mt-2 leading-[1.1]">Right Way</span>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-6 max-w-lg font-light">
              First Generation Homes LLC is a U.S.-based real estate development and construction company headquartered in Chicago, Illinois. Operating as part of the broader FGIP ecosystem, we focus on residential construction, renovation, and development projects while also supporting international real estate initiatives.
            </p>
            <button onClick={() => handleNavigate('/team')} className="border border-brand-primary text-gray-800 rounded-full px-6 py-2.5 font-medium flex items-center gap-3 hover:bg-brand-primary hover:text-white transition-colors cursor-pointer w-max text-sm group">
              About Us <ArrowRight className="w-4 h-4 text-gray-800 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Video Side (Right) */}
          <div className="order-1 lg:order-2 relative fade-up mt-6 lg:mt-0">
             {/* Floating Line attached to Image */}
             <div className="absolute top-8 lg:top-16 -left-6 lg:-left-12 w-16 lg:w-24 h-[2px] bg-brand-primary z-10 hidden md:block"></div>
             
             <div className="relative aspect-[4/3] lg:aspect-video w-full shadow-lg group select-none overflow-hidden rounded-sm bg-gray-100">
                <img src="https://picsum.photos/seed/contractor3/1600/900" alt="Construction Worker" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-[3px] border-white flex items-center justify-center cursor-pointer backdrop-blur-md transition-transform hover:scale-105 shadow-xl bg-black/20">
                    <Play className="w-6 h-6 lg:w-8 lg:h-8 text-white ml-1.5 drop-shadow-md" fill="currentColor" />
                  </div>
                </div>
             </div>
          </div>
          
        </div>
      </section>

      {/* Our Mission */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative h-[500px] lg:h-[600px] fade-up">
            <img src="https://picsum.photos/seed/home-team1/800/1000" alt="Team members" className="w-[80%] lg:w-3/4 h-[400px] lg:h-[500px] object-cover rounded-sm absolute left-0 top-0 shadow-lg" referrerPolicy="no-referrer" />
            <img src="https://picsum.photos/seed/home-team2/800/600" alt="Team with truck" className="w-[70%] lg:w-2/3 h-[250px] lg:h-[300px] object-cover rounded-sm absolute right-0 bottom-0 border-[8px] border-white shadow-2xl z-10" referrerPolicy="no-referrer" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeader 
              subtitle="OUR MISSION" 
              title={<>We are providers of superior, passionate service leaving a <Highlight>positive impact</Highlight> on everyone we involve, while bringing honor to God.</>} 
            />
            {/* Custom Purple Arrow */}
            <div className="mt-12 flex justify-center lg:justify-start fade-up">
              <div className="w-16 h-16 rounded-full border-2 border-brand-primary flex items-center justify-center cursor-pointer hover:bg-brand-primary group transition-colors shadow-sm">
                <ArrowRight className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services (Moved Up) */}
      <section className="px-6 py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <SectionHeader 
                subtitle="SERVICES" 
                title={<>Full-circle, <Highlight>proven</Highlight> building services at an unmatched <Highlight>value</Highlight>.</>} 
              />
              <div className="mb-16 fade-up">
                <Button onClick={() => handleNavigate('/services')}>View Services</Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 border-t border-gray-300 fade-up">
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
        </div>
      </section>

      {/* Trusted By - Infinite Marquee */}
      <section className="py-16 bg-white overflow-hidden border-y border-gray-200">
        <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-10 text-center">TRUSTED BY</h3>
        <div className="flex w-max animate-marquee opacity-60 hover:opacity-100 transition-opacity duration-500">
          {[1, 2].map((set) => (
            <div key={set} className="flex justify-around items-center gap-12 sm:gap-16 lg:gap-24 px-6 md:px-12 shrink-0">
              <div className="font-bold text-2xl md:text-3xl font-heading tracking-tighter shrink-0">LUMINA</div>
              <div className="font-serif italic text-xl md:text-2xl shrink-0">Oak & Stone</div>
              <div className="font-bold text-xl md:text-2xl tracking-widest shrink-0">VERTEX</div>
              <div className="font-light text-2xl md:text-3xl font-heading shrink-0">NEXUS</div>
              <div className="font-bold text-xl md:text-2xl shrink-0">ELEVATE</div>
              <div className="font-serif text-xl md:text-2xl shrink-0">Crestview</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-brand-primary mb-6 fade-up font-heading tracking-tight">Featured Projects</h2>
              <p className="text-lg text-gray-700 leading-relaxed fade-up">
                Every distinct home in our diverse portfolio represents one uncommon commitment: Our determination to make your vision, experience and satisfaction the top priority. When you put people first, results follow—and these projects speak for themselves.
              </p>
            </div>
            <div className="fade-up shrink-0">
              <Button onClick={() => handleNavigate('/portfolio')}>View Portfolio</Button>
            </div>
          </div>

          <div className="relative mt-8 pb-32">
          {[
            { 
              title: 'FGIP Legacy Estate', 
              loc: 'Lagos, Nigeria', 
              tag: 'International & Investment Projects', 
              img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop' 
            },
            { 
              title: 'Contemporary Kitchen Overhaul', 
              loc: 'Portland, OR', 
              tag: 'Renovations', 
              img: 'https://storage.googleapis.com/bpe-chat-attachments-prod/489ca64d-7301-443b-a5d4-4b5fd4e67cd6/image.png' 
            },
            { 
              title: 'Lakefront Revival Estate', 
              loc: 'Washington, USA', 
              tag: 'Custom Homes', 
              img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop' 
            }
          ].map((proj, i) => (
            <div 
              key={i} 
              className="project-card sticky w-full bg-brand-gray group cursor-pointer"
              style={{ top: '80px' }}
              onClick={() => handleNavigate('/portfolio')}
            >
              <div className="border-t border-gray-300 pt-8 pb-12 lg:pb-16">
                <h3 className="text-3xl lg:text-4xl font-medium mb-1 transition-colors duration-300 font-heading group-[.is-active]:text-[#D32F2F] group-hover:text-[#D32F2F]">{proj.title}</h3>
                <p className="text-gray-600 mb-6 text-lg">{proj.loc}</p>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <span className="inline-block border border-gray-300 bg-gray-50 text-gray-500 text-sm px-3 py-1 rounded-sm uppercase tracking-wider">{proj.tag}</span>
                  <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center transition-colors duration-300 group-[.is-active]:border-[#D32F2F] group-[.is-active]:text-[#D32F2F] group-hover:border-[#D32F2F] group-hover:text-[#D32F2F] shrink-0">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
                <div className="w-full aspect-[16/9] lg:aspect-auto lg:h-[55vh] overflow-hidden relative rounded-xl shadow-lg">
                  <img 
                    src={proj.img} 
                    alt={proj.title} 
                    className="project-image absolute top-[-15%] left-0 w-full h-[130%] object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Our Reach (Moved Down) */}
      <section className="px-6 py-24 bg-white border-t border-gray-300 mt-12">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </section>

      {/* Large Image */}
      <section className="w-full h-[60vh]">
        <img src="https://picsum.photos/seed/home-crane/2400/1200" alt="Construction site" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </section>

      {/* Building for the best */}
      <section className="px-6 py-24 lg:py-32 text-center max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 fade-up font-heading tracking-tight">
          Building for the <Highlight>best</Highlight>
        </h2>
        <p className="text-lg text-gray-600 max-w-md lg:max-w-2xl mx-auto fade-up">
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
      <section className="px-6 py-16 lg:py-24 bg-gray-200 text-center flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-brand-primary leading-snug mb-8 fade-up font-heading tracking-tight mx-auto">
            "We truly appreciate your commitment on this project. I wanted to acknowledge the satisfaction on our remodel. I must give a 100% satisfied mark as you not only finished the job early and under budget, but with great sub-contractors and excellent workmanship. The job was done very efficiently and timely."
          </p>
          <div className="fade-up">
            <p className="font-medium text-base">Raja Bilal</p>
            <p className="text-gray-600 text-sm">CEO Focus with Raja</p>
          </div>
        </div>
      </section>

      {/* Our Team - Horizontal Scroll */}
      <section ref={teamWrapperRef} className="bg-white pt-24 pb-24 lg:pt-32 lg:pb-32 overflow-hidden w-full relative">
        <div className="w-full">
          <div className="px-6 mb-8 lg:mb-10 fade-up max-w-7xl mx-auto w-full">
            <h3 className="text-brand-primary text-[10px] font-bold tracking-widest uppercase mb-2">LEADERSHIP</h3>
            <h2 className="text-3xl lg:text-4xl font-light leading-tight text-brand-dark">Meet the <Highlight>Executives</Highlight></h2>
          </div>
          <div ref={teamContainerRef} className="flex gap-4 lg:gap-5 px-6 lg:px-auto max-w-7xl mx-auto w-max lg:w-full">
            {[
              { name: "Remy Okunbena", role: "Managing Director", img: "remy" },
              { name: "Mathew Kalesanwo", role: "VP, Revenue Growth & Business Development", img: "mathew" },
              { name: "Olufolake Olumogba", role: "Director of Project Development & Infrastructure", img: "olufolake" },
              { name: "Arc. Sandra Airunugba", role: "Lead Architect and Project Manager", img: "sandra" }
            ].map((exec, i) => (
              <div key={i} className="w-[80vw] sm:w-[240px] lg:w-[230px] xl:w-[250px] aspect-[4/5] relative group shrink-0 rounded-xl overflow-hidden shadow-lg">
                <img src={`https://picsum.photos/seed/${exec.img}/800/1000`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                  <h3 className="text-lg font-heading mb-1">{exec.name}</h3>
                  <p className="text-brand-primary tracking-widest uppercase text-[9px] font-bold leading-tight line-clamp-2">{exec.role}</p>
                </div>
              </div>
            ))}
            {/* View All Button Card */}
            <div className="w-[80vw] sm:w-[240px] lg:w-[230px] xl:w-[250px] aspect-[4/5] flex items-center justify-center shrink-0 bg-brand-gray rounded-xl p-6 shadow-md">
              <div className="text-center">
                <h3 className="text-lg font-heading mb-4 text-brand-dark">The Minds Behind the Vision</h3>
                <Button onClick={() => handleNavigate('/team')}>View Full Team</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
