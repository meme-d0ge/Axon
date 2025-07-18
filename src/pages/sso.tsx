import {
	createFileRoute,
	useNavigate,
	useSearch,
} from '@tanstack/react-router';
import type { LoginResponse } from 'matrix-js-sdk/lib/@types/auth';
import { object, string } from 'zod/v4';
import { setSession } from '@/shared/matrix-sdk/lib/action/setSession.ts';
import { initMatrixClient } from '@/shared/matrix-sdk/lib/initMatrixClient.ts';

export const Route = createFileRoute('/sso')({
	component: RouteComponent,
	validateSearch: object({
		loginToken: string().optional(),
		baseServer: string().optional(),
	}),
});

function RouteComponent() {
	const { baseServer, loginToken } = useSearch({ from: '/sso' });
	const navigate = useNavigate();
	if (baseServer && loginToken) {
		const client = initMatrixClient({
			baseUrl: baseServer,
		});
		client
			.login('m.login.token', { token: loginToken })
			.then((loginResponse: LoginResponse) => {
				setSession({
					baseUrl: baseServer,
					userId: loginResponse.user_id,
					deviceId: loginResponse.device_id,
					accessToken: loginResponse.access_token,
					refreshToken: loginResponse.refresh_token,
				});
				navigate({
					to: '/',
				});
			});
	}
	return null;
}
