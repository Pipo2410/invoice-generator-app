import React from 'react';

import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from '@/components/ui/alert-dialog';

import { AlertDialog, AlertDialogContent } from '../ui/alert-dialog';

type CustomFooterProps = {
  cancelText: string;
  actionText: string;
  onCancel: () => void;
  onAction: () => void;
  isActionLoading?: boolean;
  icon?: React.ReactNode;
};

type CustomDialogProps = { children: React.ReactNode; open: boolean };

export const CustomDialog: React.FC<CustomDialogProps> = ({ children, open }) => (
  <AlertDialog open={open}>
    <AlertDialogContent className="max-h-[80vh]">{children}</AlertDialogContent>
  </AlertDialog>
);

export const CustomDialogFooter: React.FC<CustomFooterProps> = ({
  cancelText,
  actionText,
  onCancel,
  onAction,
  isActionLoading = false,
  icon,
}) => (
  <AlertDialogFooter className="sm:justify-center sm:space-x-6">
    <AlertDialogCancel
      onClick={onCancel}
      className="h-auto w-1/2 rounded-full border-2 border-black py-4 focus-visible:ring-0 focus-visible:ring-offset-0"
    >
      {cancelText}
    </AlertDialogCancel>
    <AlertDialogAction
      onClick={onAction}
      className="h-auto w-1/2 rounded-full border-2 border-black py-4 focus-visible:ring-0 focus-visible:ring-offset-0"
      disabled={isActionLoading}
    >
      {actionText}
      {icon}
    </AlertDialogAction>
  </AlertDialogFooter>
);
