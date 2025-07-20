import { isAxiosError } from 'axios';
import { WifiOff } from 'lucide-react';
import { ConnectionError } from 'matrix-js-sdk/lib/http-api/errors';
import { memo, useCallback } from 'react';

export const ErrorTab = memo(({ error }: { error: Error | null }) => {
	const handlingError = useCallback(() => {
		if (error) {
			if (isAxiosError(error)) {
				if (error.code === 'ERR_NETWORK') {
					return new Error(
						'Failed to connect. Either homeserver is unavailable at this moment or does not exist.',
					);
				}
				return error;
			} else if (error instanceof ConnectionError) {
				return new Error(
					'Failed to connect. The homeserver might be unavailable, does not exist, or did not return authentication flows.',
				);
			} else {
				return error;
			}
		}
		return error;
	}, [error]);

	if (!error) {
		return null;
	}

	return (
		<div className={'my-4 gap-2 flex items-center justify-center px-4'}>
			<WifiOff className="text-red-300" />
			<span className="text-red-300 text-xs">{handlingError()?.message}</span>
		</div>
	);
});
