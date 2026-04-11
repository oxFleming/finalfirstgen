import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const categories = ["All", "Custom Homes", "Luxury Estates", "Renovations", "Sustainable Builds", "International Development"];

const projects = [
  {
    id: "1",
    title: "The Horizon Villa",
    location: "Chicago, IL",
    category: "Luxury Estates",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    description: "PERCHED ON THE SHORES OF LAKE MICHIGAN, THIS ESTATE BLENDS SEAMLESSLY WITH THE HORIZON, FEATURING FLOOR-TO-CEILING GLASS AND INFINITY EDGE POOLS."
  },
  {
    id: "2",
    title: "Eco-Modern Retreat",
    location: "Houston, TX",
    category: "Sustainable Builds",
    image: "https://images.unsplash.com/photo-1600607687931-cebf14cdffdd?q=80&w=2000&auto=format&fit=crop",
    description: "A NET-ZERO ENERGY HOME NESTLED IN THE TEXAS LANDSCAPE, UTILIZING PASSIVE COOLING, SOLAR INTEGRATION, AND LOCALLY SOURCED MATERIALS."
  },
  {
    id: "3",
    title: "Classic Craftsman Revival",
    location: "Chicago, IL",
    category: "Renovations",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    description: "A COMPLETE HISTORIC RESTORATION THAT PRESERVED THE ORIGINAL 1920S CHARM WHILE INTRODUCING MODERN LUXURY AMENITIES AND OPEN LIVING SPACES."
  },
  {
    id: "4",
    title: "The Glass Pavilion",
    location: "Lekki, Lagos",
    category: "International Development",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
    description: "A BREATHTAKING ARCHITECTURAL MASTERPIECE DESIGNED TO MAXIMIZE COASTAL VIEWS WITH MINIMALIST AESTHETICS AND STRUCTURAL STEEL ELEGANCE."
  },
  {
    id: "5",
    title: "Coastal Haven",
    location: "Houston, TX",
    category: "Custom Homes",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop",
    description: "A SOUTHERN COASTAL DREAM HOME FEATURING WRAPAROUND PORCHES, HURRICANE-RESILIENT ENGINEERING, AND CUSTOM MILLWORK THROUGHOUT."
  },
  {
    id: "6",
    title: "FGIP Legacy Estate",
    location: "Ikeja, Lagos",
    category: "International Development",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2000&auto=format&fit=crop",
    description: "A MASTER-PLANNED MULTIFAMILY RESIDENTIAL DEVELOPMENT REDEFINING LUXURY LIVING IN EMERGING MARKETS WITH STATE-OF-THE-ART AMENITIES."
  },
  {
    id: "7",
    title: "Urban Oasis",
    location: "Chicago, IL",
    category: "Custom Homes",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2000&auto=format&fit=crop",
    description: "A CONTEMPORARY IN-FILL PROJECT IN THE HEART OF CHICAGO FEATURING A PRIVATE COURTYARD, SMART HOME AUTOMATION, AND A FLOATING STAIRCASE."
  }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter(p => activeFilter === "All" || p.category === activeFilter);
  const featuredProject = filteredProjects[0];
  const remainingProjects = filteredProjects.slice(1);

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
    <div className="pt-32 pb-24 max-w-5xl mx-auto">
      <div className="px-6 mb-12 portfolio-fade-up">
        <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">OUR WORK</h3>
        <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading">Portfolio</h1>
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
          <img src={featuredProject.image} alt={featuredProject.title} className="w-full h-[300px] md:h-[500px] object-cover" referrerPolicy="no-referrer" />
          <div className="bg-brand-primary text-white p-6 flex justify-between items-center cursor-pointer hover:bg-brand-primary/90 transition-colors">
            <div>
              <h2 className="text-2xl font-medium mb-1">{featuredProject.title}</h2>
              <p className="text-white/80 text-sm">{featuredProject.location}</p>
            </div>
            <div className="border border-white rounded-full p-2">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
          <div className="px-6 py-8">
            <div className="flex gap-6 text-gray-400 mb-6">
              <ArrowLeft className="w-8 h-8 cursor-pointer hover:text-brand-primary transition-colors" />
              <ArrowRight className="w-8 h-8 cursor-pointer hover:text-brand-primary transition-colors" />
            </div>
            <div className="border-l-2 border-brand-primary pl-6 ml-2">
              <p className="font-mono uppercase tracking-wider text-sm text-gray-800 leading-relaxed">
                {featuredProject.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {remainingProjects.map(project => (
          <div key={project.id} className="portfolio-fade-up group cursor-pointer">
            <div className="relative overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute bottom-0 right-0 bg-brand-primary p-4 text-white">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
            <div className="py-4">
              <h3 className="text-xl font-medium text-brand-dark mb-1">{project.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{project.location}</p>
              <span className="text-xs text-gray-500 border border-gray-300 rounded-full px-3 py-1 inline-block">
                {project.category}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center gap-4 mt-12 mb-24 portfolio-fade-up">
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-colors">
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
