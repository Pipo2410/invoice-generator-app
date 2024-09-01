import { useWatch } from 'react-hook-form';
import { Separator } from '../ui/separator';
import { currencies } from '@/assets/currencies';

export const Summary = () => {
	const vatExemption = useWatch({ name: 'invoice.vatExemption.label' });
	const currency = useWatch({ name: 'invoice.currency' });
	const currencySign = currencies.find((el) => el.label === currency)?.sign;

	return (
		<div className="text-dark-gray flex flex-col gap-8">
			<h3 className="text-base text-dark-gray font-semibold">Summary</h3>
			<div className="flex flex-col gap-4">
				<div className="flex justify-between">
					<p>Retention</p>
					<p className="text-foreground">-</p>
				</div>
				<div className="flex justify-between">
					<p>Subtotal</p>
					<p className="text-foreground">1.250,00{currencySign}</p>
				</div>
				<div className="flex justify-between">
					<p>
						VAT <span className="font-bold">(23%)</span>
					</p>
					<p className="text-foreground">287,50{currencySign}</p>
				</div>
				<div className="flex justify-between">
					<p>Discount</p>
					<p className="text-foreground">125,00{currencySign}</p>
				</div>
				<Separator />
			</div>

			<div className="flex justify-between">
				<p>Total</p>
				<p className="text-foreground">1.537,50{currencySign}</p>
			</div>
			<div className="flex justify-between">
				<p>VAT Exemption</p>
				<p className="text-foreground">{vatExemption}</p>
			</div>
		</div>
	);
};
