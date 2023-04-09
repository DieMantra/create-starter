import { ReactNode, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BiMoon, BiSun } from 'react-icons/bi';
import styles from './ThemeSwitch.module.css';
interface ThemeSwitch {
	children?: ReactNode;
}
type Theme = 'dark' | 'light';

function ThemeSwitch({ children }: ThemeSwitch) {
	const [currentTheme, setCurrentTheme] = useState<Theme>('light');

	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', (e) => e.matches && handleChangeTheme('dark'));
	window
		.matchMedia('(prefers-color-scheme: light)')
		.addEventListener('change', (e) => e.matches && handleChangeTheme('light'));

	function handleChangeTheme(preference: Theme) {
		setCurrentTheme(preference);
		localStorage.setItem('theme', preference);
		document.documentElement.setAttribute('data-theme', preference);
	}

	useEffect(() => {
		const localTheme = localStorage.getItem('theme') as Theme | undefined;
		if (!localTheme) {
			localStorage.setItem('theme', currentTheme);
			document.documentElement.setAttribute('data-theme', currentTheme);
		} else {
			document.documentElement.setAttribute('data-theme', localTheme);
			setCurrentTheme(localTheme);
		}
		return () => {};
	}, [currentTheme]);

	return (
		<button
			className={styles.themeButton}
			onClick={() =>
				handleChangeTheme(currentTheme === 'dark' ? 'light' : 'dark')
			}
		>
			{children}

			<IconContext.Provider
				value={{
					className: `${styles.darkIcon} ${
						currentTheme === 'dark' ? styles.active : styles.disabled
					}`,
				}}
			>
				<BiMoon />
			</IconContext.Provider>
			<IconContext.Provider
				value={{
					className: `${styles.lightIcon} ${
						currentTheme === 'light' ? styles.active : styles.disabled
					}`,
				}}
			>
				<BiSun />
			</IconContext.Provider>
		</button>
	);
}
export default ThemeSwitch;
