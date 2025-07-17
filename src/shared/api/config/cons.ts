interface IAPIConfig {
	useGetFlows: string;
	useConnectKey: string;
	useMatrixClientWellKnownKey: string;
}
export const API_CONFIG: IAPIConfig = {
	useGetFlows: 'get-flows',
	useConnectKey: 'auth-flows',
	useMatrixClientWellKnownKey: 'matrix-client-well-known',
};
