import { useCallback, useEffect, useState } from 'react';
import InputHomeServer from '@/features/auth/components/InputHomeServer.tsx';
import LoginFormContent from '@/features/auth/components/LoginFormContent.tsx';
import { debounce } from '@/shared/lib/debounce.ts';
import { normalizeAndValidateUrl } from '@/shared/lib/normalizeAndValidateUrl.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card.tsx';
import { Label } from '@/shared/ui/label.tsx';
import { Separator } from '@/shared/ui/separator.tsx';

interface ILoginFormProps {
	className?: string;
	defaultHomeServer: string;
	matrixServerOptions: string[];
	onChange: (value: string | null) => void;
}
export const LoginForm = ({
	className,
	defaultHomeServer,
	matrixServerOptions,
	onChange,
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
	const SetHomeServer = useCallback((value: string) => {
		setHomeServer(normalizeAndValidateUrl(value));
	}, []);

	useEffect(() => {
		onChange(homeServer?.host || null);
	}, [homeServer, onChange]);

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
							onChange={(value) => {
								if (value.type === 'select') {
									SetHomeServer(value.value);
								} else {
									debounceSetHomeServer(value.value);
								}
							}}
							defaultHomeServer={defaultHomeServer}
						/>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-8">
				<LoginFormContent homeServer={homeServer} />
			</CardContent>
		</Card>
	);
};
