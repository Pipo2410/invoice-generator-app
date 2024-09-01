import React, { Dispatch, SetStateAction } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IconComponent } from '../navigation/icon-component';
import { useWatch } from 'react-hook-form';
import { Client } from '@/context/model';

type Props = {
	setSelectedValue: Dispatch<SetStateAction<string>>;
};

export const ClientCard: React.FC<Props> = ({ setSelectedValue }) => {
	const client: Client = useWatch({ name: 'invoice.client' });

	const onClose = () => {
		setSelectedValue('');
	};
	return (
		<Card className="border-x-0 border-t-0">
			<CardHeader className="flex-row justify-between">
				<div className="flex items-center gap-2">
					<Avatar className="w-11 h-11">
						<AvatarImage src="https://someurl.com/user-213123.jpeg." />
						<AvatarFallback className="text-base bg-gradient-to-b from-[#52231A] to-[#A13C1C]">
							TW
						</AvatarFallback>
					</Avatar>
					<h3 className="font-semibold">{client.businessName}</h3>
				</div>
				<div className="flex items-center gap-4">
					<IconComponent icon="edit" className="fill-dark-blue" />
					<IconComponent
						icon="close"
						className="fill-dark-blue hover:cursor-pointer"
						onClick={onClose}
					/>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<p>NIF {client.nif}</p>
				<p>{client.country}</p>
				<p>Rua Dom Francisco No. 15 3010-010 - Lisbon</p>
				<p className="font-semibold">{client.email}</p>
			</CardContent>
		</Card>
	);
};
