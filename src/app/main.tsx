import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Logger } from 'tslog';
import { routeTree } from '../routeTree.gen.ts';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const rootLogger = new Logger({ name: 'rootLogger' });
const root = document.getElementById('root');

if (root) {
	createRoot(root).render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
	rootLogger.info(
		"Application successfully rendered to DOM element with ID 'root'",
	);
} else {
	rootLogger.error(
		"Failed to render application: DOM element with ID 'root' not found",
	);
}
