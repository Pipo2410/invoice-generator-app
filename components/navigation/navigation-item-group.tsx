import React from 'react';

type Props = {
  children: React.ReactNode;
  category?: string;
};

export const NavigationItemGroup: React.FC<Props> = ({ children, category }) => (
  <div className={`${category && 'mt-6'}`}>
    {category && (
      <span className="mb-1 block text-xs font-semibold capitalize leading-[18px] text-dark-gray">{category}</span>
    )}
    <div className="rounded-2xl bg-white">{children}</div>
  </div>
);
