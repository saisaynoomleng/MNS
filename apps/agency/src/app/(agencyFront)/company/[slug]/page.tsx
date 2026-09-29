import { SanityPortableTextComponent } from '@/components/SanityPortableTextComponent';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_COMPANY_PAGES, COMPANY_PAGE_QUERY } from '@/sanity/lib/query';
import { Bounded } from '@mns/ui';
import { PageParamsProps } from '@mns/utils';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';

const getData = async ({ params }: PageParamsProps) => {
  const { data } = await sanityFetch({
    query: COMPANY_PAGE_QUERY,
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
  const { data: pages } = await sanityFetch({
    query: ALL_COMPANY_PAGES,
    stega: false,
    perspective: 'published',
  });

  return pages.map((p) => ({ slug: p.slug }));
}

const CompanyDetailPage = async ({ params }: PageParamsProps) => {
  const data = await getData({ params });

  if (!data) return null;

  return (
    <Bounded as="main" padding="sm">
      <div className="prose prose-sm md:prose-lg min-w-full">
        {data.body && (
          <PortableText
            value={data.body}
            components={SanityPortableTextComponent}
          />
        )}
      </div>
    </Bounded>
  );
};

export default CompanyDetailPage;
