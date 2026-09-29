import { Bounded, Skeleton } from '@mns/ui';

const Loading = () => {
  return (
    <Bounded as="main">
      <div className="w-full h-dvh flex flex-col gap-y-8 justify-center items-center">
        <Skeleton className="w-150 h-20" />
        <Skeleton className="w-10 h-10" />
        <Skeleton className="w-150 h-20" />
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-100 h-10" />
          <Skeleton className="w-100 h-10" />
          <Skeleton className="w-100 h-10" />
        </div>
        <div className="flex gap-x-6">
          <Skeleton className="w-10 h-10" />
          <Skeleton className="w-10 h-10" />
          <Skeleton className="w-10 h-10" />
          <Skeleton className="w-10 h-10" />
          <Skeleton className="w-10 h-10" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="w-100 h-full" />
        <Skeleton className="w-100 h-full" />
      </div>
    </Bounded>
  );
};

export default Loading;
