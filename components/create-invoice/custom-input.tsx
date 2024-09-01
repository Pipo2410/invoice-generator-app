import { useRef } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type Props = {
	placeholder: string;
	onInputHandler: (value: string) => void;
};

export const CustomInput: React.FC<Props> = ({
	placeholder,
	onInputHandler,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="relative">
			<Input
				ref={inputRef}
				type="text"
				placeholder="Purchase order"
				className="h-fit bg-[#F4F4F4] text-base leading-4 border-none py-4 px-3 pt-[30px] rounded-2xl focus-visible:ring-0 peer focus-visible:ring-offset-0 placeholder:text-base placeholder:text-transparent"
				onChange={(event) => onInputHandler(event.target.value)}
			/>
			<Label
				onClick={() => inputRef.current?.focus()}
				htmlFor="email"
				className="flex absolute text-base text-dark-gray font-normal translate-x-3 -translate-y-11 transition-all duration-300 hover:cursor-text peer-focus:-translate-y-14 peer-[:not(:placeholder-shown)]:-translate-y-14 peer-focus:text-xs peer-[:not(:placeholder-shown)]:text-xs"
			>
				{placeholder}
			</Label>
		</div>
	);
};
// peer-[:not(:placeholder-shown)]:scale-75
// peer-focus:scale-75
