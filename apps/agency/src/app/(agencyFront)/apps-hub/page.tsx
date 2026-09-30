import { AppCard } from '@/components/AppCard';
import RenderAction from '@/components/RenderAction';
import { RenderMedia } from '@/components/RenderMedia';
import { getMetadata } from '@/lib/getMetadata';
import { sanityFetch } from '@/sanity/lib/live';
import { APPS_BY_STAGE_QUERY } from '@/sanity/lib/query';
import { Bounded, Button, SectionTitle } from '@mns/ui';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMetadata({ page: 'apps-hub-page' });

  return {
    title: data?.title ?? '',
    description: data?.description ?? '',
  };
}

const AppsHubPage = async (): Promise<React.JSX.Element | null> => {
  const { data: prodApps } = await sanityFetch({
    query: APPS_BY_STAGE_QUERY,
    perspective: 'published',
    stega: false,
    params: {
      stage: 'production',
    },
  });

  const { data: devApps } = await sanityFetch({
    query: APPS_BY_STAGE_QUERY,
    perspective: 'published',
    stega: false,
    params: {
      stage: 'development',
    },
  });

  if (!prodApps) return null;
  if (!devApps) return null;

  return (
    <Bounded as="main" padding="sm" spacing="md">
      <div className="flex flex-col gap-y-4 justify-center min-h-dvh">
        <SectionTitle as="h1" size="lg">
          Apps
          <span className="font-cursive text-primary"> built </span>
          for how small businesses actually
          <span className="font-cursive text-primary"> work.</span>
        </SectionTitle>
        <p>
          Ready-to-use apps for your business, on a simple monthly plan. Pick
          your app, sign in once, and start running your business, with no
          custom build and no long setup.
        </p>

        <div className="flex gap-x-4 items-start">
          <Button asChild variant="link">
            <Link
              href="/apps-hub#production-apps"
              className="bg-primary text-background"
            >
              See Apps
            </Link>
          </Button>

          <Button asChild variant="link">
            <Link href="/pricings" className="bg-secondary text-foreground">
              See Pricing
            </Link>
          </Button>
        </div>
      </div>

      <div id="production-apps" className="space-y-4 md:space-y-8">
        <SectionTitle as="h2" className="font-mono">
          Our pilots
        </SectionTitle>

        <div className="flex gap-x-4 overflow-x-auto p-4">
          {prodApps.map((app) => (
            <AppCard
              key={app._id}
              className="flex-1"
              name={app.name as string}
              type={app.type as string}
              myanmarOnly={!!app.myanmarOnly}
              href={`/apps-hub/${app.slug}`}
              media={{
                src: app.imageUrl as string,
                alt: app.imageAlt as string,
              }}
              renderMedia={(props) => <RenderMedia {...props} />}
            />
          ))}
        </div>
      </div>

      <div id="production-apps" className="space-y-4 md:space-y-8">
        <SectionTitle as="h2" className="font-mono">
          More on the way
        </SectionTitle>

        <div className="flex gap-x-4 overflow-x-auto p-4">
          {devApps.map((app) => (
            <AppCard
              key={app._id}
              className="flex-1"
              name={app.name as string}
              type={app.type as string}
              myanmarOnly={!!app.myanmarOnly}
              href={`/apps-hub/${app.slug}`}
              media={{
                src: app.imageUrl as string,
                alt: app.imageAlt as string,
              }}
              renderMedia={(props) => <RenderMedia {...props} />}
            />
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AppsHubPage;
