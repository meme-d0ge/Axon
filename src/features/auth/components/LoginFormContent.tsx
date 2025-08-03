import { memo, useEffect } from 'react';
import { LoginPassword } from '@/features/auth/components/AuthVariants/LoginPassword.tsx';
import { LoginSSO } from '@/features/auth/components/AuthVariants/LoginSSO.tsx';
import { ErrorTab } from '@/features/auth/components/Tabs/ErrorTab.tsx';
import { LoadingTab } from '@/features/auth/components/Tabs/LoadingTab.tsx';
import { TitleTab } from '@/features/auth/components/Tabs/TitleTab.tsx';
import { useMatrixLoginData } from '@/features/auth/hooks/useMatrixLoginData.ts';
import { useClient } from '@/shared/matrix-sdk';

type ILoginFormContentProps = {
	homeServer: URL | null;
};
const LoginFormContent = memo(({ homeServer }: ILoginFormContentProps) => {
	const { data, error, status } = useMatrixLoginData(homeServer?.href || '');
	const { setClient, client } = useClient();
	useEffect(() => {
		if (data?.client) {
			setClient(data.client);
		}
	}, [data, setClient]);

	return (
		<div className="grid gap-2">
			<TitleTab
				className="text-2xl font-semibold w-full text-center"
				title={'Login'}
				on={!status && !error}
			/>
			<LoadingTab statusLoading={status} />
			<ErrorTab error={error} />
			<div className="grid gap-6">
				<LoginPassword on={!!data?.flows.password} />
				<LoginSSO baseUrl={client?.baseUrl} on={!!data?.flows.sso} />
			</div>
		</div>
	);
});

export default LoginFormContent;
