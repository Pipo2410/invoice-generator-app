import Link from 'next/link';
import React from 'react';

import { columns } from '@/components/invoices/listing-page/columns';
import { ListInvoicesTable } from '@/components/invoices/listing-page/list-invoices-table';
import { IconComponent } from '@/components/navigation/icon-component';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchData } from '@/lib/utils';
import { IssuedInvoice } from '@/utils/model';

const tabs = ['Overview', 'Invoices', 'Invoice templates', 'Clients', 'Items', 'Settings'];

export default async function Home() {
  const invoices: IssuedInvoice[] = await fetchData('/invoices');

  return (
    <main className="flex h-fit w-full flex-col gap-10">
      <div className="flex flex-col gap-10">
        <div className="flex w-3/5 justify-between">
          <h1 className="text-3xl">Invoices</h1>

          <div className="flex items-center gap-4">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="items-center gap-1 font-semibold text-dark-blue focus:bg-transparent focus:text-dark-blue data-[state=open]:bg-transparent data-[state=open]:text-dark-blue">
                  Other documents
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    Profile <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>Invoices</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Share</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Print</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <Link
              className="flex items-center gap-1 rounded-full bg-dark-blue px-16 py-3 text-white hover:opacity-90"
              href={'/invoices/create'}
            >
              <span className="text-base">Create invoice</span>
              <IconComponent icon="add" className="inline fill-white" />
            </Link>
          </div>
        </div>
        <Tabs defaultValue={tabs[1]}>
          <TabsList className="h-fit gap-4 rounded-full bg-white p-0.5">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                className="rounded-full px-6 py-2 hover:bg-light-blue hover:text-dark-blue data-[state=active]:bg-light-blue data-[state=active]:font-semibold data-[state=active]:text-dark-blue data-[state=active]:shadow-none"
                value={tab}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={tabs[1]} className="mt-10 w-[80vw]">
            <ListInvoicesTable columns={columns} data={invoices} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
