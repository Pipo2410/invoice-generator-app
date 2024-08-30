import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from 'react';
import { InitialCreateInvoiceState, Invoice } from './model';
import { init } from 'next/dist/compiled/webpack/webpack';

type CreateInvoiceFormContextValues = {
	showPreview: boolean;
	setShowPreview: Dispatch<SetStateAction<boolean>>;
	invoice: Invoice;
};

type CreateInvoiceFormContextProviderProps = {
	children?: React.ReactNode;
	initialState: InitialCreateInvoiceState;
};

export const CreateInvoiceFormContext =
	createContext<CreateInvoiceFormContextValues | null>(null);
CreateInvoiceFormContext.displayName = 'CreateInvoiceFormContext';

export const CreateInvoiceFormContextProvider: React.FC<
	CreateInvoiceFormContextProviderProps
> = ({ children, initialState }) => {
	// const [state, setState] = useState(initialState);
	const [showPreview, setShowPreview] = useState(initialState.showPreview);
	const [invoice, setInvoice] = useState(initialState.invoice);
	const [date, setDate] = useState(initialState.invoice.date);

	// const [invoice, setInvoice] = useState(initialState.invoice);

	// const value: CreateInvoiceFormContextValues = useMemo(() => {
	// 	return { showPreview, setShowPreview };
	// }, [showPreview, setShowPreview]);

	return (
		// <CreateInvoiceFormContext.Provider value={value}>
		<CreateInvoiceFormContext.Provider
			value={{ showPreview, setShowPreview, invoice }}
		>
			{children}
		</CreateInvoiceFormContext.Provider>
	);
};

export const useCreateInvoiceFormContext =
	(): CreateInvoiceFormContextValues => {
		const context = useContext(CreateInvoiceFormContext);
		if (!context) {
			throw new Error(
				'useCreateInvoiceFormContext must be used withing a CreateInvoiceFormContextProvider'
			);
		}
		return context;
	};
