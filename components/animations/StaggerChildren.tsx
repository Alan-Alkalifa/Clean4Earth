'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  duration?: number;
  className?: string;
}

export default function StaggerChildren({
  children,
  staggerDelay = 0.2,
  duration = 1,
  className = '',
}: StaggerChildrenProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const childElements = container.children;

    gsap.fromTo(
      childElements,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        stagger: staggerDelay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [staggerDelay, duration]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
