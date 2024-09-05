'use client';

import { useState } from 'react';

import { Content } from '@/components/layout/content';
import { Header } from '@/components/layout/create-invoice-header';
import { Sidebar } from '@/components/layout/sidebar';

import { ActionBar } from './action-bar';

export const MainContent = () => {
  const [showPreview, setShowPreview] = useState(true);
  return (
    <>
      {/* <div className="flex min-h-[calc(100vh-88px)] p-6 pb-0 md:gap-24"> */}
      <div className="flex p-6 pb-0 md:gap-24">
        <aside>
          <Sidebar />
        </aside>
        <main className="relative mb-10 flex w-full flex-col gap-10">
          <Header invoiceNumber={123} />
          <Content showPreview={showPreview} />
        </main>
      </div>
      <ActionBar setShowPreview={setShowPreview} showPreview={showPreview} />
    </>
  );
};
