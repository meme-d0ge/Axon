import { memo } from 'react';
import { Button } from '@/shared/ui/button.tsx';

export const SSOVariant = memo(({ on }: { on: boolean }) => {
	if (!on) {
		return null;
	}
	return (
		<div className="grid gap-6">
			<Button>SSO</Button>
		</div>
	);
});
