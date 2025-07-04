import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Logger } from 'tslog';
import App from './App.tsx';

const rootLogger = new Logger({ name: 'rootLogger' });
const root = document.getElementById('root');

if (root) {
	createRoot(root).render(
		<StrictMode>
			<App />
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
