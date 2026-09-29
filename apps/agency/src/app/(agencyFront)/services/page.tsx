import { CapabilityProgress } from '@/components/CapabilityProgress';
import ContactForm from '@/components/ContactForm';
import RenderAction from '@/components/RenderAction';
import { RenderMedia } from '@/components/RenderMedia';
import { getMetadata } from '@/lib/getMetadata';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_SERVICES_QUERY } from '@/sanity/lib/query';
import {
  AnimateSlideIn,
  AnimateSlideInGroup,
  AnimateTypeWriter,
  Bounded,
  SectionTitle,
  ServiceCard,
} from '@mns/ui';
import { Metadata } from 'next';
import React from 'react';
import { FaChartBar, FaCrown, FaHeart, FaPencil } from 'react-icons/fa6';
import { IoMdColorPalette } from 'react-icons/io';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMetadata({ page: 'services-page' });

  return {
    title: data?.title,
    description: data?.description,
  };
}

const ServicesPage = async (): Promise<React.JSX.Element | null> => {
  const { data: services } = await sanityFetch({
    query: ALL_SERVICES_QUERY,
    perspective: 'published',
    stega: false,
  });

  if (!services) return null;

  return (
    <Bounded as="main" spacing="lg" padding="sm">
      <div className="flex flex-col gap-y-8 min-h-dvh justify-center items-center text-center">
        <h2 className="text-fs-700 md:text-fs-800 lg:text-fs-900 font-cursive uppercase text-primary-700 font-bold">
          Ready-made
        </h2>

        <h2 className="text-fs-600 md:text-fs-700 lg:text-fs-800 text-secondary">
          or
        </h2>

        <h2 className="text-fs-700 md:text-fs-800 lg:text-fs-900 font-cursive uppercase text-primary-700 font-bold">
          made-for-you
        </h2>

        <AnimateTypeWriter
          className="lg:max-w-[60%]"
          text=" Plug & Play apps get your business running on a simple monthly
          subscription. Enterprise projects are designed and built around your
          exact needs."
        />

        <AnimateSlideInGroup
          direction="bottom"
          from="random"
          className="flex gap-x-6 items-center"
        >
          <FaHeart size={40} aria-hidden />
          <FaPencil size={40} aria-hidden />
          <IoMdColorPalette size={40} aria-hidden />
          <FaChartBar size={40} aria-hidden />
          <FaCrown size={40} aria-hidden />
        </AnimateSlideInGroup>
      </div>

      <div className="space-y-4 md:space-y-8">
        <AnimateSlideIn direction="top">
          <SectionTitle as="h3" className=" text-center" size="md">
            What we offer
          </SectionTitle>
        </AnimateSlideIn>

        <AnimateSlideInGroup
          direction="left"
          className="grid md:grid-cols-3 md:gap-x-6 gap-y-4 md:gap-y-8"
        >
          {services.map((s) => (
            <ServiceCard
              key={s._id}
              title={s.name as string}
              subtitle={s.subtitle as string}
              media={{ src: s.imageUrl as string, alt: s.imageAlt as string }}
              excerpt={s.excerpt as string}
              renderMedia={(props) => (
                <RenderMedia {...props} className="h-50" />
              )}
              cta={{ label: 'Learn More', href: `/services/${s.slug}` }}
              renderCallToAction={(props) => (
                <RenderAction
                  type="button"
                  {...props}
                  className="bg-primary text-background mt-auto"
                />
              )}
            />
          ))}
        </AnimateSlideInGroup>
      </div>

      <CapabilityProgress />

      <div className="flex flex-col gap-y-4 md:gap-y-8">
        <AnimateSlideIn direction="bottom">
          <ContactForm />
        </AnimateSlideIn>
      </div>
    </Bounded>
  );
};

export default ServicesPage;
