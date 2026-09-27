'use client';

import {
  useFeatureRequest,
  useGetAllUserFeatureRequestApps,
} from '@/app/hooks/apps';
import { useGetFeatureRequestHistory } from '@/app/hooks/users';
import { useUserSession } from '@/components/UserSessionContext';
import {
  Bounded,
  FeatureRequestForm,
  SectionTitle,
  Separator,
  Spinner,
} from '@mns/ui';
import { formatDateUS, replaceUnderscore, toTitleCase } from '@mns/utils';

type App = {
  _id: string;
  name: string;
};

const UserRequestFeaturePage = () => {
  const { session } = useUserSession();

  const { id: userId } = session.user;

  const {
    data: apps,
    isPending: appPending,
    error: appError,
  } = useGetAllUserFeatureRequestApps();
  const { mutateAsync: action, isPending: actionPending } = useFeatureRequest();
  const {
    data: featureHistory,
    isPending: featurePending,
    error: featureError,
  } = useGetFeatureRequestHistory(userId);

  if (appPending) {
    return <Spinner />;
  }

  if (appError) {
    return <div>No Apps found</div>;
  }

  if (featurePending) {
    return <Spinner />;
  }

  if (featureError) {
    return <div>No features found</div>;
  }

  return (
    <Bounded size="full" padding="sm" isCenterd={false} spacing="sm">
      <FeatureRequestForm apps={apps as App[]} action={action} />

      <Separator className="bg-muted" />

      <Bounded size="full" isCenterd={false} spacing="sm">
        <SectionTitle as="h3">Feature Requests History</SectionTitle>

        {featureHistory.map((h) => (
          <div key={h.app.id} className="shadow p-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold">{h.app.name}</p>
              <p>
                <span>Requested on </span>
                <span className="font-semibold text-fs-300 text-secondary">
                  {formatDateUS(h.createdAt)}
                </span>
              </p>
            </div>

            <p>
              <span>Current Status: </span>
              <span className="font-semibold text-primary text-fs-300">
                {replaceUnderscore(toTitleCase(h.status))}
              </span>
            </p>

            <p>{h.body}</p>
          </div>
        ))}
      </Bounded>
    </Bounded>
  );
};

export default UserRequestFeaturePage;
