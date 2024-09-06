import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import { ActionBar } from '@/components/layout/action-bar';
import { AppHeader } from '@/components/layout/app-header';
import { Sidebar } from '@/components/layout/sidebar';
import { DefaultContextProvider } from '@/context/default-context';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rauva invoicing app',
  description: 'Test app',
};

export const viewPort: Viewport = {
  width: 'device-width',
  viewportFit: 'cover',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <DefaultContextProvider>
          <AppHeader />
          <div className="flex p-6 pb-0 md:gap-24">
            <aside>
              <Sidebar />
            </aside>
            {children}
          </div>
          <ActionBar />
        </DefaultContextProvider>
      </body>
    </html>
  );
}

{
  /* <div className="flex min-h-[calc(100vh-88px)] flex-col"> */
}
{
  /* <div className="flex min-h-[calc(100vh-88px)] p-6 pb-0 md:gap-24">{children}</div> */
}
