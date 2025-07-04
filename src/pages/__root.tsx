import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import '@/app/styles/styles.css';
import { ThemeProvider } from '@/shared/Theme/ThemeProvider.tsx';

export const Route = createRootRoute({
	component: () => (
		<>
			<ThemeProvider>
				<Outlet />
				<TanStackRouterDevtools />
			</ThemeProvider>
		</>
	),
});
