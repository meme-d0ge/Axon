import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '@/features/auth';

export const Route = createFileRoute('/login/')({
	component: RouteComponent,
});

function RouteComponent() {
	const matrixServerOptions: string[] = JSON.parse(
		import.meta.env.VITE_MATRIX_SERVER_OPTIONS,
	);
	const defaultHomeServer: string = import.meta.env.VITE_MATRIX_DEFAULT_SERVER;
	return (
		<main className="mt-10">
			<LoginForm
				className="w-full max-w-md mx-auto"
				defaultHomeServer={defaultHomeServer}
				matrixServerOptions={matrixServerOptions}
			/>
		</main>
	);
}
