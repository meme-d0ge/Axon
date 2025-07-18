import type { ISession } from '@/shared/matrix-sdk/interface/session.ts';

export function setSession(session: ISession) {
	localStorage.setItem('baseUrl', session.baseUrl);
	localStorage.setItem('deviceId', session.deviceId);
	localStorage.setItem('userId', session.userId);
	localStorage.setItem('accessToken', session.accessToken);
	if (session.refreshToken) {
		localStorage.setItem('refreshToken', session.refreshToken);
	}
}
