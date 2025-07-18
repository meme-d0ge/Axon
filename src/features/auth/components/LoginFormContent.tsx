import { memo, useEffect } from 'react';
import { PasswordVariant } from '@/features/auth/components/AuthVariants/PasswordVariant.tsx';
import { SSOVariant } from '@/features/auth/components/AuthVariants/SSOVariant.tsx';
import { ErrorTab } from '@/features/auth/components/Tabs/ErrorTab.tsx';
import { LoadingTab } from '@/features/auth/components/Tabs/LoadingTab.tsx';
import { useConnect } from '@/features/auth/hooks/useConnect.ts';
import { useClient } from '@/shared/matrix-sdk';

type IAuthTabProps = {
	homeServer: URL | null;
};
const LoginFormContent = memo(({ homeServer }: IAuthTabProps) => {
	const { data, error, status } = useConnect(homeServer?.href || '');
	const { setClient, client } = useClient();
	useEffect(() => {
		if (data?.client) {
			setClient(data.client);
		}
	}, [data, setClient]);

	return (
		<>
			<LoadingTab statusLoading={status} />
			<ErrorTab error={error} />
			<PasswordVariant on={!!data?.flows.password} />
			<SSOVariant baseUrl={client?.baseUrl} on={!!data?.flows.sso} />
		</>
	);
});

export default LoginFormContent;
