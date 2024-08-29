import React, { FC, SVGAttributes } from 'react';

type Props = {
	className: string;
	icon: string;
	onClick?: () => void;
};

import {
	HomeRoofSVG,
	CoinsSVG,
	TransferSVG,
	ArrowRightSVG,
	AccountantSVG,
	UnitedKingdomSVG,
	FileSVG,
	DocumentSVG,
	ChatSVG,
	CreditCardSVG,
	EditFileSVG,
	SettingsSVG,
	BellSVG,
	PlusSVG,
	UnitedStatesSVG,
	ChileSVG,
	KuwaitSVG,
	EuropeanSVG,
	EditPenSVG,
	CloseSVG,
} from './svg';

const LOGOS: Record<string, FC<SVGAttributes<SVGSVGElement>>> = {
	home: HomeRoofSVG,
	transactions: CoinsSVG,
	transfer: TransferSVG,
	payments: ArrowRightSVG,
	accountant: AccountantSVG,
	documents: FileSVG,
	invoices: DocumentSVG,
	contact: ChatSVG,
	card: CreditCardSVG,
	bookkeeping: EditFileSVG,
	settings: SettingsSVG,
	notification: BellSVG,
	add: PlusSVG,
	uk: UnitedKingdomSVG,
	usa: UnitedStatesSVG,
	cl: ChileSVG,
	kw: KuwaitSVG,
	eu: EuropeanSVG,
	edit: EditPenSVG,
	close: CloseSVG,
};

export const IconComponent: React.FC<Props> = ({ icon, ...props }) => {
	const LogoComponent = LOGOS[icon];
	return <LogoComponent {...props} />;
};
