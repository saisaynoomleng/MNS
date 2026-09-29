import ContactForm from '@/components/ContactForm';
import RenderAction from '@/components/RenderAction';
import { getMetadata } from '@/lib/getMetadata';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_PRICINGS_QUERY } from '@/sanity/lib/query';
import {
  AnimateSlideIn,
  AnimateSlideInGroup,
  AnimateTypeWriter,
  Bounded,
  PricingCard,
  SectionTitle,
} from '@mns/ui';
import { Metadata } from 'next';
import { FaChartBar, FaCrown, FaHeart, FaPencil } from 'react-icons/fa6';
import { IoMdColorPalette } from 'react-icons/io';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMetadata({ page: 'pricing-page' });

  return {
    title: data?.title ?? '',
    description: data?.description ?? '',
  };
}

const PricingsPage = async () => {
  const { data: plugs } = await sanityFetch({
    query: ALL_PRICINGS_QUERY,
    stega: false,
    perspective: 'published',
    params: { type: 'plug-and-play' },
  });

  const { data: enterprise } = await sanityFetch({
    query: ALL_PRICINGS_QUERY,
    stega: false,
    perspective: 'published',
    params: { type: 'enterprise' },
  });

  if (!plugs) return null;

  return (
    <Bounded as="main" padding="sm" spacing="md">
      <div className="flex items-end h-[90%] md:min-h-dvh justify-end md:flex-row md:justify-between md:items-center">
        <div className="flex-2 space-y-2">
          <SectionTitle as="h2">
            <span className="block">Pricing</span>

            <span className="block">
              {' '}
              built for{' '}
              <span className="font-cursive text-primary">growth</span>
            </span>
          </SectionTitle>

          <AnimateTypeWriter
            text="Ready-made apps for small businesses, and ongoing care for custom
            projects. Choose the plan that fits where you are today."
            className="text-muted-foreground"
          />
        </div>
      </div>

      <div className="space-y-4 md:space-y-8">
        <AnimateSlideIn direction="top">
          <SectionTitle as="h3" className="text-center">
            Plug & Play Solutions
          </SectionTitle>
        </AnimateSlideIn>

        <AnimateSlideInGroup
          direction="left"
          className="grid md:grid-cols-2 md:gap-x-6 gap-y-4"
        >
          {plugs.map((p) => (
            <PricingCard
              key={p._id}
              name={p.name as string}
              inclusives={p.inclusives ?? []}
              cta={{ label: 'Learn More', href: `/pricings/${p.slug}` }}
              renderCallToAction={(props) => (
                <RenderAction
                  type="button"
                  className="text-background bg-primary"
                  {...props}
                />
              )}
              pricerPerMonth={p.pricePerMonth ?? 0}
            />
          ))}
        </AnimateSlideInGroup>
      </div>

      <div className="space-y-4 md:space-y-8">
        <AnimateSlideIn direction="top">
          <SectionTitle as="h3" className="text-center">
            Enterprise Solutions
          </SectionTitle>
        </AnimateSlideIn>

        <AnimateSlideInGroup
          direction="left"
          className="grid md:grid-cols-3 md:gap-x-6 gap-y-4"
        >
          {enterprise.map((e) => (
            <PricingCard
              key={e._id}
              name={e.name as string}
              inclusives={e.inclusives ?? []}
              cta={{ label: 'Learn More', href: `/pricings/${e.slug}` }}
              renderCallToAction={(props) => (
                <RenderAction
                  type="button"
                  className="text-background bg-primary"
                  {...props}
                />
              )}
              pricerPerMonth={e.pricePerMonth ?? 0}
              exclusives={e.exclusives ?? []}
            />
          ))}
        </AnimateSlideInGroup>
      </div>

      <ContactForm />
    </Bounded>
  );
};

export default PricingsPage;
