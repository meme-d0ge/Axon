import { useGetFlows } from '@/shared/api/useGetFlows.ts';
import { useMatrixClientWellKnown } from '@/shared/api/useMatrixClientWellKnown.ts';

export function useMatrixLoginData(host: string) {
	const {
		data: dataWellKnown,
		isLoading: loadingMatrixClientWellKnown,
		error: errorMatrixClientWellKnown,
	} = useMatrixClientWellKnown(host, 8000, {
		enabled: !!host,
		gcTime: 0,
		retry: 1,
	});
	const {
		data: dataGetFlows,
		isLoading: loadingGetFlows,
		error: errorGetFlows,
	} = useGetFlows(dataWellKnown?.['m.homeserver'].base_url || '', 8000, {
		enabled: !!dataWellKnown?.['m.homeserver'].base_url,
		gcTime: 0,
		retry: 1,
	});

	return {
		error: errorMatrixClientWellKnown ?? errorGetFlows,
		status: loadingMatrixClientWellKnown
			? 'Loading hosts .well-known file...'
			: loadingGetFlows
				? 'Loading homeservers authentication flow...'
				: null,
		data: dataGetFlows,
	};
}
