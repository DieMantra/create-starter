import ThemeSwitch from '../Buttons/ThemeSwitch';
import NavList from './NavList';
import styles from './TopNav.module.css';
const LINKS = ['Home', 'About', 'Booking', 'Contact', 'Really Long One'];
function TopNav() {
	return (
		<nav className={styles.container}>
			<NavList links={LINKS} />
			<ThemeSwitch />
		</nav>
	);
}

export default TopNav;
