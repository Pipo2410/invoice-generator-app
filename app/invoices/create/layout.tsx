import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create invoice | Rauva',
  description: 'Test app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
