'use client';

import { handleUpdateUserAddress } from '@/actions/users/handleUpdateUserAddress';
import { handleUpdateUserInfo } from '@/actions/users/handleUpdateUserInfo';
import { getMe } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { toast } from '@mns/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetMe = () => {
  return useQuery({
    queryKey: queryKeys.users.me(),
    queryFn: getMe,
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

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
    },

    onError: (result) => {
      toast.error(result.message);
    },
  });
};

export const useUpdateUserAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleUpdateUserAddress,

    onSuccess: async (data) => {
      if (!data.success) {
        return toast.error(data.message);
      }

      toast.success(data.message);

      await queryClient.invalidateQueries({
        queryKey: queryKeys.users.all,
      });
    },

    onError: (data) => {
      return toast.error(data.message);
    },
  });
};
