import { type QueryClient, useQueryClient } from '@tanstack/react-query';
import type * as React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useConnect } from '@/shared/api/useConnect.ts';
import type { FlowVariants } from '@/shared/lib/parseFlowsData.ts';
import { useClient } from '@/shared/matrix-sdk';

interface IAuthVariantsContextState {
	error: Error | null;
	data: FlowVariants | null;
	statusLoading: string | null;
}
const AuthVariantsContext = createContext<IAuthVariantsContextState>({
	error: null,
	statusLoading: null,
	data: null,
});
export function useAuthVariants() {
	const context = useContext(AuthVariantsContext);
	if (context === undefined) {
		throw new Error(
			'useAuthVariants must be used within a AuthVariantsProvider',
		);
	}
	return context;
}
type IAuthVariantsProviderProps = {
	homeServer: string;
	children: React.ReactNode[];
};
export function AuthVariantsProvider({
	homeServer,
	children,
}: IAuthVariantsProviderProps) {
	const [status, setStatus] = useState<string | null>(null);
	const queryClient: QueryClient = useQueryClient();
	const { data, error } = useConnect(homeServer || '', queryClient, setStatus);

	const { setClient } = useClient();
	useEffect(() => {
		if (data?.client) {
			setClient(data.client);
		}
	}, [data, setClient]);

	const memoizedValue = useMemo(() => {
		return {
			data: data?.flows || null,
			error: error,
			statusLoading: status,
		};
	}, [data, error, status]);

	return (
		<AuthVariantsContext.Provider value={memoizedValue}>
			{children}
		</AuthVariantsContext.Provider>
	);
}
