import { cn } from '@/lib/utils';
import { Command as CommandPrimitive } from 'cmdk';
import { Check, PlusIcon, ZoomIn } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverAnchor,
	PopoverContent,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { CustomInput } from './custom-input';
import { Label } from '../ui/label';

type Props<T extends string> = {
	selectedValue: T;
	onSelectedValueChange: (value: T) => void;
	searchValue: string;
	onSearchValueChange: (value: string) => void;
	items: { value: T; label: string }[];
	isLoading?: boolean;
	emptyMessage?: string;
	placeholder?: string;
	inputClassNames?: T;
	searchWrapperClasses?: T;
	iconClassName?: T;
	error: boolean;
};

export const AutoComplete = <T extends string>({
	selectedValue,
	onSelectedValueChange,
	searchValue,
	onSearchValueChange,
	items,
	isLoading,
	emptyMessage = 'No items.',
	placeholder = 'Search...',
	inputClassNames,
	searchWrapperClasses,
	iconClassName,
	error,
}: Props<T>) => {
	const [open, setOpen] = useState(false);
	// const [wrapperStyling, setWrappwrapperStyling] = useState(['']);
	const inputWrapper = useRef<React.ElementRef<typeof CommandPrimitive>>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const labels = useMemo(
		() =>
			items.reduce((acc, item) => {
				acc[item.value] = item.label;
				return acc;
			}, {} as Record<string, string>),
		[items]
	);

	const reset = () => {
		onSelectedValueChange('' as T);
		onSearchValueChange('');
	};

	const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		inputWrapper.current?.classList.remove(
			'!bg-light-blue',
			'!border-[#CCD7FF]'
		);
		// questionable implementation
		// setWrappwrapperStyling((prev) => {
		// 	const newArr = [...prev];
		// 	return newArr.filter((arr) => arr !== 'bg-light-blue');
		// });
		if (
			!e.relatedTarget?.hasAttribute('cmdk-list') &&
			labels[selectedValue] !== searchValue
		) {
			reset();
		}
	};

	const onSelectItem = (inputValue: string) => {
		if (inputValue === selectedValue) {
			reset();
		} else {
			onSelectedValueChange(inputValue as T);
			onSearchValueChange(labels[inputValue] ?? '');
		}
		setOpen(false);
	};

	const onCreateNewItem = () => {
		setOpen(false);
	};

	return (
		<div className="flex items-center">
			<Popover open={open} onOpenChange={setOpen}>
				<Command
					shouldFilter={false}
					ref={inputWrapper}
					className={cn(
						'rounded-2xl border border-secondary',
						searchWrapperClasses,
						error && 'border-dark-orange'
						// ...wrapperStyling
					)}
				>
					<PopoverAnchor asChild>
						<div
							className={cn('flex items-center px-3 relative')}
							cmdk-input-wrapper=""
						>
							<ZoomIn
								className={cn(
									'mr-2 h-4 w-4 shrink-0 opacity-50',
									iconClassName
								)}
							/>
							<CommandPrimitive.Input
								asChild
								value={searchValue}
								onValueChange={onSearchValueChange}
								onKeyDown={(e) => setOpen(e.key !== 'Escape')}
								onMouseDown={() => setOpen((open) => !!searchValue || !open)}
								onFocus={() => {
									console.log(inputWrapper.current?.classList);
									inputWrapper.current?.classList.add(
										'!bg-light-blue',
										'!border-[#CCD7FF]'
									);
									// questionable implementation
									// setWrappwrapperStyling((prev) => {
									// 	const newArr = [...prev];
									// 	newArr.push('bg-light-blue');
									// 	return newArr;
									// });
									setOpen(true);
								}}
								onBlur={onInputBlur}
								className="focus-visible:ring-0 focus-visible:ring-offset-0"
							>
								{/* <Input
									placeholder={placeholder}
									className={cn('h-fit bg-inherit text-base leading-4 border-none py-4 px-3 pt-[30px] rounded-2xl focus-visible:ring-0 peer focus-visible:ring-offset-0 placeholder:text-base placeholder:text-transparent', inputClassNames)}
								/> */}
								<Input
									ref={inputRef}
									type="text"
									// placeholder="Purchase order"
									placeholder={placeholder}
									className={cn('bg-inherit', inputClassNames)}
									// onChange={
									// 	onInputHandler
									// 		? (event) => onInputHandler(event.target.value)
									// 		: undefined
									// }
								/>
							</CommandPrimitive.Input>
							<Label
								onClick={() => inputRef.current?.focus()}
								htmlFor="email"
								className="flex absolute text-base text-dark-gray font-normal translate-x-9 transition-all duration-300 hover:cursor-text peer-focus:-translate-y-4 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-focus:text-xs peer-[:not(:placeholder-shown)]:text-xs"
							>
								{placeholder}
							</Label>
						</div>
					</PopoverAnchor>
					{!open && <CommandList aria-hidden="true" className="hidden" />}
					<PopoverContent
						asChild
						onOpenAutoFocus={(e) => e.preventDefault()}
						onInteractOutside={(e) => {
							if (
								e.target instanceof Element &&
								e.target.hasAttribute('cmdk-input')
							) {
								e.preventDefault();
							}
						}}
						className="w-[--radix-popover-trigger-width] p-0"
					>
						<CommandList className="rounded-2xl">
							{/* {isLoading && (
								<CommandPrimitive.Loading>
									<div className="p-1">skeleton</div>
								</CommandPrimitive.Loading>
							)} */}
							{searchValue && (
								<div className="flex items-center pl-4 py-6 mb-2 gap-2">
									<p className="rounded-none text-dark-gray font-semibold text-sm">
										{searchValue}
									</p>
									<Button
										type="button"
										size="sm"
										variant="ghost"
										className="p-0 text-dark-blue hover:text-dark-blue hover:bg-transparent"
										onClick={onCreateNewItem}
									>
										<PlusIcon className="w-4" />
										<span>Create item</span>
									</Button>
								</div>
							)}
							{items.length > 0 && !isLoading ? (
								<CommandGroup className="p-0">
									{items.map((option) => (
										<CommandItem
											key={option.value}
											value={option.value}
											onMouseDown={(e) => e.preventDefault()}
											onSelect={onSelectItem}
											className="flex-col items-start py-2 group data-[selected=true]:bg-[#F8F8F8] pl-4 gap-3 rounded-none"
										>
											{/* <Check
												className={cn(
													'mr-2 h-4 w-4',
													selectedValue === option.value
														? 'opacity-100'
														: 'opacity-0'
												)}
											/> */}
											<span className="font-semibold text-md group-hover:text-[#101010]">
												{option.value}
											</span>
											<span className="text-xs group-hover:text-[#5A5858]">
												{option.label}
											</span>
										</CommandItem>
									))}
								</CommandGroup>
							) : null}
							{/* {!isLoading ? (
								<CommandEmpty>{emptyMessage ?? 'No items.'}</CommandEmpty>
							) : null} */}
						</CommandList>
					</PopoverContent>
				</Command>
			</Popover>
		</div>
	);
};
