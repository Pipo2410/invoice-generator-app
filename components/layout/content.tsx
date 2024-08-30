'use client';
import { CreateInvoiceForm } from '@/components/create-invoice/create-invoice-form';
import { CreateInvoiceFormContextProvider } from '@/context/create-invoice-context';
import { InitialCreateInvoiceState } from '@/context/model';

type Props = {
	initialState: InitialCreateInvoiceState;
};

export const Content: React.FC<Props> = ({ initialState }) => {
	return (
		<CreateInvoiceFormContextProvider initialState={initialState}>
			<CreateInvoiceForm />
		</CreateInvoiceFormContextProvider>
	);
};
