'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger, useGSAP, TextPlugin);

type ChatWidthProps = Omit<AnimationProps, 'direction'>;

type AnimationProps = {
  duration?: number;
  direction: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  offset?: number;
  opacity?: number;
  children: React.ReactNode;
  className?: string;
};

export const AnimateChatWidth = ({
  children,
  delay = 0,
  opacity = 0,
  duration = 0.5,
  className,
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

  return (
    <div ref={container} className={twMerge(clsx(className))}>
      {children}
    </div>
  );
};

export const AnimateSlideIn = ({
  direction,
  opacity = 0,
  duration = 0.5,
  delay = 0,
  offset = 100,
  className,
  children,
}: AnimationProps): React.JSX.Element => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ele = container.current;

      if (!ele) return;

      const vars: GSAPTweenVars = {
        opacity,
        ease: 'power4.inOut',
        duration,
        delay,
        scrollTrigger: {
          trigger: ele,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      };

      if (direction === 'left') vars.x = -offset;
      if (direction === 'right') vars.x = offset;
      if (direction === 'top') vars.y = -offset;
      if (direction === 'bottom') vars.y = offset;

      gsap.from(ele, vars);
    },
    { scope: container },
  );

  return (
    <div ref={container} className={twMerge(className)}>
      {children}
    </div>
  );
};

export const AnimateSlideInGroup = ({
  direction,
  opacity = 0,
  duration = 0.5,
  delay = 0,
  offset = 100,
  className,
  children,
  from = 'start',
}: AnimationProps & {
  from?: gsap.utils.DistributeConfig['from'];
}): React.JSX.Element => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ele = container.current;

      if (!ele) return;

      const vars: GSAPTweenVars = {
        opacity,
        ease: 'power4.inOut',
        duration,
        delay,
        stagger: {
          amount: 0.2,
          from,
        },
        scrollTrigger: {
          trigger: ele,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      };

      if (direction === 'left') vars.x = -offset;
      if (direction === 'right') vars.x = offset;
      if (direction === 'top') vars.y = -offset;
      if (direction === 'bottom') vars.y = offset;

      gsap.from(ele?.children, vars);
    },
    { scope: container },
  );

  return (
    <div ref={container} className={twMerge(className)}>
      {children}
    </div>
  );
};

export const AnimateTypeWriter = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}): React.JSX.Element => {
  const container = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const ele = container.current;

      if (!ele) return;
      gsap.to(ele, { text: { value: text }, ease: '' });
    },
    { scope: container },
  );

  return <p ref={container} className={twMerge(className)} />;
};
