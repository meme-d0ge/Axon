import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
	theme: 'system',
	setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'axon-ui-theme',
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		(localStorage.getItem(storageKey) as Theme) || defaultTheme,
	);

	const setClassTheme = useCallback(
		(element: HTMLElement, themeToApply: 'light' | 'dark') => {
			element.classList.remove('light', 'dark');
			element.classList.add(themeToApply);
		},
		[],
	);

	useEffect(() => {
		const root = window.document.documentElement;

		if (theme === 'system') {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const systemTheme = mediaQuery.matches ? 'dark' : 'light';
			setClassTheme(root, systemTheme);

			const handlerTheme = (event: MediaQueryListEvent) => {
				const systemTheme = event.matches ? 'dark' : 'light';
				setClassTheme(root, systemTheme);
			};
			mediaQuery.addEventListener('change', handlerTheme);

			return () => {
				mediaQuery.removeEventListener('change', handlerTheme);
			};
		}

		setClassTheme(root, theme);
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error('useTheme must be used within a ThemeProvider');

	return context;
};
