import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Highlight, Button } from './components/ui';

export default function Services() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const fadeElements = document.querySelectorAll('.services-fade-up');
      fadeElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });
    });

    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, []);

  const ServiceSection = ({ id, title, quote, text, highlight, listTitle, list, img }: any) => (
    <div id={id} className="pt-24 border-t border-gray-200 mt-12 services-fade-up scroll-mt-40 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      <div>
        <h2 className="text-4xl font-light mb-6 font-heading">{title}</h2>
        {quote && <p className="text-xl text-gray-600 mb-6 font-light">"{quote}"</p>}
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          {text.split(highlight).map((part: string, i: number, arr: any[]) => 
            i === arr.length - 1 ? part : <React.Fragment key={i}>{part}<Highlight>{highlight}</Highlight></React.Fragment>
          )}
        </p>
        <h4 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-6">{listTitle}</h4>
        <ul className="space-y-4 mb-10">
          {list.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0"></span>
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mb-0">
          <Button onClick={() => { document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Get Started</Button>
        </div>
      </div>
      <img src={img} alt={title} className="w-full aspect-[4/3] lg:aspect-[16/9] object-cover rounded-sm sticky top-32" referrerPolicy="no-referrer" />
    </div>
  );

  return (
    <div className="pt-32 pb-24 lg:pt-48 lg:pb-32 max-w-7xl lg:max-w-[90rem] mx-auto px-6">
      <div className="max-w-4xl">
        <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-6 services-fade-up">SERVICES</h3>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-12 font-heading tracking-tight services-fade-up">From blueprint to<br/>ribbon-cutting</h1>
      </div>
      
      <div className="sticky top-[73px] bg-brand-gray z-40 py-4 border-b border-gray-300 flex gap-6 overflow-x-auto whitespace-nowrap text-sm font-medium mb-12 services-fade-up">
        <a href="#custom-homes" className="hover:text-brand-primary transition-colors">Custom Homes</a>
        <a href="#renovation" className="hover:text-brand-primary transition-colors">Renovation</a>
        <a href="#development" className="hover:text-brand-primary transition-colors">Development</a>
        <a href="#materials" className="hover:text-brand-primary transition-colors">Materials</a>
      </div>

      <div className="text-lg text-gray-700 leading-relaxed space-y-8 mb-16 services-fade-up">
        <p>When you bring our team to the table, we bring your vision to life with creativity, clarity, and accountability. Operating as part of the broader FGIP ecosystem, First Generation Homes prides itself on our ability to be a one-stop-shop, <Highlight>guiding you</Highlight> from sketch to stunning final result.</p>
        <p>We solve problems others can't or won't with creativity. We build <Highlight>lasting relationships</Highlight> with candor. And we specialize in details that reflect the modern lifestyle and market demands, both in the US and internationally.</p>
      </div>

      <img src="https://picsum.photos/seed/ribbon-cutting/1200/600" alt="Ribbon cutting" className="w-full aspect-[21/9] object-cover rounded-sm mb-12 services-fade-up" referrerPolicy="no-referrer" />

      <ServiceSection 
        id="custom-homes"
        title="Custom Residential Construction"
        quote="Delivering high-quality residential spaces designed around both functionality and aesthetic appeal."
        text="The company designs and constructs custom homes tailored to client specifications. This capability allows us to deliver high-quality residential spaces designed around both functionality and aesthetic appeal."
        highlight="functionality and aesthetic appeal"
        listTitle="PROJECTS TYPICALLY INVOLVE"
        list={[
          "Architectural design collaboration",
          "Structural construction",
          "Interior finishing",
          "Landscaping integration"
        ]}
        img="https://picsum.photos/seed/custom-home/1200/800"
      />

      <ServiceSection 
        id="renovation"
        title="Home Renovation & Property Modernization"
        text="First Generation Homes LLC undertakes full-scale residential renovation projects aimed at upgrading existing homes and increasing property value. These projects improve property performance and increase long-term asset value."
        highlight="increasing property value"
        listTitle="TYPICAL RENOVATION PROJECTS"
        list={[
          "Kitchen remodels",
          "Bathroom renovations",
          "Structural upgrades",
          "Interior redesign and exterior modernization"
        ]}
        img="https://picsum.photos/seed/renovation/1200/800"
      />

      <ServiceSection 
        id="development"
        title="Building Development & Real Estate Projects"
        text="The company also engages in property development projects that involve transforming land into residential or mixed-use developments. This capability aligns directly with the development strategy used in the FGIP Legacy Estate master plan."
        highlight="transforming land"
        listTitle="ACTIVITIES INCLUDE"
        list={[
          "Development planning",
          "Building construction",
          "Project management",
          "Development consulting and procurement"
        ]}
        img="https://picsum.photos/seed/development/1200/800"
      />

      <ServiceSection 
        id="materials"
        title="Construction Materials & Finishing Products"
        text="First Generation Homes LLC also supports construction projects through sourcing and installation of building finishing materials. These supply capabilities can help reduce procurement costs and improve quality control during estate construction."
        highlight="improve quality control"
        listTitle="THESE INCLUDE"
        list={[
          "Tile products",
          "Wood flooring",
          "Kitchen fixtures",
          "Bathroom installations and interior finishing materials"
        ]}
        img="https://picsum.photos/seed/materials/1200/800"
      />

      {/* Value Engineering */}
      <div className="pt-24 border-t border-gray-200 mt-12 services-fade-up">
        <h4 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-6">VALUE ENGINEERING PHILOSOPHY</h4>
        <h2 className="text-4xl font-light mb-8 font-heading">Value Engineering ≠ Scope Cutting</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-12">
          At First Generation Homes, we put the VALUE back in Value Engineering! VE, a buzzword in our industry, is too often used by contractors to justify cutting scope or including inferior products to achieve budget. Our preconstruction process, artfully hones in on the overall worth of each part, piece, and design decision made. We are on a constant mission to make sure that every dollar spent in your construction project has the maximum value squeezed out of it. Our track record of delivering project goals within budget speaks for itself, just ask our clients.
        </p>
        <h3 className="text-3xl md:text-5xl font-light leading-tight mb-16 font-heading">
          We join the customer's journey, take on their goals, guide them through the design phase and deliver a building that will best <Highlight>accomplish those goals.</Highlight>
        </h3>
        <div className="relative h-[600px]">
          <img src="https://picsum.photos/seed/ve-crane/800/1000" alt="Workers with crane" className="w-2/3 h-[500px] object-cover rounded-sm absolute right-0 top-0" referrerPolicy="no-referrer" />
          <img src="https://picsum.photos/seed/ve-team/600/400" alt="Team photo" className="w-2/3 h-[300px] object-cover rounded-sm absolute left-0 bottom-0 border-8 border-brand-gray shadow-2xl" referrerPolicy="no-referrer" />
        </div>
      </div>

      {/* Testimonial */}
      <div className="pt-32 pb-12 text-center services-fade-up">
        <p className="text-2xl md:text-4xl font-light text-brand-primary leading-tight mb-10 font-heading">
          "Our experience with First Generation Homes LLC, was marked by high integrity, good quality, and high value work. Because of the cooperation and sensitivity of First Generation Homes LLC, we were able to continue our entire renovation during the construction period. First Generation Homes LLC, began our renovation by providing a very competitive bid; demonstrating a willingness to work through options; and accepting a challenging schedule."
        </p>
        <p className="font-medium text-lg">Julius A</p>
        <p className="text-gray-600">CEO Leadway Pharmacy</p>
      </div>
    </div>
  );
}
