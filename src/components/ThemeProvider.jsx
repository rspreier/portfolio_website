'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({
	theme: 'light',
	setTheme: () => {},
	availableThemes: ['light', 'dark', 'retro'],
});

const VALID_THEMES = ['light', 'dark', 'retro'];
const STORAGE_KEY = 'site-theme';

export function ThemeProvider({ children }) {
	const [theme, setThemeState] = useState('light');

	useEffect(() => {
		const storedTheme = window.localStorage.getItem(STORAGE_KEY);
		if (storedTheme && VALID_THEMES.includes(storedTheme)) {
			setThemeState(storedTheme);
		}
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute('data-site-theme', theme);
		window.localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	function setTheme(nextTheme) {
		if (!VALID_THEMES.includes(nextTheme)) return;
		setThemeState(nextTheme);
	}

	const value = useMemo(
		() => ({
			theme,
			setTheme,
			availableThemes: VALID_THEMES,
		}),
		[theme]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useSiteTheme() {
	return useContext(ThemeContext);
}
