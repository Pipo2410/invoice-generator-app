'use client';
import { ActionBar } from '@/components/footer/action-bar';
import { IssueDate } from '@/components/create-invoice/issue-date';
import { CurrencySelector } from '@/components/navigation/currency-selector';
import { VatArticleSelector } from '@/components/navigation/vat-article-selector';
import { Separator } from '@/components/ui/separator';

import { AdditionalOptions } from '@/components/create-invoice/additional-options';
import { Summary } from '@/components/create-invoice/summary';
import { DueDate } from '@/components/create-invoice/due-date-calendar';
import { ClientSelector } from '@/components/create-invoice/client-selector';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PreviewInvoice } from '../preview-invoice/preview-invoice';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { formSchema } from '@/context/model';
import { formDefaultValues } from '@/context/helpers';
import { InvoiceItems } from '../create-invoice/invoice-items';

export type FormType = z.infer<typeof formSchema>;

export const Content = () => {
	const [showPreview, setShowPreview] = useState(true);

	const form = useForm<FormType>({
		resolver: zodResolver(formSchema),
		defaultValues: formDefaultValues,
	});

	const onSubmitHandler = (values: FormType) => {};

	return (
		<div className="grid grid-cols-12 gap-[75px]">
			<FormProvider {...form}>
				<div
					className={cn(
						showPreview ? 'col-span-full xl:col-span-7' : 'col-span-10'
					)}
				>
					<Form {...form}>
						<form
							className="flex flex-col gap-6 mb-40"
							onSubmit={form.handleSubmit(onSubmitHandler)}
						>
							<CurrencySelector form={form} />
							<ClientSelector form={form} />
							<div className="flex flex-col gap-4">
								<div className="flex gap-4">
									<IssueDate form={form} />
									<DueDate form={form} />
								</div>
								<VatArticleSelector form={form} />
							</div>
							<div>
								<Separator />
								<InvoiceItems form={form} />
								<AdditionalOptions form={form} />
							</div>
							<div className="summary">
								<Summary />
							</div>
							<ActionBar setShowPreview={setShowPreview} />
						</form>
					</Form>
				</div>
				{showPreview && <PreviewInvoice setShowPreview={setShowPreview} />}
			</FormProvider>
		</div>
	);
};
