'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ChatWidthProps = {
  children: React.ReactNode;
} & Omit<AnimationType, 'direction'>;

type AnimationType = {
  duration?: number;
  direction: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  offset?: number;
  opacity?: number;
};

export const AnimateChatWidth = ({
  children,
  delay = 0,
  opacity = 0,
  duration = 0.5,
}: ChatWidthProps): React.JSX.Element => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ele = container.current;

      if (!ele) return;

      const vars: gsap.TweenVars = {
        width: 10,
        height: '10px',
        opacity,
      };

      gsap.fromTo(ele, vars, {
        width: 'auto',
        height: 'auto',
        opacity: 1,
        duration,
        delay,
        ease: 'power4.in',
        scrollTrigger: {
          trigger: ele,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: container },
  );

  return <div ref={container}>{children}</div>;
};
