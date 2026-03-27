import '../styles/global.css';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Ryan Spreier - Portfolio',
	description: 'Developer portfolio showcasing projects and experience',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" data-theme="mytheme" data-site-theme="light">
			<body className={inter.className}>
				<ThemeProvider>
					<Navigation />
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
