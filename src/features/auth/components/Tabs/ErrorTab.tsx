import { WifiOff } from 'lucide-react';
import { ConnectionError } from 'matrix-js-sdk/lib/http-api/errors';
import { memo } from 'react';
import { ZodError } from 'zod/v4';
import { isFetchCancel } from '@/shared/lib/isFetchCancel.ts';

function handlingError(error: Error): string {
	if (error instanceof TypeError)
		return 'Failed to connect. Either homeserver is unavailable at this moment or does not exist.';
	else if (isFetchCancel(error))
		return 'Failed to connect. Server response timed out';
	else if (error instanceof ConnectionError)
		return 'Failed to connect. The homeserver might be unavailable, does not exist, or did not return authentication flows.';
	else if (error instanceof SyntaxError || error instanceof ZodError)
		return 'Failed to connect. Homeserver configuration appears unusable';
	return error.message;
}
export const ErrorTab = memo(({ error }: { error: Error | null }) => {
	if (!error) return null;
	return (
		<div className={'my-4 gap-2 flex items-center justify-center px-4'}>
			<WifiOff className="dark:text-red-300 text-red-600" />
			<span className="dark:text-red-300 text-red-600 text-xs">
				{handlingError(error)}
			</span>
		</div>
	);
});
