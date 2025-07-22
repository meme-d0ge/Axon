import { memo, useMemo } from 'react';
import { LoadingSpinner } from '@/shared/ui/custom/LoadingSpinner.tsx';

export const LoadingTab = memo(
	({ statusLoading }: { statusLoading: string | null }) => {
		if (!statusLoading) {
			return null;
		}

		return useMemo(() => {
			return (
				<div className={'my-4 gap-2 flex items-center justify-center'}>
					<LoadingSpinner className="w-4 h-4" />
					<span className="dark:text-green-300 text-green-600 text-xs">
						{statusLoading}
					</span>
				</div>
			);
		}, [statusLoading]);
	},
);
