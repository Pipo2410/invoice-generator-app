import { Header } from '@/components/layout/header';
import { Content } from '@/components/layout/content';
import { createInitialState } from '@/context/helpers';

const CreateInvoicePage = () => {
	const initialState = createInitialState();
	return (
		<>
			<main className="w-full h-fit flex flex-col gap-10 ml-24 relative">
				<Header />
				<Content initialState={initialState} />
			</main>
		</>
	);
};

export default CreateInvoicePage;
