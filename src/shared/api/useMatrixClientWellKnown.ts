import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { object, url, type infer as zInfer } from 'zod/v4';
import { API_CONFIG } from '@/shared/api/config/cons.ts';

const HomeServerSchema = object({
	base_url: url(),
});
const IdentityServerSchema = object({
	base_url: url(),
});
const MatrixClientWellKnownSchema = object({
	'm.homeserver': HomeServerSchema,
	'm.identity_server': IdentityServerSchema.optional(),
});
export type IMatrixClientWellKnown = zInfer<typeof MatrixClientWellKnownSchema>;

export async function fetchMatrixClientWellKnown(
	host: string,
	timeout: number | null,
): Promise<IMatrixClientWellKnown> {
	const url = `${host}.well-known/matrix/client`;

	if (timeout !== null) {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeout);
		const response = await fetch(url, {
			method: 'GET',
			signal: controller.signal,
		});
		clearTimeout(timeoutId);
		return MatrixClientWellKnownSchema.parse(await response.json());
	} else {
		const response = await fetch(url, {
			method: 'GET',
		});
		return MatrixClientWellKnownSchema.parse(await response.json());
	}
}

export function useMatrixClientWellKnown(
	host: string,
	timeout: number | null,
	options?: Partial<
		UseQueryOptions<
			IMatrixClientWellKnown,
			Error,
			IMatrixClientWellKnown,
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
