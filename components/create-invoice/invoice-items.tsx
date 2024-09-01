import { UseFormReturn, useWatch } from 'react-hook-form';
import { AddItems } from './add-items';
import { AddedItem } from './added-item';
import { z } from 'zod';
import { formSchema, FormType } from './create-invoice-form';

type Props = {
	form: UseFormReturn<z.infer<typeof formSchema>>;
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
