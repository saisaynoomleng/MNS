import { urlFor } from '@/sanity/lib/image';
import { Bounded, Button } from '@mns/ui';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  const imageUrl =
    'https://cdn.sanity.io/images/a8ioaakl/production/f2b8d9c403933c9f73fc1efd253084495ececb83-626x655.png';

  return (
    <Bounded className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col md:flex-row gap-x-4 items-center">
        <div className="overflow-hidden relative">
          <Image
            src={urlFor(imageUrl).format('webp').url()}
            alt="not-found"
            width={300}
            height={300}
            className="md:scale-x-[-1]"
          />
        </div>

        <div className="w-100 h-fit border-4 primary-box-shadow text-center p-4 flex flex-col gap-y-4">
          <p className="text-fs-800">404</p>
          <p>Sorry, the resource you&apos;re looking for is not found.</p>

          <Button variant="primary" asChild className="mt-auto self-center">
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </Bounded>
  );
};

export default NotFoundPage;
