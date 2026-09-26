import { SignOutButton } from '@/components/SignOutButton';
import { Bounded } from '@mns/ui';

const UserPage = () => {
  return (
    <Bounded isCenterd size="md">
      <SignOutButton />
    </Bounded>
  );
};

export default UserPage;
