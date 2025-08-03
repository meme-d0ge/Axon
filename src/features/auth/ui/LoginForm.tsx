import { useEffect, useState } from 'react';
import { BaseForm } from '@/features/auth/components/BaseForm.tsx';
import LoginFormContent from '@/features/auth/components/LoginFormContent.tsx';
import { normalizeAndValidateUrl } from '@/shared/lib/normalizeAndValidateUrl.ts';

interface ILoginFormProps {
	className?: string;
	defaultHomeServer: string;
	matrixServerOptions: string[];
	onChange: (value: { parseUrl: URL | null; inputValue: string }) => void;
}
export const LoginForm = ({
	className,
	defaultHomeServer,
	matrixServerOptions,
	onChange,
}: ILoginFormProps) => {
	const [homeServer, setHomeServer] = useState<{
		parseUrl: URL | null;
		inputValue: string;
	}>({
		parseUrl: normalizeAndValidateUrl(defaultHomeServer),
		inputValue: defaultHomeServer,
	});
	useEffect(() => {
		onChange(homeServer);
	}, [homeServer, onChange]);

	return (
		<BaseForm
			className={className}
			defaultHomeServer={defaultHomeServer}
			matrixServerOptions={matrixServerOptions}
			setHomeServer={setHomeServer}
		>
			<LoginFormContent homeServer={homeServer?.parseUrl} />
		</BaseForm>
	);
};
