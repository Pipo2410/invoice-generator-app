import { UseFormReturn, useWatch } from 'react-hook-form';
import { AddItems } from './add-items';
import { AddedItem } from './added-item';
import { FormType } from './create-invoice-form';
import { Items } from '@/context/model';

type Props = {
	form: UseFormReturn<FormType>;
};

export const InvoiceItems: React.FC<Props> = ({ form }) => {
	const items: Items = useWatch({
		name: 'invoice.items',
	});
	return (
		<>
			<AddItems form={form} />
			{!!items &&
				items.map((item, index) => (
					<AddedItem
						key={`item-${item.name}-${Math.floor(Math.random() * 1000) + 1}`} // check again
						itemIndex={index}
						item={item}
						form={form}
					/>
				))}
		</>
	);
};
