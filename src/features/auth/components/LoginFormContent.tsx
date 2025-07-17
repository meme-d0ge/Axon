import { memo } from 'react';
import { PasswordVariant } from '@/features/auth/components/AuthVariants/PasswordVariant.tsx';
import { SSOVariant } from '@/features/auth/components/AuthVariants/SSOVariant.tsx';
import { ErrorTab } from '@/features/auth/components/Tabs/ErrorTab.tsx';
import { LoadingTab } from '@/features/auth/components/Tabs/LoadingTab.tsx';
import { useConnect } from '@/features/auth/hooks/useConnect.ts';

type IAuthTabProps = {
	homeServer: string;
};
const LoginFormContent = memo(({ homeServer }: IAuthTabProps) => {
	const { data, error, status } = useConnect(homeServer);

	return (
		<>
			<LoadingTab statusLoading={status} />
			<ErrorTab error={error} />
			<PasswordVariant on={!!data?.flows.password} />
			<SSOVariant on={!!data?.flows.sso} />
		</>
	);
});

export default LoginFormContent;
