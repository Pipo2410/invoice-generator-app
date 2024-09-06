import React from 'react';

import { EmailPreview } from '@/components/preview/email-preview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { PreviewInvoice } from './preview-invoice';

export const PreviewArea = () => (
  <div className="col-span-full xl:col-span-5">
    <Tabs defaultValue="preview" className="sticky top-2">
      <TabsList className="h-fit w-full bg-transparent p-0 px-6">
        <TabsTrigger
          className="w-full rounded-none border-b border-transparent px-6 py-2 hover:border-dark-blue hover:text-dark-blue data-[state=active]:border-b data-[state=active]:border-dark-blue data-[state=active]:font-semibold data-[state=active]:text-dark-blue data-[state=active]:shadow-none"
          value="preview"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          className="w-full rounded-none border-b border-transparent px-6 py-2 hover:border-dark-blue hover:text-dark-blue data-[state=active]:border-b data-[state=active]:border-dark-blue data-[state=active]:font-semibold data-[state=active]:text-dark-blue data-[state=active]:shadow-none"
          value="email"
        >
          Email
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="mt-4">
        <PreviewInvoice />
      </TabsContent>
      <TabsContent value="email" className="mt-4">
        <EmailPreview />
      </TabsContent>
    </Tabs>
  </div>
);
