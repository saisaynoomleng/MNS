import Link from 'next/link';

type RenderActionProps = {
  label: string;
  href: string;
};

const RenderAction = ({ label, href }: RenderActionProps) => {
  return (
    <Link
      href={href}
      className="text-primary hover:underline underline-offset-2"
    >
      {label}
    </Link>
  );
};

export default RenderAction;
