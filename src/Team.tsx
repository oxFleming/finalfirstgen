import React, { useEffect } from 'react';
import gsap from 'gsap';

const teamMembers = [
  { name: "John Doe", role: "Chief Executive Officer", img: "exec1" },
  { name: "Jane Smith", role: "Chief Operations Officer", img: "exec2" },
  { name: "Michael Johnson", role: "Chief Financial Officer", img: "exec3" },
  { name: "Sarah Williams", role: "VP of Construction", img: "exec4" },
  { name: "David Brown", role: "Head of Architecture", img: "exec5" },
  { name: "Emily Davis", role: "Director of Sustainability", img: "exec6" },
];

export default function Team() {
  useEffect(() => {
    gsap.fromTo('.team-fade-up',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );
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
