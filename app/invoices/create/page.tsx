import { Header } from '@/components/layout/header';
import { Content } from '@/components/layout/content';

const CreateInvoicePage = () => {
	return (
		<>
			<main className="w-full h-fit flex flex-col gap-10 relative">
				<Header />
				<Content />
			</main>
		</>
	);
};

export default CreateInvoicePage;
