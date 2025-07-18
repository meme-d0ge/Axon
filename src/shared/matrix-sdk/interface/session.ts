import { object, string, type infer as zInfer } from 'zod/v4';

const baseUrlShema = string().min(1, 'baseUrl must be a non-empty string');
const deviceIdShema = string().min(1, 'baseUrl must be a non-empty string');
const userIdShema = string().min(1, 'baseUrl must be a non-empty string');
const accessTokenShema = string().min(1, 'baseUrl must be a non-empty string');
const refreshTokenShema = string()
	.min(1, 'baseUrl must be a non-empty string')
	.optional();

export const SessionSchema = object({
	baseUrl: baseUrlShema,
	deviceId: deviceIdShema,
	userId: userIdShema,
	accessToken: accessTokenShema,
	refreshToken: refreshTokenShema,
});
export type ISession = zInfer<typeof SessionSchema>;

export const SessionPartSchema = object({
	baseUrl: baseUrlShema,
	deviceId: deviceIdShema.optional(),
	userId: userIdShema.optional(),
	accessToken: accessTokenShema.optional(),
	refreshToken: refreshTokenShema,
});
export type ISessionPart = zInfer<typeof SessionPartSchema>;
