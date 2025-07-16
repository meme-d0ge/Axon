import { createClient } from 'matrix-js-sdk/lib/matrix';
import type { ISessionPart } from '@/shared/matrix-sdk/interface/session.ts';

export function initMatrixClient(session: ISessionPart) {
	return createClient({ ...session });
}
