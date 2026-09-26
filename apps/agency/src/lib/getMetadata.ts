import { sanityFetch } from '@/sanity/lib/live';
import { PAGE_METADATA_QUERY } from '@/sanity/lib/query';

export const getMetadata = async ({ page }: { page: string }) => {
  const { data } = await sanityFetch({
    query: PAGE_METADATA_QUERY,
    perspective: 'published',
    stega: false,
    params: {
      page,
    },
  });

  return data;
};
