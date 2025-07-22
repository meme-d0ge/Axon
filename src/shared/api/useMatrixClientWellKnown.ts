import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance.ts';
import { API_CONFIG } from '@/shared/api/config/cons.ts';

export type MatrixClientWellKnown = {
	'm.homeserver': {
		base_url: string;
	};
	'm.identity_server'?: {
		base_url: string;
	};
};
export async function fetchMatrixClientWellKnown(
	host: string,
	timeout: number | null,
): Promise<MatrixClientWellKnown> {
	const url = `${host}.well-known/matrix/client`;

	if (timeout !== null) {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeout);
		const response = await axiosInstance.get<MatrixClientWellKnown>(url, {
			signal: controller.signal,
		});
		clearTimeout(timeoutId);
		return response.data;
	} else {
		const response = await axiosInstance.get<MatrixClientWellKnown>(url);
		return response.data;
	}
}

export function useMatrixClientWellKnown(
	host: string,
	timeout: number | null,
	options?: Partial<
		UseQueryOptions<
			MatrixClientWellKnown,
			Error,
			MatrixClientWellKnown,
			[string, string]
		>
	>,
) {
	return useQuery({
		queryKey: [API_CONFIG.useMatrixClientWellKnownKey, host],
		queryFn: () => fetchMatrixClientWellKnown(host, timeout),
		enabled: !!host,
		staleTime: 1000 * 60 * 5,
		networkMode: 'always',
		...options,
	});
}
