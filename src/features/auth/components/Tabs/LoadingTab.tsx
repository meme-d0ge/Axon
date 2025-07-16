import { useAuthVariants } from '@/features/auth/provider/AuthVariantsProvider.tsx';
import { LoadingSpinner } from '@/shared/ui/custom/LoadingSpinner.tsx';

export function LoadingTab() {
	const { statusLoading } = useAuthVariants();

	if (!statusLoading) {
		return null;
	}
	return (
		<div className={'my-4 gap-2 flex items-center justify-center'}>
			<LoadingSpinner className="w-4 h-4" />
			<span className="text-green-300 text-xs">{statusLoading}</span>
		</div>
	);
}

export default LoadingTab;
