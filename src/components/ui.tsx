import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Highlight = ({ children }: { children: React.ReactNode }) => {
  const el = useRef<HTMLSpanElement>(null);
  const bg = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!el.current || !bg.current || !textRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el.current,
        start: "top 85%",
      }
    });

    tl.fromTo(bg.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: "power3.inOut", transformOrigin: "left center" }
    ).to(textRef.current, {
      color: 'white',
      duration: 0.1
    }, "-=0.25");

  }, []);

  return (
    <span ref={el} className="relative inline-block px-2 py-0.5 mx-0.5">
      <span ref={bg} className="absolute inset-0 bg-brand-primary z-0 origin-left"></span>
      <span ref={textRef} className="relative z-10 text-brand-dark transition-colors">{children}</span>
    </span>
  );
};

export const Button = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <button className={`group flex items-center gap-2 rounded-full border border-brand-dark px-6 py-3 text-sm font-medium transition-colors hover:bg-brand-dark hover:text-white ${className}`}>
      {children}
      <ArrowRight className="w-4 h-4 text-brand-primary group-hover:text-white transition-colors" />
    </button>
  );
};

export const SectionHeader = ({ subtitle, title }: { subtitle: string, title: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.children, 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } }
    );
  }, []);

  return (
    <div ref={ref} className="mb-8">
      <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">{subtitle}</h3>
      <h2 className="text-4xl md:text-5xl font-light leading-tight text-brand-dark">{title}</h2>
    </div>
  );
};

export const AccordionItem = ({ title, content, isOpen, onClick }: { title: string, content: string, isOpen: boolean, onClick: () => void }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.4, ease: "power2.out" });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-300">
      <button 
        onClick={onClick}
        className={`w-full py-6 flex justify-between items-center text-left transition-colors ${isOpen ? 'text-brand-primary' : 'text-brand-dark'}`}
      >
        <span className="text-xl font-medium">{title}</span>
        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>
      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <p className="pb-6 text-gray-600 leading-relaxed">{content}</p>
      </div>
    </div>
  );
};
