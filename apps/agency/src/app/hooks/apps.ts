'use client';

import { handleRequestFeature } from '@/actions/users/handleRequestFeature';
import { getAllUserFeatureRequestApps } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { toast } from '@mns/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useGetAllUserFeatureRequestApps = () => {
  return useQuery({
    queryKey: queryKeys.apps.all,
    queryFn: getAllUserFeatureRequestApps,
  });
};

export const useFeatureRequest = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: handleRequestFeature,

    onSuccess: async (data) => {
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      await queryClient.invalidateQueries({
        queryKey: queryKeys.apps.all,
      });

      router.refresh();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
