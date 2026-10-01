import { twMerge } from 'tailwind-merge';
import { Bounded } from '../../shared';
import clsx from 'clsx';

type ServiceHeroProps = {
  className?: string;
};

export const ServiceHero = ({ className }: ServiceHeroProps) => {
  return <div className={twMerge(clsx('', className))}></div>;
};
