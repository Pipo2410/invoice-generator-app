import { Eye } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';

type Props = {
  setShowPreview: Dispatch<SetStateAction<boolean>>;
};

export const ActionBar: React.FC<Props> = ({ setShowPreview }) => {
  return (
    <div className="absolute -left-[285px] bottom-0 w-screen bg-background px-10 py-6 shadow-actionBar">
      <div className="flex items-center justify-end gap-4">
        <Button
          variant="ghost"
          type="button"
          className="text-dark-blue hover:bg-transparent"
          onClick={() => setShowPreview((prev) => !prev)}
        >
          <Eye className="mr-1 text-black" />
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
