import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Custom Homes", "Luxury Estates", "Renovations & Custom Interiors", "International & Investment Projects"];

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
    title: "Modern 3-bedroom Estate",
    location: "Chicago, IL",
    category: "Luxury Estates",
    image: "/images/project-images/3-bedroom/3-bedroom2.jpg",
    images: [
      "/images/project-images/3-bedroom/3-bedroom2.jpg",
      "/images/project-images/3-bedroom/3-bedroom1.jpg"
    ],
    description: "A comprehensive interior build-out for a spacious 3-bedroom lakefront home designed for family living and frequent gatherings.\n\nThe project included detailed interior finishing, featuring a prominent large stone fireplace in the central living area, an expansive kitchen optimized for heavy daily use, and a custom-designed master suite overlooking the water.\n\nThe execution focused on high-quality construction, the use of durable, premium materials, and delivering a clean, straightforward, and timeless architectural aesthetic."
  },
  {
    id: "7",
    title: "Modern Custom Home Construction",
    location: "Chicago, IL",
    category: "Custom Homes",
    image: "/images/project-images/custom-home/custom1.jpg",
    images: [
      "/images/project-images/custom-home/custom1.jpg",
      "/images/project-images/custom-home/custom2.jpg",
      "/images/project-images/custom-home/custom3.jpg"
    ],
    description: "A complete custom home build integrating modern architectural design with highly functional, open-concept everyday living spaces.\n\nThe scope involved full-phase construction from site foundation to structural framing and high-end exterior finishing. Large-scale windows were strategically placed to maximize natural light throughout the residence.\n\nThe interior features premium hardwood flooring, custom-built cabinetry, and smart home infrastructure, delivering a cohesive, energy-efficient, and sophisticated living environment."
  },
  {
    id: "2",
    title: "Bathroom Remodels & Designs",
    location: "USA, Europe, Africa",
    category: "Renovations & Custom Interiors",
    image: "/images/project-images/bathrooms/bathroom1.jpg",
    images: [
      "/images/project-images/bathrooms/bathroom1.jpg",
      "/images/project-images/bathrooms/bathroom2.jpg",
      "/images/project-images/bathrooms/bathroom3.jpg",
      "/images/project-images/bathrooms/bathroom4.jpg"
    ],
    description: "A portfolio of complete teardowns and renovations of outdated master and guest bathrooms, transforming them into optimized, modern spa-like spaces tailored to specific client needs.\n\nThese projects typically require reconfiguring original layouts to maximize airiness and flow. Common signature installations include large freestanding soaking tubs positioned centrally, custom dual-sink vanities integrated with vertically tiled accent walls, and seamless glass walk-in showers.\n\nEach remodel is completed with the installation of warm, modern lighting fixtures and high-end plumbing hardware, ensuring a fully functional and deeply relaxing environment."
  },
  {
    id: "3",
    title: "Greenfield Estate Development",
    location: "Texas, USA",
    category: "Luxury Estates",
    image: "/images/project-images/greenfield/greenfield1.jpg",
    images: [
      "/images/project-images/greenfield/greenfield1.jpg"
    ],
    description: "Full-scale construction and site development of a new expansive residential estate property on a raw plot of land.\n\nThe scope of work encompassed comprehensive site management, including initial land clearing, earthworks, heavy-duty foundation pouring, and the structural framing of the main residential buildings.\n\nExecution involved the precise coordination of heavy equipment operations, procurement of premium-grade building materials, and rigorous timeline management to ensure solid workmanship and structural integrity across the entire build."
  },
  {
    id: "4",
    title: "Modern Kitchen Remodels",
    location: "USA, Europe, Africa",
    category: "Renovations & Custom Interiors",
    image: "/images/project-images/kitchen/kitchen1.jpg",
    images: [
      "/images/project-images/kitchen/kitchen1.jpg",
      "/images/project-images/kitchen/kitchen2.jpg"
    ],
    description: "A comprehensive collection of structural kitchen modernizations and redesigns that redefine the heart of the home to match the absolute taste and lifestyle demands of our clients.\n\nOur approach frequently involves tearing down enclosing walls to open up floor plans, allowing for the installation of massive focal-point islands, luxury stone countertops, and high-end integrated appliances. Whether the aesthetic goal is a sleek contemporary finish with dark grey accents or a rustic modern charm featuring exposed ceiling beams and wood-paneled fixtures, the core focus remains aligned.\n\nBy seamlessly pairing custom cabinetry with strategic layered lighting, these overhauls bridge tactile textures with modern convenience to deliver spaces built inherently for entertaining and everyday living."
  },
  {
    id: "8",
    title: "Modern Interior",
    location: "Various Locations",
    category: "Renovations & Custom Interiors",
    image: "/images/project-images/interior/interior1.jpg",
    images: [
      "/images/project-images/interior/interior1.jpg",
      "/images/project-images/interior/interior2.jpg",
      "/images/project-images/interior/interior3.jpg",
      "/images/project-images/interior/interior4.jpg",
      "/images/project-images/interior/interior5.jpg"
    ],
    description: "Curated interior decorating services focusing on clean lines, minimalist layouts, and sophisticated monochromatic or highly contrasted color palettes.\n\nOur modern decor projects emphasize utilizing negative space, bringing in natural light, and selecting low-profile, high-impact furniture pieces that serve both function and form. We integrate cutting-edge materials like polished concrete, glass, and brushed steel alongside plush, comfortable textiles to ensure the space never feels clinical.\n\nThe result is a highly tailored, uncluttered living environment that looks visually striking while remaining exceptionally livable for the modern homeowner."
  },
  {
    id: "6",
    title: "FGIP Legacy Estate",
    location: "Lagos, Nigeria",
    category: "International & Investment Projects",
    image: "/images/project-images/fgip/fgip1.jpg",
    images: [
      "/images/project-images/fgip/fgip1.jpg"
    ],
    comingSoon: true,
    description: "A premier luxury estate development located in the heart of Lagos, Nigeria, delivering world-class infrastructure and high-tech secure residential living.\n\nThe project is designed with a focus on long-term investment value, merging modern architectural standards with optimized commercial real estate frameworks. It serves both domestic homebuyers and international portfolio investors.\n\nThe development includes expansive green spaces, advanced integrated security systems, and premium community amenities. Site surveying, topographic engineering, and structural development are actively progressing toward a slated 2026 completion."
  }
];

export default function Portfolio() {
  const location = useLocation();
  const initialState = location.state as { category?: string } | null;
  const [activeFilter, setActiveFilter] = useState(initialState?.category || "All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentModalImageIdx, setCurrentModalImageIdx] = useState(0);

  useEffect(() => {
    if (location.state && (location.state as any).category) {
      setActiveFilter((location.state as any).category);
    } else if (location.pathname === '/portfolio' && !location.state) {
      // Optional: reset if explicitly navigated without state
      // setActiveFilter("All"); 
    }
  }, [location]);

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
        <div className="mb-16 portfolio-fade-up relative z-10">
          <div 
            className="group cursor-pointer block relative overflow-hidden transition-all duration-500 hover:-translate-y-1"
            onClick={() => openProject(featuredProject)}
          >
            <div className="overflow-hidden relative rounded-2xl mb-4">
              <img 
                src={featuredProject.image} 
                alt={featuredProject.title} 
                className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" 
                referrerPolicy="no-referrer" 
              />
              {featuredProject.comingSoon && (
                <div className="absolute top-6 right-6 bg-brand-dark/90 text-white px-4 py-2 font-bold tracking-widest text-sm uppercase rounded-lg z-10 pointer-events-none">
                  Coming soon in 2026
                </div>
              )}
            </div>
            <div className="bg-transparent flex justify-between items-start transition-colors px-2">
              <div className="flex-1 pr-6">
                <h2 className="text-3xl font-medium mb-2 text-brand-dark group-hover:text-brand-primary transition-colors font-heading">{featuredProject.title}</h2>
                <div className="flex items-center gap-2 mb-3 text-gray-600 text-sm font-medium">
                  <span className="text-brand-primary">{featuredProject.category}</span>
                  <span>•</span>
                  <span>{featuredProject.location}</span>
                </div>
                <p className="text-gray-700 text-base line-clamp-2 max-w-3xl leading-relaxed">
                  {featuredProject.description}
                </p>
              </div>
              <div className="text-brand-primary bg-brand-primary/10 rounded-full p-4 group-hover:bg-brand-primary group-hover:text-white transition-all shrink-0">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-24 relative z-10">
        {remainingProjects.map(project => (
          <div 
            key={project.id} 
            className="portfolio-fade-up group cursor-pointer transition-all duration-500 hover:-translate-y-1"
            onClick={() => openProject(project)}
          >
            <div className="relative overflow-hidden rounded-2xl mb-4">
              <img src={project.image} alt={project.title} className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute bottom-0 right-0 bg-brand-primary p-4 text-white group-hover:bg-brand-dark transition-colors z-20 rounded-tl-2xl">
                <ArrowRight className="w-6 h-6" />
              </div>
              {project.comingSoon && (
                <div className="absolute top-4 right-4 bg-brand-dark/90 text-white px-3 py-1 font-bold tracking-widest text-[10px] uppercase rounded-lg z-20 pointer-events-none">
                  Coming soon in 2026
                </div>
              )}
            </div>
            <div className="py-2 px-1">
              <h3 className="text-2xl font-medium text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">{project.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-brand-primary font-bold uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-gray-400 text-xs">•</span>
                <p className="text-gray-600 font-medium text-sm">{project.location}</p>
              </div>
              <p className="text-gray-700 text-base mb-4 line-clamp-3 leading-relaxed pr-2">
                {project.description}
              </p>
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
          <div className="bg-white w-full max-w-4xl lg:max-w-6xl h-[90vh] md:h-[80vh] max-h-[800px] relative z-10 shadow-2xl overflow-hidden rounded-xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
            
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
            <div className="w-full md:w-1/2 flex-1 md:h-full flex flex-col p-6 sm:p-8 md:p-10 lg:p-12 overflow-y-auto min-h-0 bg-white">
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase shrink-0">
                <span className="text-brand-primary">{selectedProject.category}</span>
                <span>•</span>
                <span>{selectedProject.location}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-heading mb-6 text-brand-dark leading-tight shrink-0">
                {selectedProject.title}
              </h2>
              
              <div className="w-12 h-1 bg-brand-primary mb-6 flex-shrink-0"></div>
              
              <div className="text-base text-gray-600 leading-relaxed whitespace-pre-wrap mb-8 flex-shrink-0">
                {selectedProject.description}
              </div>
              
              <div className="mt-auto pt-6 flex gap-4 text-sm font-medium border-t border-gray-100 shrink-0">
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
