import { useTheme } from 'mantra-theme-switcher';
import { FC, useState } from 'react';

import styles from './App.module.scss';
import trpc from './app/lib/trpc';

const App: FC = () => {
	const { toggleTheme, isDark, theme } = useTheme();
	const [inputTRPC, setInputTRPC] = useState('');

	const testTRPC = async (): Promise<void> => {
		const data = await trpc.todos.getAllTodos.query({ userId: 2 });
		console.log(data);
	};

	return (
		<div className={styles.appWrapper}>
			<h2>
				{isDark ? 'dark' : 'light'} here: {theme}
			</h2>
			<input
				className={styles.trpcInput}
				type='text'
				onChange={(e): void => setInputTRPC(e.target.value)}
				value={inputTRPC}
			/>
			<button
				className={styles.button}
				onClick={(): void => toggleTheme('dark')}
			>
				Toggle theme dark
			</button>
			<button
				className={styles.button}
				onClick={(): void => toggleTheme('light')}
			>
				Toggle theme light
			</button>
			<button className={styles.button} onClick={(): void => toggleTheme()}>
				Toggle
			</button>
			<button onClick={testTRPC}>Trigger trpc</button>
			<h1>Counter</h1>
			<h2>Just a test</h2>
		</div>
	);
};

export default App;
