import React from 'react';

import { NavigationItem } from './navigation-item';
import { NavigationItemGroup } from './navigation-item-group';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <NavigationItemGroup>
          <NavigationItem href="/" icon="home">
            Dashboard
          </NavigationItem>
        </NavigationItemGroup>
        <NavigationItemGroup category="finances">
          <NavigationItem href="/transactions" icon="transactions">
            Transactions
          </NavigationItem>
          <NavigationItem href="/transfer" icon="transfer">
            Transfers
          </NavigationItem>
          <NavigationItem href="/payments" icon="payments">
            Payments
          </NavigationItem>
          <NavigationItem href="cards" icon="card">
            Cards
          </NavigationItem>
        </NavigationItemGroup>
        <NavigationItemGroup category="business toolkit">
          <NavigationItem href="/invoices" icon="invoices">
            Invoices
          </NavigationItem>
          <NavigationItem href="/bookkeeping" icon="bookkeeping">
            Bookkeeping
          </NavigationItem>
        </NavigationItemGroup>
        <NavigationItemGroup category="finances">
          <NavigationItem href="/accountant" icon="accountant">
            <span>Accountant</span>
            <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#EB4E23] text-[10px] text-white">
              9
            </span>
          </NavigationItem>
          <NavigationItem href="/documents" icon="documents">
            Documents
          </NavigationItem>
        </NavigationItemGroup>
      </ul>
    </nav>
  );
};
