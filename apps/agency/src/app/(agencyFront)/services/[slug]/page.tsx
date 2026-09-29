import RenderAction from '@/components/RenderAction';
import { RenderMedia } from '@/components/RenderMedia';
import { SanityPortableTextComponent } from '@/components/SanityPortableTextComponent';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_SERVICES_QUERY, SERVICE_QUERY } from '@/sanity/lib/query';
import { Bounded, PricingCard, SectionTitle } from '@mns/ui';
import { PageParamsProps } from '@mns/utils';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';

const getData = async ({ params }: PageParamsProps) => {
  const { data } = await sanityFetch({
    query: SERVICE_QUERY,
    perspective: 'published',
    stega: false,
    params: await params,
  });

  return data;
};

export async function generateMetadata({
  params,
}: PageParamsProps): Promise<Metadata> {
  const data = await getData({ params });

  const ogImage = data?.seo?.ogImage
    ? urlFor(data.seo.ogImage).width(1200).height(630).url()
    : undefined;

  return {
    title: data?.seo?.title,
    description: data?.seo?.description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const { data: services } = await sanityFetch({
    query: ALL_SERVICES_QUERY,
    stega: false,
    perspective: 'published',
  });

  return services.map((s) => ({ slug: s.slug }));
}

const ServiceDetailPage = async ({ params }: PageParamsProps) => {
  const data = await getData({ params });

  if (!data) return null;

  const { name, subtitle, body, subscriptions, imageAlt, imageUrl } = data;

  return (
    <Bounded spacing="sm" padding="sm" as="main">
      <div className="grid md:grid-cols-[auto_1fr] gap-x-4 items-center">
        <RenderMedia src={imageUrl as string} alt={imageAlt as string} />

        <div className="flex flex-col gap-y-2">
          <SectionTitle as="h1">{name}</SectionTitle>
          <p>{subtitle}</p>
        </div>
      </div>

      {body && (
        <div className="prose prose-sm md:prose-lg min-w-full">
          <PortableText value={body} components={SanityPortableTextComponent} />
        </div>
      )}

      {subscriptions.length !== 0 ? (
        <div className="space-y-4 md:space-y-8">
          <SectionTitle as="h3">Subscriptions</SectionTitle>

          <div className="flex md:flex-row flex-col gap-x-4 md:gap-x-6 gap-y-8">
            {subscriptions.map((s) => (
              <PricingCard
                className="flex-1"
                key={s._id}
                name={s.name as string}
                pricerPerMonth={s.pricePerMonth as number}
                inclusives={s.inclusives ?? []}
                exclusives={s.exclusives ?? []}
                cta={{ label: 'Learn More', href: `/pricings/${s.slug}` }}
                renderCallToAction={(props) => (
                  <RenderAction
                    {...props}
                    type="button"
                    className="bg-primary text-background"
                  />
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </Bounded>
  );
};

export default ServiceDetailPage;
