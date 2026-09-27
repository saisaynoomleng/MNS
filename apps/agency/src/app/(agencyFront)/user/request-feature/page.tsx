'use client';

import {
  useDeleteRequestFeatureHistory,
  useGetAllUserFeatureRequestApps,
  useGetFeatureRequestHistory,
  useRequestFeature,
} from '@/hooks/apps';
import {
  Bounded,
  Button,
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
  const {
    data: apps,
    isPending: appPending,
    error: appError,
  } = useGetAllUserFeatureRequestApps();
  const { mutateAsync: action, isPending: actionPending } = useRequestFeature();
  const {
    data: featureHistory,
    isPending: featurePending,
    error: featureError,
  } = useGetFeatureRequestHistory();
  const { mutateAsync: deleteFeatureRequest, isPending: deletePending } =
    useDeleteRequestFeatureHistory();

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

  // if (deletePending) {
  //   return <Spinner />;
  // }

  const handleDelete = (id: string) => {
    deleteFeatureRequest(id);
  };

  return (
    <Bounded as="main" padding="sm" size="full" isCenterd={false} spacing="sm">
      <FeatureRequestForm apps={apps as App[]} action={action} />

      <Separator className="bg-muted" />

      <Bounded size="full" isCenterd={false} spacing="sm">
        <SectionTitle as="h3">Feature Requests History</SectionTitle>

        {featureHistory.map((h, i) => (
          <div key={i} className="shadow p-4 flex flex-col gap-y-2">
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

            <Button
              onClick={() => handleDelete(h.app.id)}
              className="self-end"
              variant="destructive"
            >
              Delete this request
            </Button>
          </div>
        ))}
      </Bounded>
    </Bounded>
  );
};

export default UserRequestFeaturePage;
