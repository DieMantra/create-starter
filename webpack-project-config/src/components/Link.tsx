import styles from './Link.module.css';

interface LinkItem {
	link: string;
	isActive?: boolean;
}

function LinkItem({ link, isActive }: LinkItem): JSX.Element {
	if (typeof link !== 'string') {
		return (
			<li
				className={`${styles.listItem} `}
				key={Math.floor(Math.random() * 99)}
			>
				<a href='javascript:void(0);'>Error</a>
			</li>
		);
	}
	return (
		<li className={`${styles.listItem} `} key={link}>
			<a href={`${link}`}>{link}</a>
		</li>
	);
}

export default LinkItem;
