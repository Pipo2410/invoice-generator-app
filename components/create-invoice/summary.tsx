import { Separator } from '../ui/separator';

export const Summary = () => {
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
					<p className="text-foreground">1.250,00€</p>
				</div>
				<div className="flex justify-between">
					<p>
						VAT <span className="font-bold">(23%)</span>
					</p>
					<p className="text-foreground">287,50€</p>
				</div>
				<div className="flex justify-between">
					<p>Discount</p>
					<p className="text-foreground">125,00€</p>
				</div>
				<Separator />
			</div>

			<div className="flex justify-between">
				<p>Total</p>
				<p className="text-foreground">1.537,50€</p>
			</div>
			<div className="flex justify-between">
				<p>VAT Exemption</p>
				<p className="text-foreground">
					Article 6 of Decree-Law 198/90 of June 19th - M02
				</p>
			</div>
		</div>
	);
};
