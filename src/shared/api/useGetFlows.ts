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
async function getFlows(homeServer: string): Promise<IUseConnectResponse> {
	try {
		const newClient = initMatrixClient({ baseUrl: homeServer });
		const flows = parseAuthFlowsData(await newClient.loginFlows());
		return {
			client: newClient,
			flows: flows,
		};
	} catch (err) {
		throw err;
	} finally {
	}
}
export const useGetFlows = (
	homeServer: string,
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
		queryFn: () => getFlows(homeServer),
		enabled: !!homeServer,
		staleTime: 1000 * 60 * 5,
		networkMode: 'always',
		...options,
	});
};
