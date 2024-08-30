export type Address = {
	street?: string;
	city?: string;
	postalCode?: string;
	additional?: string;
};

export type Client = {
	businessName?: string;
	email?: string;
	nif?: number;
	country?: string;
	currency?: string;
	address?: Address;
};

export type InvoiceDate = {
	issueDate: Date;
	dueDate?: Date;
};

export type VATExemption = {
	value?: string;
	label?: string;
};

type Item = {
	name?: string;
	description?: string;
	category?: string;
	unit?: number;
	price?: number;
	vat?: number;
	discount?: number;
};

type CheckboxItem = {
	checked?: boolean;
	value?: number;
};

export type Invoice = {
	client?: Client;
	date: InvoiceDate;
	vatExemption?: VATExemption;
	items?: Item[];
	retention?: CheckboxItem;
	globalDiscount?: CheckboxItem;
	purchaseOrder?: string;
	referenceNote?: string;
};

export type InitialCreateInvoiceState = {
	showPreview: boolean;
	invoice: Invoice;
};
