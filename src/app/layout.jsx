import '../styles/global.css';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Ryan Spreier - Portfolio',
	description: 'Developer portfolio showcasing projects and experience',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" data-theme="mytheme">
			<body className={inter.className}>
				<Navigation />
				{children}
				<Footer />
			</body>
		</html>
	);
}
