import { memo, useCallback } from 'react';
import { useClient } from '@/shared/matrix-sdk';
import { Button } from '@/shared/ui/button.tsx';

export const LoginSSO = memo(
	({ on, baseUrl }: { on: boolean; baseUrl: string | undefined }) => {
		const { client } = useClient();

		const handleSSOLogin = useCallback(() => {
			if (!client || !baseUrl) return;
			const redirectUrl = `${import.meta.env.VITE_SSO_URL_REDIRECT}?baseServer=${baseUrl}`;
			window.location.href = client.getSsoLoginUrl(redirectUrl);
		}, [client, baseUrl]);
		if (!on) {
			return null;
		}
		return (
			<div className="grid gap-6">
				<Button className="cursor-pointer" onClick={handleSSOLogin}>
					SSO
				</Button>
			</div>
		);
	},
);
