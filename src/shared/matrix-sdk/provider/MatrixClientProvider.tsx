import type { MatrixClient } from 'matrix-js-sdk/lib/client';
import type * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { initMatrixClient } from '@/shared/matrix-sdk/lib/initMatrixClient.ts';
import { getSession } from '@/shared/matrix-sdk/lib/state/getSession.ts';

interface IMatrixClientProvider {
	client: MatrixClient | null;
	setClient: (client: MatrixClient) => void;
}
const MatrixClientContext = createContext<IMatrixClientProvider>({
	client: null,
	setClient: () => {},
});

interface IMatrixClientProviderProps {
	children: React.ReactNode;
}
export const MatrixClientProvider = ({
	children,
}: IMatrixClientProviderProps) => {
	const session = getSession();
	const [client, setClient] = useState<MatrixClient | null>(
		session ? initMatrixClient(session) : null,
	);

	return (
		<MatrixClientContext.Provider
			value={{
				client,
				setClient,
			}}
		>
			{children}
		</MatrixClientContext.Provider>
	);
};

export const useClient = () => {
	const context = useContext(MatrixClientContext);

	if (context === undefined)
		throw new Error('useClient must be used within a MatrixClientProvider');

	return context;
};
