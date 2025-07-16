import { type QueryClient, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import type { MatrixClient } from 'matrix-js-sdk/lib/client';
import { ConnectionError } from 'matrix-js-sdk/lib/http-api/errors';
import { useEffect } from 'react';
import { API_CONFIG } from '@/shared/api/config/cons.ts';
import {
	fetchMatrixClientWellKnown,
	type MatrixClientWellKnown,
} from '@/shared/api/useMatrixClientWellKnown.ts';
import {
	type FlowVariants,
	parseAuthFlowsData,
} from '@/shared/lib/parseFlowsData.ts';
import { initMatrixClient } from '@/shared/matrix-sdk/lib/initMatrixClient.ts';

export interface IUseConnectResponse {
	client: MatrixClient;
	flows: FlowVariants;
}
async function connect(
	host: string,
	queryClient: QueryClient,
	setStatus: (status: string | null) => void,
): Promise<IUseConnectResponse | undefined> {
	try {
		setStatus('Loading hosts .well-known file...');
		const data: undefined | MatrixClientWellKnown = queryClient.getQueryData([
			API_CONFIG.useMatrixClientWellKnownKey,
			host,
		]);
		const res =
			data ||
			(await (async () => {
				const res = await fetchMatrixClientWellKnown(host);
				queryClient.setQueryData(
					[API_CONFIG.useMatrixClientWellKnownKey, host],
					res,
				);
				return res;
			})());

		const homeServer = res['m.homeserver'].base_url;

		setStatus('Loading homeservers authentication flow...');

		const newClient = initMatrixClient({ baseUrl: homeServer });
		const flows = parseAuthFlowsData(await newClient.loginFlows());
		setStatus(null);
		return {
			client: newClient,
			flows: flows,
		};
	} catch (err) {
		if (isAxiosError(err)) {
			if (err.code === 'ERR_NETWORK') {
				throw new Error(
					'Failed to connect. Either host is unavailable at this moment or does not exist.',
				);
			}
		} else if (err instanceof ConnectionError) {
			throw new Error(
				'Failed to connect. Either homeserver is unavailable at this moment or does not exist.',
			);
		}
		throw err;
	}
}
export const useConnect = (
	host: string,
	queryClient: QueryClient,
	setStatus: (status: string | null) => void,
) => {
	const query = useQuery({
		queryKey: [API_CONFIG.useConnectKey, host],
		queryFn: () => connect(host, queryClient, setStatus),
		enabled: !!host,
		networkMode: 'always',
	});
	useEffect(() => {
		if (!query.isLoading) {
			setStatus(null);
		}
	}, [query.isLoading, setStatus]);
	return query;
};
