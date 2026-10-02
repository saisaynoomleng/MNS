'use client';

import { getAllContacts, getContactById } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetAllContacts = () => {
  return useQuery({
    queryKey: queryKeys.contacts.all,
    queryFn: getAllContacts,
  });
};

export const useGetContactsById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.contacts.byId(id),
    queryFn: () => getContactById(id),
    enabled: !!id,
  });
};
