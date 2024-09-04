import { Content } from '@/components/layout/content';
import { Header } from '@/components/layout/header';

const CreateInvoicePage = () => {
  return (
    <>
      <main className="relative flex h-fit w-full flex-col gap-10">
        <Header />
        <Content />
      </main>
    </>
  );
};

export default CreateInvoicePage;
