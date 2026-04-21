import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Custom Homes", "Luxury Estates", "Renovations", "International & Investment Projects"];

type Project = {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  images?: string[];
  description: string;
  comingSoon?: boolean;
};

const projects: Project[] = [
  {
    id: "1",
    title: "Lakefront Revival Estate",
    location: "Washington, USA",
    category: "Custom Homes",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    description: "The Harrison family approached the firm with a clear vision: they wanted a new lakefront home with plenty of room for their everyday family life and frequent gatherings.\n\nThe team completed all the interior work for this project. The main features include a prominent, large stone fireplace in the living area, an exceptionally spacious kitchen built precisely for heavy everyday use, and a tranquil master bedroom directly overlooking the water.\n\nThe interior was built exactly to their specifications, focusing heavily on quality construction, durable materials, and a straightforward, timeless design."
  },
  {
    id: "2",
    title: "Modern Spa Sanctuary",
    location: "California, USA",
    category: "Renovations",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=2000",
    description: "Dr. Evelyn Reed commissioned the team to completely renovate her old, outdated master bathroom, aiming to transform it into a peaceful space where she could relax fully after long hours at work.\n\nEverything from the original cramped bathroom was removed to build a completely new, optimized layout from scratch. The new, airy space features a large freestanding soaking tub placed elegantly in the center, and dual sleek sinks resting against a beautifully tiled accent wall.\n\nAccompanied by warm, new modern lighting, the team delivered an updated, fully functional bathroom space built exactly to her demanding needs."
  },
  {
    id: "3",
    title: "Greenfield Estate Development",
    location: "Texas, USA",
    category: "Luxury Estates",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop"
    ],
    description: "Sarah and Mark Sterling enlisted the firm to handle the full-scale construction and development of an expansive new residential estate property on a raw plot of land.\n\nThe entire site development was managed sequentially, including initial land clearing, pouring heavy-duty foundations, and executing the critical structural framing for the main buildings.\n\nThe project required coordinating multiple teams of heavy equipment, sourcing durable, premium building materials, and rigorously managing the construction timeline to get the family safely moved in on schedule. The team focused entirely on solid workmanship and structural integrity from start to finish."
  },
  {
    id: "4",
    title: "Contemporary Kitchen Overhaul",
    location: "Portland, OR",
    category: "Renovations",
    image: "https://storage.googleapis.com/bpe-chat-attachments-prod/489ca64d-7301-443b-a5d4-4b5fd4e67cd6/image.png",
    description: "The Martinez family requested a complete, top-to-bottom modernization of their severely outdated, closed-off kitchen space to better suit their love for home cooking and entertaining.\n\nThe team structurally opened up the floor plan and installed a large, gorgeous grey and white granite island to serve as the new heart and centerpiece of the room.\n\nPaired carefully with custom white cabinetry, modern pendant lighting overhead, and a bold dark grey accent wall, the new kitchen now offers both enhanced daily functionality and a cleanly defined, contemporary aesthetic."
  },
  {
    id: "5",
    title: "Rustic Modern Kitchen Remodel",
    location: "Austin, TX",
    category: "Renovations",
    image: "https://storage.googleapis.com/bpe-chat-attachments-prod/7fd47da1-e2ee-4dd1-b0db-6e6b5278c52d/image.png",
    description: "James and Clara Bow sought to infuse significant character, warmth, and life tightly into their otherwise standard suburban kitchen.\n\nThe team introduced warm, exposed wooden beams across the ceiling and constructed a large custom wood-paneled island that together bring immediate, tactile texture to the space.\n\nComplemented dynamically by crisp white cabinetry and practical open shelving, this remodel perfectly balances a rustic, inviting farmhouse charm with modern, everyday cooking convenience."
  },
  {
    id: "6",
    title: "FGIP Legacy Estate",
    location: "Lagos, Nigeria",
    category: "International & Investment Projects",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613490908653-b404abce6744?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop"
    ],
    comingSoon: true,
    description: "Welcome to FGIP Legacy Estate, a premier new development situated right in the vibrant heart of Lagos, Nigeria. This ambitious endeavor aims to bring world-class infrastructure, high-tech security, and residential luxury to one of Africa's most dynamic cities.\n\nDesigned specifically with long-term value in mind, this property stands as a highly lucrative, investment-worthy project for both domestic standard bearers and international portfolio investors. Modern architectural standards are merged with rich, local cultural aesthetics to ensure this estate stands as a genuine landmark.\n\nWith expansive green spaces, advanced security systems, and high-end community amenities planned, the estate perfectly represents the future of secure, luxury living. Dedicated local and international teams are rigorously progressing on site, with full completion slated for 2026."
  }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentModalImageIdx, setCurrentModalImageIdx] = useState(0);

  const filteredProjects = projects.filter(p => activeFilter === "All" || p.category === activeFilter);
  const featuredProject = filteredProjects[0];
  const remainingProjects = filteredProjects.slice(1);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentModalImageIdx(0);
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-fade-up', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    });

    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, [activeFilter]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="mb-12 lg:mb-20 portfolio-fade-up max-w-4xl">
        <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">OUR WORK</h3>
        <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading tracking-tight">Portfolio</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          From modern coastal retreats to sprawling mountain estates, our portfolio offers a swift yet in-depth look at our team's expertise, the enduring quality of our work, and our commitment to details that reflect the <span className="bg-brand-primary text-white px-1">vision of our clients.</span> Explore our custom home portfolio below.
        </p>

        <div className="mb-8">
          <h4 className="text-gray-500 mb-4">Filters</h4>
          <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`rounded-full px-5 py-2 text-sm whitespace-nowrap border transition-colors ${
                  activeFilter === category 
                    ? 'bg-brand-primary text-white border-brand-primary' 
                    : 'bg-transparent text-gray-600 border-gray-300 hover:border-brand-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {featuredProject && (
        <div className="mb-16 portfolio-fade-up">
          <div 
            className="group cursor-pointer block relative overflow-hidden rounded-sm"
            onClick={() => openProject(featuredProject)}
          >
            <div className="overflow-hidden relative">
              <img 
                src={featuredProject.image} 
                alt={featuredProject.title} 
                className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" 
                referrerPolicy="no-referrer" 
              />
              {featuredProject.comingSoon && (
                <div className="absolute top-6 right-6 bg-brand-dark/90 backdrop-blur-sm text-white px-4 py-2 font-bold tracking-widest text-sm uppercase shadow-xl rounded-sm z-10 pointer-events-none">
                  Coming soon in 2026
                </div>
              )}
            </div>
            <div className="bg-brand-primary text-white p-6 flex justify-between items-center transition-colors hover:bg-brand-dark">
              <div className="flex-1 pr-6">
                <h2 className="text-3xl font-medium mb-1">{featuredProject.title}</h2>
                <div className="flex items-center gap-2 mb-3 text-white/80 text-sm">
                  <span className="border border-white/40 rounded-full px-2 py-0.5 text-xs">{featuredProject.category}</span>
                  <span>•</span>
                  <span>{featuredProject.location}</span>
                </div>
                <p className="text-white/90 text-base line-clamp-2 max-w-3xl leading-relaxed">
                  {featuredProject.description}
                </p>
              </div>
              <div className="border border-white rounded-full p-3 group-hover:bg-white group-hover:text-brand-primary transition-colors shrink-0">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-24">
        {remainingProjects.map(project => (
          <div 
            key={project.id} 
            className="portfolio-fade-up group cursor-pointer"
            onClick={() => openProject(project)}
          >
            <div className="relative overflow-hidden rounded-sm">
              <img src={project.image} alt={project.title} className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute bottom-0 right-0 bg-brand-primary p-4 text-white group-hover:bg-brand-dark transition-colors z-20">
                <ArrowRight className="w-6 h-6" />
              </div>
              {project.comingSoon && (
                <div className="absolute top-4 right-4 bg-brand-dark/90 backdrop-blur-sm text-white px-3 py-1 font-bold tracking-widest text-[10px] uppercase shadow-md rounded-sm z-20 pointer-events-none">
                  Coming soon in 2026
                </div>
              )}
            </div>
            <div className="py-5">
              <h3 className="text-2xl font-medium text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">{project.title}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-gray-500 border border-gray-300 rounded-full px-2 py-0.5 inline-block">
                  {project.category}
                </span>
                <span className="text-gray-400 text-xs">•</span>
                <p className="text-gray-500 text-sm">{project.location}</p>
              </div>
              <p className="text-gray-600 text-base mb-4 line-clamp-3 leading-relaxed pr-4">
                {project.description}
              </p>
              <div className="text-brand-primary text-sm font-medium flex items-center gap-1 group-hover:underline">
                View Project Details <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal - Small Window Split Design */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
            onClick={() => setSelectedProject(null)} 
          />
          
          {/* Modal Content */}
          <div className="bg-white w-full max-w-4xl lg:max-w-6xl h-[85vh] md:h-[600px] lg:h-[700px] relative z-10 shadow-2xl overflow-hidden rounded-xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
            
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 bg-white/80 hover:bg-white popup-close-btn p-2 rounded-full text-brand-dark transition-colors z-[110] shadow-md border border-gray-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 cursor-pointer" />
            </button>

            {/* Left Side: Images */}
            <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-full relative bg-gray-100 flex items-center flex-shrink-0 group/slider overflow-hidden">
              {(() => {
                const gallery = selectedProject.images && selectedProject.images.length > 0 
                  ? selectedProject.images 
                  : [selectedProject.image];
                  
                return (
                  <>
                    <img 
                      src={gallery[currentModalImageIdx]} 
                      alt={`${selectedProject.title} view ${currentModalImageIdx + 1}`} 
                      className="w-full h-full absolute inset-0 object-cover animate-in fade-in duration-500" 
                      key={currentModalImageIdx}
                      referrerPolicy="no-referrer"
                    />
                    
                    {selectedProject.comingSoon && (
                      <div className="absolute top-6 left-6 bg-brand-dark/90 backdrop-blur-sm text-white px-4 py-2 font-bold tracking-widest text-xs md:text-sm uppercase shadow-xl rounded-sm z-30 pointer-events-none">
                        Coming soon in 2026
                      </div>
                    )}
                    
                    {gallery.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity z-20 pointer-events-none">
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setCurrentModalImageIdx((prev) => (prev === 0 ? gallery.length - 1 : prev - 1)); 
                          }}
                          className="bg-white/90 hover:bg-white hover:scale-105 transition-all p-2 rounded-full text-brand-dark shadow-lg pointer-events-auto cursor-pointer"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setCurrentModalImageIdx((prev) => (prev === gallery.length - 1 ? 0 : prev + 1)); 
                          }}
                          className="bg-white/90 hover:bg-white hover:scale-105 transition-all p-2 rounded-full text-brand-dark shadow-lg pointer-events-auto cursor-pointer"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                    
                    {gallery.length > 1 && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20 w-full pointer-events-none">
                        {gallery.map((_, idx) => (
                          <div 
                            key={idx} 
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentModalImageIdx ? 'bg-brand-primary w-6' : 'bg-white/70'}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Right Side: Details */}
            <div className="w-full md:w-1/2 flex-1 md:h-full flex flex-col p-6 sm:p-8 md:p-12 overflow-y-auto bg-white/95">
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                <span className="text-brand-primary">{selectedProject.category}</span>
                <span>•</span>
                <span>{selectedProject.location}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-heading mb-6 text-brand-dark leading-tight">
                {selectedProject.title}
              </h2>
              
              <div className="w-12 h-1 bg-brand-primary mb-6 flex-shrink-0"></div>
              
              <div className="text-base text-gray-600 leading-relaxed whitespace-pre-wrap mb-8">
                {selectedProject.description}
              </div>
              
              <div className="mt-auto pt-4 flex gap-4 text-sm font-medium border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Status</span>
                  <span className="text-brand-dark">
                    {selectedProject.comingSoon ? "Expected 2026" : "Completed"}
                  </span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
