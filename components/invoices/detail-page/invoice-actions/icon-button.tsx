import React from 'react';

import { Button } from '@/components/ui/button';

type Props = {
  children: React.ReactNode;
  text?: string;
};

export const IconButton: React.FC<Props> = ({ children, text }) => (
  <div className="flex flex-col gap-2 text-center">
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="mx-4 h-14 w-14 items-center justify-center rounded-full bg-light-blue hover:bg-light-blue hover:opacity-80"
    >
      {children}
    </Button>
    {text && <span>{text}</span>}
  </div>
);
