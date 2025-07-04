import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import '@/app/styles/styles.css';
import { MatrixClientProvider } from '@/shared/matrix-sdk/MatrixClientProvider.tsx';
import { ThemeProvider } from '@/shared/Theme/ThemeProvider.tsx';

export const Route = createRootRoute({
	component: () => (
		<>
			<MatrixClientProvider>
				<ThemeProvider>
					<Outlet />
					<TanStackRouterDevtools />
				</ThemeProvider>
			</MatrixClientProvider>
		</>
	),
});
