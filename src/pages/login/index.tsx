import { createFileRoute, useRouter } from '@tanstack/react-router';
import punycode from 'punycode';
import { LoginForm } from '@/features/auth';

export const Route = createFileRoute('/login/')({
	component: RouteComponent,
});

function RouteComponent() {
	const matrixServerOptions: string[] = JSON.parse(
		import.meta.env.VITE_MATRIX_SERVER_OPTIONS,
	);
	const defaultHomeServer: string = import.meta.env.VITE_MATRIX_DEFAULT_SERVER;
	const router = useRouter();
	return (
		<main className="mt-10">
			<LoginForm
				onChange={(loginFormValue) => {
					if (loginFormValue.parseUrl?.protocol === 'http:') {
						router.history.replace(
							`/login/${punycode.toUnicode(encodeURIComponent(loginFormValue.inputValue))}?protocol=http`,
							{
								replace: true,
								updatedAt: false,
							},
						);
					} else if (loginFormValue.parseUrl?.protocol === 'https:') {
						router.history.replace(
							`/login/${punycode.toUnicode(encodeURIComponent(loginFormValue.inputValue))}`,
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
				defaultHomeServer={defaultHomeServer}
				matrixServerOptions={matrixServerOptions}
			/>
		</main>
	);
}
