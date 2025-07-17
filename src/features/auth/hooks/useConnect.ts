import { ConnectionError } from 'matrix-js-sdk/lib/http-api/errors';
import { useEffect, useState } from 'react';
import {
	type IUseConnectResponse,
	useGetFlows,
} from '@/shared/api/useGetFlows.ts';
import { useMatrixClientWellKnown } from '@/shared/api/useMatrixClientWellKnown.ts';

export function useConnect(host: string) {
	const {
		data: dataWellKnown,
		isLoading: loadingMatrixClientWellKnown,
		error: errorMatrixClientWellKnown,
	} = useMatrixClientWellKnown(host, { enabled: !!host, retry: 1 });
	const {
		data: dataGetFlows,
		isLoading: loadingGetFlows,
		error: errorGetFlows,
		status: statusGetFlows,
	} = useGetFlows(dataWellKnown?.['m.homeserver'].base_url || '', {
		enabled: !!dataWellKnown?.['m.homeserver'].base_url,
		retry: 1,
	});

	const [error, setError] = useState<Error | null>(null);
	const [status, setStatus] = useState<string | null>(null);
	const [data, setData] = useState<IUseConnectResponse | null>(null);

	useEffect(() => {
		if (loadingMatrixClientWellKnown) {
			setStatus('Loading hosts .well-known file...');
		}
	}, [loadingMatrixClientWellKnown]);
	useEffect(() => {
		if (errorMatrixClientWellKnown) {
			setError(
				new Error(
					'Failed to connect. Either homeserver is unavailable at this moment or does not exist.',
				),
			);
			setStatus(null);
		} else {
			setError(null);
		}
	}, [errorMatrixClientWellKnown]);
	useEffect(() => {
		if (loadingGetFlows) {
			setStatus('Loading homeservers authentication flow...');
		} else if (statusGetFlows !== 'pending') {
			setStatus(null);
		}
	}, [loadingGetFlows, statusGetFlows]);
	useEffect(() => {
		if (errorGetFlows) {
			if (errorGetFlows instanceof ConnectionError) {
				setError(
					new Error(
						'Failed to connect. Either homeserver is unavailable at this moment or does not exist.',
					),
				);
			} else {
				setError(errorGetFlows);
			}
		} else {
			setError(null);
		}
	}, [errorGetFlows]);
	useEffect(() => {
		setData(dataGetFlows || null);
	}, [dataGetFlows]);

	return {
		error,
		status,
		data,
	};
}
