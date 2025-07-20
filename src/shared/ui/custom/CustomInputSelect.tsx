import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils.ts';
import { Button } from '@/shared/ui/button.tsx';
import { Command, CommandItem, CommandList } from '@/shared/ui/command.tsx';
import { Input } from '@/shared/ui/input.tsx';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/ui/popover.tsx';

export interface CustomInputValue {
	type: 'input' | 'select';
	value: string;
}
export interface ICustomInputSelectProps
	extends Omit<React.ComponentProps<'input'>, 'defaultValue' | 'onChange'> {
	className?: string;
	placeholder?: string;
	defaultValue: CustomInputValue;
	onChange: (value: CustomInputValue) => void;
	id?: string;
	options?: string[];
	align?: 'center' | 'end' | 'start';
	side?: 'bottom' | 'top' | 'right' | 'left';
	classNameDropMenu?: string;
}
export const CustomInputSelect = ({
	className,
	placeholder,
	options,
	id,
	defaultValue,
	align,
	side,
	classNameDropMenu,
	onChange,
	...rest
}: ICustomInputSelectProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const [value, setValue] = useState<CustomInputValue>(defaultValue);

	return (
		<div className={cn('relative', className)}>
			<Input
				{...rest}
				id={id}
				placeholder={placeholder}
				onChange={(event) => {
					setValue({ type: 'input', value: event.target.value });
					onChange({ type: 'input', value: event.target.value });
				}}
				value={value.value}
			/>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button className="absolute right-0 top-0" variant={'ghost'}>
						<ChevronDown />
					</Button>
				</PopoverTrigger>
				{options ? (
					<PopoverContent
						side={side}
						align={align}
						className={classNameDropMenu}
					>
						<Command>
							<CommandList>
								{options?.map((option) => (
									<CommandItem
										key={option}
										value={option}
										onSelect={(selected) => {
											setValue({ type: 'select', value: selected });
											onChange({ type: 'select', value: selected });
											setOpen(false);
										}}
									>
										{option}
									</CommandItem>
								))}
							</CommandList>
						</Command>
					</PopoverContent>
				) : null}
			</Popover>
		</div>
	);
};

export default CustomInputSelect;
