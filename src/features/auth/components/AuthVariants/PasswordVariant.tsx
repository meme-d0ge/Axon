import { memo } from 'react';
import { Button } from '@/shared/ui/button.tsx';
import { Input } from '@/shared/ui/input.tsx';
import { Label } from '@/shared/ui/label.tsx';

export const PasswordVariant = memo(({ on }: { on: boolean }) => {
	if (!on) {
		return null;
	}
	return (
		<form action="" className={`grid gap-5 mt-4`}>
			<div className="grid gap-3">
				<Label htmlFor="username">Username</Label>
				<Input id="" defaultValue="" />
			</div>
			<div className="grid gap-3">
				<Label htmlFor="tabs-demo-username">Password</Label>
				<Input id="tabs-demo-username" type={'password'} defaultValue="" />
			</div>
			<Button
				onClick={(event) => {
					event.preventDefault();
				}}
				className="mt-4"
				variant="outline"
			>
				Login
			</Button>
		</form>
	);
});
