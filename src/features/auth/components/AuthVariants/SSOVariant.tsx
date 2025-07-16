import { useAuthVariants } from '@/features/auth/provider/AuthVariantsProvider.tsx';
import { Button } from '@/shared/ui/button.tsx';

function SSOVariant() {
	const { data } = useAuthVariants();
	if (!data?.sso) {
		return null;
	}
	return (
		<div className="grid gap-6">
			<Button>SSO</Button>
		</div>
	);
}

export default SSOVariant;
