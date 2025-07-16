import { Loader } from 'lucide-react';
import { cn } from '@/shared/lib/utils.ts';

export const LoadingSpinner = ({ className }: { className?: string }) => {
	return <Loader className={cn('animate-spin', className)} />;
};
