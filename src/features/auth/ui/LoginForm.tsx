import { useCallback, useState } from 'react';
import PasswordVariant from '@/features/auth/components/AuthVariants/PasswordVariant.tsx';
import SSOVariant from '@/features/auth/components/AuthVariants/SSOVariant.tsx';
import InputHomeServer from '@/features/auth/components/InputHomeServer.tsx';
import ErrorTab from '@/features/auth/components/Tabs/ErrorTab.tsx';
import LoadingTab from '@/features/auth/components/Tabs/LoadingTab.tsx';
import { AuthVariantsProvider } from '@/features/auth/provider/AuthVariantsProvider.tsx';
import { debounce } from '@/shared/lib/debounce.ts';
import { normalizeAndValidateUrl } from '@/shared/lib/normalizeAndValidateUrl.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card.tsx';
import { Label } from '@/shared/ui/label.tsx';
import { Separator } from '@/shared/ui/separator.tsx';

interface ILoginFormProps {
	className?: string;
	defaultHomeServer: string;
	matrixServerOptions: string[];
}
export const LoginForm = ({
	className,
	defaultHomeServer,
	matrixServerOptions,
}: ILoginFormProps) => {
	const [homeServer, setHomeServer] = useState<URL | null>(
		normalizeAndValidateUrl(defaultHomeServer),
	);

	const debounceSetHomeServer = useCallback(
		debounce((value: string) => {
			setHomeServer(normalizeAndValidateUrl(value));
		}, 1000),
		[],
	);

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle className="grid gap-5">
					<span>Axon</span>
					<Separator />
					<div className={'grid gap-3'}>
						<Label htmlFor="homeserver">Homeserver</Label>
						<InputHomeServer
							options={matrixServerOptions}
							defaultHomeServer={defaultHomeServer}
							setValue={debounceSetHomeServer}
						/>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-8">
				<AuthVariantsProvider homeServer={homeServer?.href || ''}>
					<LoadingTab />
					<ErrorTab />
					<PasswordVariant />
					<SSOVariant />
				</AuthVariantsProvider>
			</CardContent>
		</Card>
	);
};
