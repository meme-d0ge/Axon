import {createFileRoute, useRouter, useSearch} from '@tanstack/react-router';
import { object, string } from 'zod/v4';
import { LoginForm } from '@/features/auth';
import {authHandlerRedirect} from "@/features/auth-handler";

export const Route = createFileRoute('/login/$homeServer')({
	component: RouteComponent,
	validateSearch: object({
		protocol: string().optional(),
	}),
});

function RouteComponent() {
	const matrixServerOptions: string[] = JSON.parse(
		import.meta.env.VITE_MATRIX_SERVER_OPTIONS,
	);
	const defaultHomeServer: string = import.meta.env.VITE_MATRIX_DEFAULT_SERVER;

    const { homeServer } = Route.useParams();
	const { protocol } = useSearch({ from: '/login/$homeServer' });
    const router = useRouter()
	return (
		<main className="mt-10">
			<LoginForm
                onChange={(value)=>{authHandlerRedirect("/login", value, router)}}
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
