import { WifiOff } from 'lucide-react';
import { useAuthVariants } from '@/features/auth/provider/AuthVariantsProvider.tsx';

function ErrorTab() {
	const { error } = useAuthVariants();
	if (!error) {
		return null;
	}
	return (
		<div className={'my-4 gap-2 flex items-center justify-center px-4'}>
			<WifiOff className="text-red-300" />
			<span className="text-red-300 text-xs">{error.message}</span>
		</div>
	);
}

export default ErrorTab;
