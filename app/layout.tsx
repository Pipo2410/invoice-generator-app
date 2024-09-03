import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/navigation/sidebar';
import { UserNavigation } from '@/components/user-navigation/user-navigation';
import { LogoComponent } from '@/components/navigation/logo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Rauva invoicing app',
	description: 'Test app',
};

export const viewPort: Viewport = {
	initialScale: 1,
	width: 'device-width',
	viewportFit: 'cover',
	maximumScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} m-6 mb-0`}>
				<div className="flex justify-between items-center mb-6">
					<LogoComponent />
					<UserNavigation />
				</div>
				<div className="flex md:gap-24">
					<Sidebar />
					{children}
				</div>
			</body>
		</html>
	);
}
