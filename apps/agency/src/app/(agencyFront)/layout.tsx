import { Header } from '@/components/Header';

const AgencyFrontLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AgencyFrontLayout;
