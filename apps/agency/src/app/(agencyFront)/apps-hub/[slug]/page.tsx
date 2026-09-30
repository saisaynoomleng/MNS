import AppLaunchButton from '@/components/AppLaunchButton';
import { SanityPortableTextComponent } from '@/components/SanityPortableTextComponent';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_APPS_QUERY, APP_QUERY } from '@/sanity/lib/query';
import { Bounded, SectionTitle } from '@mns/ui';
import { PageParamsProps } from '@mns/utils';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Image from 'next/image';

const getData = async ({ params }: PageParamsProps) => {
  const { data } = await sanityFetch({
    query: APP_QUERY,
    stega: false,
    perspective: 'published',
    params: await params,
  });

  return data;
};

export async function generateMetadata({
  params,
}: PageParamsProps): Promise<Metadata> {
  const data = await getData({ params });

  return {
    title: data?.seo?.metaTitle ?? '',
    description: data?.seo?.metaDescription ?? '',
  };
}

export async function generateStaticParams() {
  const { data: apps } = await sanityFetch({
    query: ALL_APPS_QUERY,
    stega: false,
    perspective: 'published',
  });

  return apps.map((app) => ({ slug: app.slug }));
}

const AppDetailPage = async ({ params }: PageParamsProps) => {
  const data = await getData({ params });

  if (!data) return null;

  const isProduction = data.stage === 'production';
  const isMyanmarOnly = !!data.myanmarOnly;

  return (
    <Bounded as="main" padding="sm" spacing="lg">
      <div className="flex flex-col gap-y-2">
        <div className="overflow-hidden relative flex gap-x-2 items-center">
          <Image
            src={urlFor(data.imageUrl as string)
              .format('webp')
              .url()}
            alt={data.imageAlt as string}
            width={100}
            height={100}
            priority
            className="object-cover"
          />
          <SectionTitle as="h1">{data.name}</SectionTitle>
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="font-semibold">{data.subtitle}</p>
          <p>{data.excerpt}</p>

          {isMyanmarOnly ? (
            <p className="text-secondary">
              [ This app is available in Myanmar only ]
            </p>
          ) : (
            <p className="text-secondary">
              [ This app is available for both Myanmar and U.S. ]
            </p>
          )}
        </div>

        <AppLaunchButton
          appUrl={data.url as string}
          demoUrl={data.demoUrl ?? '/'}
          stage={data.stage}
        />
      </div>

      {isProduction ? (
        <div className="prose prose-sm md:prose-lg min-w-full">
          {data.body && (
            <PortableText
              value={data.body}
              components={SanityPortableTextComponent}
            />
          )}
        </div>
      ) : (
        <div>
          (
          <div className="space-y-2">
            <p>
              App is currently in development stage, and cannot be launched at
              the moment.
            </p>

            <p>You can subscribe to our newsletter for updates!</p>
          </div>
          ){/* <NewsletterForm /> */}
        </div>
      )}
    </Bounded>
  );
};

export default AppDetailPage;
