'use client';

import { handleDeleteRequestFeature } from '@/actions/users/handleDeleteRequestFeature';
import { handleRequestFeature } from '@/actions/users/handleRequestFeature';
import {
  getAllUserFeatureRequestApps,
  getUserFeatureRequestHistory,
} from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { toast } from '@mns/ui';
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useGetAllUserFeatureRequestApps = () => {
  return useQuery({
    queryKey: queryKeys.apps.all,
    queryFn: getAllUserFeatureRequestApps,
  });
};

export const useRequestFeature = () => {
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

export const useGetFeatureRequestHistory = () => {
  return useQuery({
    queryKey: queryKeys.users.featureRequests(),
    queryFn: () => getUserFeatureRequestHistory(),
  });
};

export const useDeleteRequestFeatureHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => handleDeleteRequestFeature(id),

    onSuccess: async (data) => {
      if (!data.success) {
        return toast.error(data.message);
      }

      await queryClient.invalidateQueries({
        queryKey: queryKeys.apps.all,
      });
    },

    onError: (ctx) => {
      toast.error(ctx.message);
    },
  });
};
