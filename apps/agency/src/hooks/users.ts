'use client';

import { handleUpdateUserInfo } from '@/actions/users/handleUpdateUserInfo';
import { getMe, getUserFeatureRequestHistory } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { toast } from '@mns/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useGetMe = () => {
  return useQuery({
    queryKey: queryKeys.users.me(),
    queryFn: getMe,
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: handleUpdateUserInfo,

    onSuccess: async (result) => {
      if (!result.success) {
        return toast.error(result.message);
      }
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
