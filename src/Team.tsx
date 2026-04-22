import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X } from 'lucide-react';

const teamMembers = [
  { 
    name: "Remy Okunbena", 
    role: "Managing Director, First Generation Homes LLC", 
    img: "remy",
    bio: [
      "Remy Okunbena brings over two decades of progressive leadership in civil engineering, project development, and strategic operations. As Managing Director of First Generation Homes LLC, she leads the company’s mission to deliver innovative, affordable housing solutions with a focus on sustainability, precision, and long-term value.",
      "Holding a Bachelor’s Degree in Civil Engineering from Stanford University and an MBA from Harvard Business School, her career spans senior roles at top firms where she led large-scale developments.",
      "Under her guidance, First Generation Homes fosters a values-driven culture, ensuring every team member aligns with the company's commitment to quality, integrity, and client-focused innovation."
    ]
  },
  { 
    name: "Mathew Kalesanwo", 
    role: "VP, Revenue Growth & Business Development", 
    img: "mathew", 
    bio: [
      "Matthew Kalesanwo is the Vice President of Revenue Growth and Business Development, a strategic builder, and a human-centered leader. His career has spanned continents and industries, but one principle guides it all: growth rooted in trust.",
      "With over $500M in revenue influenced and $10M in losses reversed, he has led global teams, built partnerships from the ground up, and turned complex challenges into clear, actionable wins. But numbers alone don’t define him. He believes in the power of emotional intelligence, follow-through, and the kind of leadership that listens before it leads.",
      "He advocates for people—whether it’s contractors seeking opportunity, clients navigating change, or his own family building a future. His approach blends data with empathy, strategy with sincerity, and ambition with accountability.",
      "His story is one of resilience, responsibility, and relentless hope. Matthew's leadership is defined by his commitment to collaboration, connection, and sharing his vision for the future."
    ] 
  },
  { 
    name: "Uju Amazu", 
    role: "Chief Operating Officer", 
    img: "uju", 
    bio: [
      "Uju Amazu is an accomplished operations executive with over 20 years of leadership experience in P&L management, procurement, budgeting, and enterprise controls. As Chief Operating Officer at First Generation Homes LLC, she oversees the firm’s operational strategy, streamlining project execution, optimizing financial performance, and ensuring alignment across teams and markets.",
      "Her strengths in performance improvement, staff development, and operational governance have been instrumental in scaling high-growth initiatives and delivering cost-effective results. Uju holds a BA/BS in Business, blending deep financial acumen with a hands-on leadership style that fosters excellence and accountability throughout the organization."
    ] 
  },
  { 
    name: "Olufolake Olumogba", 
    role: "Director of Project Development & Infrastructure", 
    img: "olufolake", 
    bio: [
      "Olufolake is a chartered architect with over 30 years of design and development leadership across the UK and Africa. She is a member of the Royal Institute of British Architects (RIBA) and the Royal Incorporation of Architects in Scotland (RIAS), as well as an associate member of the Nigerian Institute of Architects (NIA).",
      "Her expertise spans urban building design, landscape architecture, and interior design, having served as a consultant, designer, and project promoter across major international developments. At First Generation Homes LLC, she leads infrastructure delivery and project innovation, ensuring each development meets the highest standards of function, sustainability, and architectural distinction."
    ] 
  },
  { name: "Arc. Sandra Airunugba", role: "Lead Architect and Project Manager", img: "sandra", bio: ["More details coming soon."] },
  { 
    name: "Taplong Lucy James", 
    role: "Legal & Compliance Specialist", 
    img: "lucy", 
    bio: [
      "Taplong Lucy James is a legal and compliance professional with over five years of experience in regulatory compliance, contract management, and risk mitigation.",
      "She supports FGIP Legacy Luxury Estate by ensuring legally sound operations, accurate documentation, and adherence to regulatory standards across all project activities.",
      "Taplong brings strong analytical skills, governance insight, and a detail‑driven approach to land transactions, due diligence, and contract administration."
    ] 
  },
  { 
    name: "Engr. Olaoye Sunday Joel", 
    role: "Engineering", 
    img: "olaoye", 
    bio: [
      "Engr. Olaoye Sunday Joel is a construction engineer with a Bachelor’s degree in Engineering, specializing in site supervision, quality control, and the safe, efficient delivery of roads, bridges, and building projects. He ensures seamless coordination between design and field execution, keeping every project on schedule, within budget, and compliant with engineering standards."
    ] 
  },
  { name: "Engr. Azeez Opeyemi", role: "Engineering", img: "azeez", bio: ["More details coming soon."] },
  { name: "Gbemi Adebayo", role: "Team Member", img: "gbemi", bio: ["More details coming soon."] },
  { name: "Tope Makinde", role: "Team Member", img: "tope", bio: ["More details coming soon."] },
  { 
    name: "Adeoye Oluwamayokun Jude", 
    role: "Team Member", 
    img: "adeoye", 
    bio: [
      "Adeoye Oluwamayokun Jude is an accomplished architect with over 10 years of experience in design development, construction detailing, and large‑scale real estate projects. A graduate of YABATECH and Caleb University, he has delivered more than 500 residential, commercial, and mixed‑use designs across Nigeria. He currently leads design development at Interior Culture and is the Founder of MJ Design Studio. Jude brings a strong commitment to innovation, sustainability, and user‑focused architecture to the FGIP Legacy Estate."
    ] 
  },
  { name: "Alade Abosede Mauyon", role: "Team Member", img: "alade", bio: ["More details coming soon."] },
  { 
    name: "Omeri Titus Okechukwu", 
    role: "Procurement and Logistics Officer", 
    img: "omeri", 
    bio: [
      "Omeri Titus Okechukwu is a seasoned petroleum operations professional with over 17 years of experience in offshore cargo handling, STS operations, loss control, and terminal compliance.",
      "His background in supervising complex, high‑risk logistics environments brings strong operational discipline, safety leadership, and technical rigor to FGIP Legacy Luxury Estate.",
      "He holds a B.Eng. in Chemical Engineering and a Ship Survey Certification from the Maritime Training Academy, UK."
    ] 
  },
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-fade-up',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    });

    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, []);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="mb-16 lg:mb-24 team-fade-up max-w-4xl bg-white/40 backdrop-blur-xl p-8 lg:p-12 rounded-[2rem] border border-white/60 shadow-xl relative z-10">
        <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">OUR PEOPLE</h3>
        <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading tracking-tight drop-shadow-sm">Meet the Team</h1>
        <p className="text-lg text-gray-800 leading-relaxed max-w-3xl font-medium">
          The minds behind First Generation Homes. Our leadership team brings decades of experience in real estate development, construction management, and architectural design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 relative z-10">
        {teamMembers.map((member, i) => (
          <div 
            key={i} 
            className="team-fade-up group cursor-pointer bg-white/40 backdrop-blur-md p-4 rounded-3xl border border-white/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            onClick={() => setSelectedMember(member)}
          >
            <div className="w-full aspect-[3/4] overflow-hidden rounded-[1.5rem] mb-6 relative shadow-inner">
              <img src={`https://picsum.photos/seed/${member.img}/600/800`} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-brand-primary text-white p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-8 h-8" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-heading mb-1 group-hover:text-brand-primary transition-colors px-2">{member.name}</h3>
            <p className="text-brand-primary font-medium text-sm border-t border-brand-primary/20 pt-2 px-2 mt-2 tracking-widest leading-relaxed line-clamp-2">{member.role}</p>
          </div>
        ))}
      </div>

      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          ></div>
          <div className="relative bg-white w-full max-w-3xl lg:max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] lg:max-h-[80vh]">
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-brand-dark hover:text-brand-primary hover:bg-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full md:w-2/5 h-64 md:h-auto shrink-0">
              <img 
                src={`https://picsum.photos/seed/${selectedMember.img}/600/800`} 
                alt={selectedMember.name} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="p-6 md:p-8 lg:p-12 overflow-y-auto w-full">
              <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-2">Team Member</h3>
              <h2 className="text-3xl lg:text-5xl font-heading mb-2">{selectedMember.name}</h2>
              <p className="text-gray-500 font-medium text-xs lg:text-sm uppercase tracking-widest mb-6 lg:mb-8 pb-6 lg:pb-8 border-b border-gray-200">
                {selectedMember.role}
              </p>
              <div className="text-base text-gray-700 leading-relaxed space-y-4">
                {selectedMember.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
