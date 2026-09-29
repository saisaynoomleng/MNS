import clsx from 'clsx';
import type React from 'react';
import { twMerge } from 'tailwind-merge';
import { formatPriceInUSD, type CallToActionProps } from '@mns/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#components/ui/card';
import { Separator } from '#components/ui/separator';

type PricingCardProps = {
  className?: string;
  name: string;
  pricerPerMonth: number;
  inclusives: string[];
  exclusives?: string[];
};

export const PricingCard = ({
  className,
  name,
  pricerPerMonth,
  inclusives,
  exclusives,
}: PricingCardProps): React.JSX.Element => {
  return (
    <Card
      className={twMerge(clsx('border hover:primary-box-shadow', className))}
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {formatPriceInUSD(pricerPerMonth)}/month
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2 md:h-80">
          <p className="font-semibold">What&apos;s included</p>
          <ul className="list-disc list-inside flex flex-col gap-y-2">
            {inclusives.map((inclusive) => (
              <li key={inclusive} className="marker:text-primary">
                {inclusive}
              </li>
            ))}
          </ul>
        </div>

        {exclusives?.length !== 0 ? (
          <div>
            <Separator orientation="horizontal" className="my-4" />

            <div className="space-y-2 mt-4">
              <p className="font-semibold">
                What&apos;s <span className="uppercase">not</span> included
              </p>

              <ul className="list-disc list-inside flex flex-col gap-y-2">
                {exclusives?.map((ex) => (
                  <li key={ex} className="marker:text-primary">
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
