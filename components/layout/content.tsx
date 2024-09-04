'use client';
import { ActionBar } from '@/components/footer/action-bar';
import { VatArticleSelector } from '@/components/form/vat-article-selector';
import { Separator } from '@/components/ui/separator';

import { AdditionalOptions } from '@/components/form/additional-options';
import { InvoiceSummary } from '@/components/form/invoice-summary';
import { DueDate } from '@/components/form/date/due-date-calendar';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { formSchema } from '@/context/model';
import { formDefaultValues } from '@/context/helpers';
import { AddInvoiceItems } from '@/components/form/add-invoice-items';
import { CurrencySelector } from '@/components/form/currency-selector';
import { IssueDate } from '@/components/form/date/issue-date';
import { ClientSelector } from '@/components/form/client-selector';
import { PreviewArea } from '@/components/preview/preview-area';

export type FormType = z.infer<typeof formSchema>;

export const Content = () => {
	const [showPreview, setShowPreview] = useState(true);

	const form = useForm<FormType>({
		resolver: zodResolver(formSchema),
		defaultValues: formDefaultValues,
	});

	const onSubmitHandler = (values: FormType) => {};

	return (
		<div className="grid grid-cols-12">
			<FormProvider {...form}>
				<div
					className={cn(
						showPreview
							? 'col-span-full xl:col-span-7 xl:mr-[75px]'
							: 'col-span-full xl:col-span-10'
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
								<div className="flex flex-col md:flex-row gap-4">
									<IssueDate form={form} />
									<DueDate form={form} />
								</div>
								<VatArticleSelector form={form} />
							</div>
							<div>
								<Separator />
								<AddInvoiceItems form={form} />
								<AdditionalOptions form={form} />
							</div>
							<div className="summary">
								<InvoiceSummary />
							</div>
							<ActionBar setShowPreview={setShowPreview} />
						</form>
					</Form>
				</div>
				{showPreview && <PreviewArea setShowPreview={setShowPreview} />}
			</FormProvider>
		</div>
	);
};
