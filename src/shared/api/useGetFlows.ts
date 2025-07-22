import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { MatrixClient } from 'matrix-js-sdk/lib/client';
import { API_CONFIG } from '@/shared/api/config/cons.ts';
import {
	type FlowVariants,
	parseAuthFlowsData,
} from '@/shared/lib/parseFlowsData.ts';
import { initMatrixClient } from '@/shared/matrix-sdk/lib/initMatrixClient.ts';

export interface IUseConnectResponse {
	client: MatrixClient;
	flows: FlowVariants;
}
async function fetchGetFlows(
	homeServer: string,
	timeout: number | null,
): Promise<IUseConnectResponse> {
	const getFlows = async (): Promise<IUseConnectResponse> => {
		const newClient = initMatrixClient({ baseUrl: homeServer });
		const flows = parseAuthFlowsData(await newClient.loginFlows());
		return {
			client: newClient,
			flows: flows,
		} as IUseConnectResponse;
	};

	if (timeout !== null) {
		let timeoutId: ReturnType<typeof setTimeout>;
		const timeoutSleep = async () => {
			await new Promise<void>((resolve) => {
				timeoutId = setTimeout(() => {
					resolve();
				}, timeout);
			});
			throw new Error('Failed to connect. Server response timed out');
		};
		return Promise.race([getFlows(), timeoutSleep()]).finally(() => {
			clearTimeout(timeoutId);
		}) as Promise<IUseConnectResponse>;
	}
	return await getFlows();
}
export const useGetFlows = (
	homeServer: string,
	timeout: number | null,
	options?: Partial<
		UseQueryOptions<
			IUseConnectResponse,
			Error,
			IUseConnectResponse,
			[string, string]
		>
	>,
) => {
	return useQuery({
		queryKey: [API_CONFIG.useGetFlows, homeServer],
		queryFn: () => fetchGetFlows(homeServer, timeout),
		enabled: !!homeServer,
		staleTime: 1000 * 60 * 5,
		networkMode: 'always',
		...options,
	});
};
