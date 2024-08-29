'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { Separator } from '../ui/separator';
import { Item } from './create-invoice-form';
import { Input } from '../ui/input';
import { Trash2 } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type Props = {
	item: Item;
	setItems: Dispatch<SetStateAction<Item[]>>;
};

export const AddedItem: React.FC<Props> = ({ item, setItems }) => {
	return (
		<>
			<div className="flex flex-col gap-3 my-6">
				<div className="flex gap-2 items-center">
					<Input
						value={item.name}
						className="text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-transparent"
					/>
					<Input
						value={item.description}
						className="text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-transparent"
					/>
					<Trash2
						size={48}
						className="hover:cursor-pointer"
						onClick={() => {
							setItems((prev) => prev.filter((el) => el.id !== item.id));
						}}
					/>
				</div>
				<div className="flex gap-2">
					<Select>
						<SelectTrigger className="w-1/5 text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:right-0 focus:ring-transparent focus:ring-offset-0">
							<SelectValue placeholder="Type" />
						</SelectTrigger>
						<SelectContent>
							{['Service', 'SomethingElse'].map((option) => (
								<SelectItem key={option} value={option}>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select>
						<SelectTrigger className="w-1/5 text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:right-0 focus:ring-transparent focus:ring-offset-0">
							<SelectValue placeholder="Type" />
						</SelectTrigger>
						<SelectContent>
							{['Service', 'SomethingElse'].map((option) => (
								<SelectItem key={option} value={option}>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Input
						value={`${item.price} ${item.currency}`}
						className="w-1/5 text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-transparent"
					/>
					<Select>
						<SelectTrigger className="w-1/5 text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:right-0 focus:ring-transparent focus:ring-offset-0">
							<SelectValue placeholder="Type" />
						</SelectTrigger>
						<SelectContent>
							{['Service', 'SomethingElse'].map((option) => (
								<SelectItem key={option} value={option}>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Input
						value={`${item.discount} %`}
						className="w-1/5 text-[#101010] bg-white py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-transparent"
					/>
				</div>
			</div>
			<Separator />
		</>
	);
};
