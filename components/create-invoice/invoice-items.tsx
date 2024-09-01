import { UseFormReturn, useWatch } from 'react-hook-form';
import { AddItems } from './add-items';
import { AddedItem } from './added-item';
import { FormType } from './create-invoice-form';

type Props = {
	form: UseFormReturn<FormType>;
};

export const InvoiceItems: React.FC<Props> = ({ form }) => {
	const items: FormType['invoice']['items'] = useWatch({
		name: 'invoice.items',
	});
	return (
		<>
			<AddItems form={form} />
			{!!items.length &&
				items.map((item) => (
					<AddedItem key={item.name} item={item} form={form} />
				))}
		</>
	);
};
