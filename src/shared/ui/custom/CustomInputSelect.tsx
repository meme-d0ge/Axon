import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shared/ui/button.tsx';
import { Command, CommandItem, CommandList } from '@/shared/ui/command.tsx';
import { Input } from '@/shared/ui/input.tsx';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/ui/popover.tsx';

export interface ICustomInputSelectProps extends React.ComponentProps<'input'> {
	className?: string;
	placeholder?: string;
	value: string;
	id?: string;
	setValue: (value: string) => void;
	options?: string[];
	align?: 'center' | 'end' | 'start';
	side?: 'bottom' | 'top' | 'right' | 'left';
	classNameDropMenu?: string;
}
export const CustomInputSelect = ({
	className,
	placeholder,
	value,
	setValue,
	options,
	id,
	align,
	side,
	classNameDropMenu,
	...rest
}: ICustomInputSelectProps) => {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<div className={`relative ${className ? className : null}`}>
			<Input
				{...rest}
				id={id}
				placeholder={placeholder}
				onChange={(event) => {
					setValue(event.target.value);
				}}
				value={value}
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
											setValue(selected);
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
