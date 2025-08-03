import { type ReactNode, useCallback } from 'react';
import InputHomeServer from '@/features/auth/components/InputHomeServer.tsx';
import { debounce } from '@/shared/lib/debounce.ts';
import { normalizeAndValidateUrl } from '@/shared/lib/normalizeAndValidateUrl.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card.tsx';
import { Label } from '@/shared/ui/label.tsx';
import { Separator } from '@/shared/ui/separator.tsx';

interface IBaseFormProps {
	setHomeServer: React.Dispatch<
		React.SetStateAction<{
			parseUrl: URL | null;
			inputValue: string;
		}>
	>;
	className?: string;
	defaultHomeServer: string;
	matrixServerOptions: string[];
	children?: ReactNode;
}
export const BaseForm = ({
	className,
	defaultHomeServer,
	matrixServerOptions,
	setHomeServer,
	children,
}: IBaseFormProps) => {
	const debounceSetHomeServer = useCallback(
		debounce((value: string) => {
			setHomeServer({
				parseUrl: normalizeAndValidateUrl(value),
				inputValue: value,
			});
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
							onChange={(value) => {
								if (value.type === 'select') {
									setHomeServer({
										parseUrl: normalizeAndValidateUrl(value.value),
										inputValue: value.value,
									});
								} else {
									debounceSetHomeServer(value.value);
								}
							}}
							defaultHomeServer={defaultHomeServer}
						/>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};
