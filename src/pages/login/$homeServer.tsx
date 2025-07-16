import { createFileRoute, useRouter } from '@tanstack/react-router';
import { LoginForm } from '@/features/auth';

export const Route = createFileRoute('/login/$homeServer')({
	component: RouteComponent,
});

function RouteComponent() {
	const { homeServer } = Route.useParams();
	const matrixServerOptions: string[] = JSON.parse(
		import.meta.env.VITE_MATRIX_SERVER_OPTIONS,
	);
	const defaultHomeServer: string = import.meta.env.VITE_MATRIX_DEFAULT_SERVER;
	const router = useRouter();
	return (
		<main className="mt-10">
			<LoginForm
				onChange={(host) => {
					router.history.replace(`/login/${host || ''}`);
				}}
				className="w-full max-w-md mx-auto"
				defaultHomeServer={homeServer || defaultHomeServer}
				matrixServerOptions={matrixServerOptions}
			/>
		</main>
	);
}
