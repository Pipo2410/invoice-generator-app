import React from 'react';

import { LogoComponent } from '../navigation/logo';
import { UserNavigation } from './user-navigation';

export const AppHeader = () => (
  <div className="flex items-center justify-between p-6">
    <LogoComponent />
    <UserNavigation />
  </div>
);
