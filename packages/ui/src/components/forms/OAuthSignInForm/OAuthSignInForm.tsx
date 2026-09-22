import { Button } from '#components/ui/button';
import type { OAuthProviders } from '@mns/utils';
import clsx from 'clsx';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaGoogle, FaLinkedin } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

type OAuthSignInFormProps = {
  action: (strategy: OAuthProviders) => Promise<void>;
  className?: string;
};

export const OAuthSignInForm = ({
  action,
  className,
}: OAuthSignInFormProps) => {
  return (
    <div
      className={twMerge(
        clsx('flex items-center justify-center gap-x-4', className),
      )}
    >
      <Button
        onClick={() => action('facebook')}
        className="bg-foreground text-background hover:bg-foreground/80"
        aria-label="log in with facebook"
        data-testid="facebook"
      >
        <FaFacebookSquare />
      </Button>

      <Button
        onClick={() => action('linkedIn')}
        className="bg-foreground text-background hover:bg-foreground/80"
        aria-label="log in with linked in"
        data-testid="linkedin"
      >
        <FaLinkedin />
      </Button>

      <Button
        onClick={() => action('google')}
        className="bg-foreground text-background hover:bg-foreground/80"
        aria-label="log in with google"
        data-testid="google"
      >
        <FaGoogle />
      </Button>
    </div>
  );
};
