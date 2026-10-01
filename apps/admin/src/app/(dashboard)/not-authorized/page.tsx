import { urlFor } from '@/sanity/lib/image';
import { Bounded } from '@mns/ui';
import Image from 'next/image';

const UnauthroizedPage = () => {
  const imageUrl =
    'https://cdn.sanity.io/images/a8ioaakl/production/ff9d46a2ba574d435571afd7c2887faff08e8ac0-700x993.png';

  return (
    <Bounded
      as="main"
      className="flex flex-col justify-center items-center text-center h-screen"
    >
      <div className="flex flex-col">
        <p className="font-semibold text-fs-700 md:text-fs-800 lg:text-fs-900">
          401
        </p>
        <p className="font-semibold text-destructive">Authorization Required</p>
      </div>

      <div>
        <Image
          src={urlFor(imageUrl).format('webp').url()}
          width={200}
          height={400}
          alt="kick"
          className=""
        />
      </div>
    </Bounded>
  );
};

export default UnauthroizedPage;
