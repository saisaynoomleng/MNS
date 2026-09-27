'use client';

import {
  useFeatureRequest,
  useGetAllUserFeatureRequestApps,
} from '@/app/hooks/apps';
import { useUserSession } from '@/components/UserSessionContext';
import { Bounded, FeatureRequestForm, Spinner } from '@mns/ui';

type App = {
  _id: string;
  name: string;
};

const UserRequestFeaturePage = () => {
  const { session } = useUserSession();
  const {
    data: apps,
    isPending: appPending,
    error: appError,
  } = useGetAllUserFeatureRequestApps();
  const { mutateAsync: action, isPending: actionPending } = useFeatureRequest();

  const { user } = session;

  if (appPending) {
    return <Spinner />;
  }

  if (appError) {
    return <div>No Apps found</div>;
  }

  return (
    <Bounded size="full" padding="sm" isCenterd={false}>
      <FeatureRequestForm
        userName={user.name}
        apps={apps as App[]}
        action={action}
        userId={user.id}
      />
    </Bounded>
  );
};

export default UserRequestFeaturePage;
