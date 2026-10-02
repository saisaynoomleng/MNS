'use client';

import { handleContactReplyForm } from '@/app/actions/contacts/handleContactReplyForm';
import { getAllContacts, getContactById } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { toast } from '@mns/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useReplyContactForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleContactReplyForm,

    onSuccess: async (data) => {
      if (!data.success) {
        return toast.error(data.message);
      }

      toast.success(data.message);

      await queryClient.invalidateQueries({
        queryKey: queryKeys.contacts.all,
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
};
