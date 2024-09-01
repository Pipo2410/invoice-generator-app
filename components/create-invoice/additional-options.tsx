import React from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { CustomInput } from './custom-input';
import { CustomCheckbox } from './custom-checkbox';
import { UseFormReturn } from 'react-hook-form';
import { FormType } from './create-invoice-form';

type Props = {
	form: UseFormReturn<FormType>;
};

export const AdditionalOptions: React.FC<Props> = ({ form }) => {
	console.log('Im re-rendered - AdditionalOptions');

	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1" className="w-full">
				<AccordionTrigger className="flex-none py-2 px-3 my-4 gap-1 text-dark-blue hover:text-dark-blue data-[state=open]:bg-dark-blue data-[state=open]:text-white rounded-full transition-colors hover:no-underline">
					Additional options
				</AccordionTrigger>
				<AccordionContent className="py-0 m-6 flex flex-col gap-6">
					<div className="flex flex-col gap-6">
						<CustomCheckbox
							text="Include retention %"
							id="retention"
							inputType="input"
						/>
						<CustomCheckbox
							text="Apply global discount"
							id="discount"
							inputType="select"
						/>
					</div>
					<CustomInput
						placeholder="Reference note"
						onInputHandler={(value) =>
							form.setValue('invoice.additionalOptions.purchaseOrder', value)
						}
					/>
					<CustomInput
						placeholder="Purchase order"
						onInputHandler={(value) =>
							form.setValue('invoice.additionalOptions.referenceNote', value)
						}
					/>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};
