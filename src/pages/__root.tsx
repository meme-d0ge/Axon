import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import '@/app/styles/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MatrixClientProvider } from '@/shared/matrix-sdk';
import { ThemeProvider } from '@/shared/Theme/ThemeProvider.tsx';

const queryClient = new QueryClient();
export const Route = createRootRoute({
	component: () => (
		<>
			<QueryClientProvider client={queryClient}>
				<MatrixClientProvider>
					<ThemeProvider>
						<Outlet />
						<TanStackRouterDevtools />
						<ReactQueryDevtools initialIsOpen={false} />
					</ThemeProvider>
				</MatrixClientProvider>
			</QueryClientProvider>
		</>
	),
});
