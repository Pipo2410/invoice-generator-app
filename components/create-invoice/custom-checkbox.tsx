'use client';
import React, { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type Props = {
	text: string;
	id: string;
	inputType: 'input' | 'select';
};

export const CustomCheckbox: React.FC<Props> = ({ text, id, inputType }) => {
	const [isChecked, setIsChecked] = useState(false);

	const onCheck = () => {
		setIsChecked((prev) => !prev);
	};

	const valueElement =
		inputType === 'input' ? (
			<Input className="w-fit text-[#101010] bg-[#F4F4F4] py-1 px-2 rounded-lg border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-transparent" />
		) : (
			<Select>
				<SelectTrigger className="w-48 text-[#101010] bg-[#F4F4F4] py-1 px-2 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:right-0 focus:ring-transparent focus:ring-offset-0">
					<SelectValue placeholder="15%" />
				</SelectTrigger>
				<SelectContent>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((option) => (
						<SelectItem key={option} value={`${option}`}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		);
	return (
		<>
			<div className="flex items-center space-x-2">
				<Checkbox
					id={id}
					className="data-[state=checked]:bg-dark-blue data-[state=checked]:border-dark-blue"
					checked={isChecked}
					onCheckedChange={onCheck}
				/>
				<label
					htmlFor={id}
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{text}
				</label>
			</div>
			{isChecked && valueElement}
		</>
	);
};
