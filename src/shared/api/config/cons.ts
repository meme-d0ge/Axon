interface IAPIConfig {
	useConnectKey: string;
	useMatrixClientWellKnownKey: string;
}
export const API_CONFIG: IAPIConfig = {
	useConnectKey: 'auth-flows',
	useMatrixClientWellKnownKey: 'matrix-client-well-known',
};
