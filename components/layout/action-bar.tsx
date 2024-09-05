'use client';

import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDefaultContext } from '@/context/default-context';

export const ActionBar = () => {
  const { showPreview, setShowPreview } = useDefaultContext();
  return (
    <div className="mt-auto bg-background px-10 py-6 shadow-actionBar">
      <div className="flex flex-col items-center justify-end gap-4 lg:flex-row">
        <Button
          variant="ghost"
          type="button"
          className="text-dark-blue hover:bg-transparent"
          onClick={() => setShowPreview((prev) => !prev)}
        >
          {showPreview ? <Eye className="mr-1 text-black" /> : <EyeOff className="mr-1 text-black" />}
          Enable preview
        </Button>
        <Button
          variant="ghost"
          type="button"
          className="rounded-full border-[1.5px] bg-white px-20 py-3.5 text-[#7E8081]"
        >
          Save as draft
        </Button>
        <Button
          variant="ghost"
          type="submit"
          className="rounded-full border-[1.5px] bg-foreground px-20 py-3.5 text-white disabled:bg-[#7E8081] disabled:text-white"
        >
          Issue invoice
        </Button>
      </div>
    </div>
  );
};
