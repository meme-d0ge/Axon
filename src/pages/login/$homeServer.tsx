import { createFileRoute, useRouter, useSearch } from '@tanstack/react-router';
import punycode from 'punycode';
import { object, string } from 'zod/v4';
import { LoginForm } from '@/features/auth';

export const Route = createFileRoute('/login/$homeServer')({
	component: RouteComponent,
	validateSearch: object({
		protocol: string().optional(),
	}),
});

function RouteComponent() {
	const { homeServer } = Route.useParams();
	const matrixServerOptions: string[] = JSON.parse(
		import.meta.env.VITE_MATRIX_SERVER_OPTIONS,
	);
	const defaultHomeServer: string = import.meta.env.VITE_MATRIX_DEFAULT_SERVER;
	const router = useRouter();
	const { protocol } = useSearch({ from: '/login/$homeServer' });
	return (
		<main className="mt-10">
			<LoginForm
				onChange={(host) => {
					if (host?.protocol === 'http:') {
						router.history.replace(
							`/login/${punycode.toUnicode(host?.host || '')}?protocol=http`,
							{
								replace: true,
								updatedAt: false,
							},
						);
					} else if (host?.protocol === 'https:') {
						router.history.replace(
							`/login/${punycode.toUnicode(host?.host || '')}`,
							{
								replace: true,
								updatedAt: false,
							},
						);
					} else {
						router.history.replace(`/login`, {
							replace: true,
							updatedAt: false,
						});
					}
				}}
				className="w-full max-w-md mx-auto"
				defaultHomeServer={
					`${protocol ? `${protocol}://` : ''}${homeServer}` ||
					defaultHomeServer
				}
				matrixServerOptions={matrixServerOptions}
			/>
		</main>
	);
}
