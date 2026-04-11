import React, { useEffect } from 'react';
import gsap from 'gsap';

const teamMembers = [
  { name: "Remy Okunbena", role: "Managing Director, First Generation Homes LLC", img: "remy" },
  { name: "Mathew Kalesanwo", role: "VP, Revenue Growth & Business Development", img: "mathew" },
  { name: "Uju Amazu", role: "Chief Operating Officer", img: "uju" },
  { name: "Olufolake Olumogba", role: "Director of Project Development & Infrastructure", img: "olufolake" },
  { name: "Arc. Sandra Airunugba", role: "Lead Architect and Project Manager", img: "sandra" },
  { name: "Taplong Lucy James", role: "Legal/Compliance Officer", img: "lucy" },
  { name: "Engr. Olaoye Sunday Joel", role: "Engineering", img: "olaoye" },
  { name: "Engr. Azeez Opeyemi", role: "Engineering", img: "azeez" },
  { name: "Gbemi Adebayo", role: "Team Member", img: "gbemi" },
  { name: "Tope Makinde", role: "Team Member", img: "tope" },
  { name: "Adeoye Oluwamayokun Jude", role: "Team Member", img: "adeoye" },
  { name: "Alade Abosede Mauyon", role: "Team Member", img: "alade" },
  { name: "Omeri Titus", role: "Team Member", img: "omeri" },
];

export default function Team() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-fade-up',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="mb-16 team-fade-up">
        <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">OUR PEOPLE</h3>
        <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading">Meet the Team</h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
          The minds behind First Generation Homes. Our leadership team brings decades of experience in real estate development, construction management, and architectural design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, i) => (
          <div key={i} className="team-fade-up group cursor-pointer">
            <div className="w-full aspect-[3/4] overflow-hidden rounded-xl mb-6">
              <img src={`https://picsum.photos/seed/${member.img}/600/800`} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-2xl font-heading mb-1">{member.name}</h3>
            <p className="text-brand-primary font-medium text-sm uppercase tracking-widest">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
