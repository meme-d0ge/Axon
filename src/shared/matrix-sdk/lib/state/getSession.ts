import {
	type ISession,
	SessionSchema,
} from '@/shared/matrix-sdk/interface/session.ts';

export function getSession() {
	const baseUrl = localStorage.getItem('baseUrl');
	const deviceId = localStorage.getItem('deviceId');
	const userId = localStorage.getItem('userId');
	const accessToken = localStorage.getItem('accessToken');
	const refreshToken = localStorage.getItem('refreshToken');

	const result = SessionSchema.safeParse({
		baseUrl,
		deviceId,
		userId,
		accessToken,
		refreshToken: refreshToken ?? undefined,
	} satisfies Record<keyof ISession, unknown>);
	return result.data;
}
