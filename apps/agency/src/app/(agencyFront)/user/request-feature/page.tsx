'use client';

import {
  useFeatureRequest,
  useGetAllUserFeatureRequestApps,
} from '@/app/hooks/apps';
import { Bounded, FeatureRequestForm, Spinner } from '@mns/ui';

type App = {
  _id: string;
  name: string;
};

const UserRequestFeaturePage = () => {
  const {
    data: apps,
    isPending: appPending,
    error: appError,
  } = useGetAllUserFeatureRequestApps();
  const { mutateAsync: action, isPending: actionPending } = useFeatureRequest();

  if (appPending) {
    return <Spinner />;
  }

  if (appError) {
    return <div>No Apps found</div>;
  }

  return (
    <Bounded size="full" padding="sm" isCenterd={false}>
      <FeatureRequestForm apps={apps as App[]} action={action} />
    </Bounded>
  );
};

export default UserRequestFeaturePage;
