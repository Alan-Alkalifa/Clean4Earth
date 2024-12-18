'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

interface CountUpServerProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export default function CountUpServer({ 
  end, 
  duration = 2.5, 
  suffix = '', 
  className = '' 
}: CountUpServerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <span className={className}>{end}{suffix}</span>;
  }

  return (
    <CountUp
      end={end}
      duration={duration}
      suffix={suffix}
      className={className}
    />
  );
}
