import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const AgencyFrontLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default AgencyFrontLayout;
