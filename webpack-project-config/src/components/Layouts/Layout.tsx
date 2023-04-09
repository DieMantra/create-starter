import { ReactNode } from 'react';
import Footer from '../Navigations/Footer';
import TopNav from '../Navigations/TopNav';

interface LayoutProps {
	children: ReactNode;
}

function Layout({ children }: LayoutProps) {
	return (
		<>
			<TopNav />
			<main>{children}</main>
			<Footer />
		</>
	);
}
export default Layout;
