import { MainContent } from '@/components/layout/main-content';
import { createInitialState } from '@/context/helpers';
import { VatExemption } from '@/context/model';

export default async function CreateInvoicePage() {
  const res = await fetch(`${process.env.API_PATH}/api/clients`, {
    next: {
      revalidate: 1,
    },
  });
  const articlesJson = await res.json();
  const {
    data: { vatArticles },
  } = articlesJson;


  const initialState = createInitialState(vatArticles);

  return <MainContent initialState={initialState} />;
}
