'use client';

import { handleUpdateUserInfo } from '@/actions/users/handleUpdateUserInfo';
import { getUserById } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { toast } from '@mns/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.users.byId(id),
    queryFn: () => getUserById(id!),
    enabled: !!id,
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: handleUpdateUserInfo,

    onSuccess: async (result) => {
      toast.success(result.message);

      await queryClient.invalidateQueries({
        queryKey: queryKeys.users.all,
      });

      router.refresh();
    },

    onError: (result) => {
      toast.error(result.message);
    },
  });
};
