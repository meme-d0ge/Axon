export interface ISession {
	baseUrl: string;
	deviceId: string;
	userId: string;
	accessToken: string;
	refreshToken?: string;
}

export interface ISessionPart
	extends Omit<ISession, 'deviceId' | 'userId' | 'accessToken'> {
	baseUrl: string;
	deviceId?: string;
	userId?: string;
	accessToken?: string;
	refreshToken?: string;
}
