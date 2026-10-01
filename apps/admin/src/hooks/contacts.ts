'use client';

import { getAllContacts } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetAllContacts = () => {
  return useQuery({
    queryKey: queryKeys.contacts.all,
    queryFn: getAllContacts,
  });
};
