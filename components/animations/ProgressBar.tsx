'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ProgressBarProps {
  percentage: number;
  label: string;
}

export default function ProgressBar({ percentage, label }: ProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate the progress bar width
      gsap.fromTo(
        progressRef.current,
        { 
          width: "0%",
          opacity: 0
        },
        {
          width: `${percentage}%`,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: progressRef.current,
            start: "top 85%",
            toggleActions: "play none none reset"
          }
        }
      );

      // Animate the percentage number
      gsap.fromTo(
        numberRef.current,
        { 
          textContent: "0",
          opacity: 0
        },
        {
          textContent: percentage,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: progressRef.current,
            start: "top 85%",
            toggleActions: "play none none reset"
          }
        }
      );
    });

    return () => ctx.revert();
  }, [percentage]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-text-primary">{label}</span>
        <span ref={numberRef} className="text-sm font-medium text-primary">
          0%
        </span>
      </div>
      <div className="w-full bg-gray-200/50 rounded-full h-2.5 overflow-hidden">
        <div
          ref={progressRef}
          className="bg-primary h-2.5 rounded-full transform origin-left"
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  );
}
