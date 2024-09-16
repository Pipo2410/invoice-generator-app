'use client';

import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FormType } from '@/utils/model';

export const useCalculatePrice = () => {
  const { control, setValue } = useFormContext<FormType>();

  const items = useWatch({ control, name: 'items' });
  const globalDiscount = useWatch({ control, name: 'globalDiscount' });
  const retention = useWatch({ control, name: 'retention' });

  const { subTotal, vatTotal, discountTotal, retentionAmount, total, updatedItems } = useMemo(() => {
    if (!items || items.length === 0)
      return { subTotal: 0, vatTotal: 0, discountTotal: 0, retentionAmount: 0, total: 0, updatedItems: [] };

    // Update items with calculated totalPrice for each item
    const updatedItems = items.map((item) => {
      // Calculate item price (without VAT)
      const itemBasePrice = item.price * item.unit;

      // Calculate VAT for the base price
      const itemVAT = itemBasePrice * (item.vat / 100);

      // Apply discount to the price + VAT
      const priceWithVAT = itemBasePrice + itemVAT;
      const discountedPriceWithVAT = priceWithVAT * (1 - (item.discount ?? 0) / 100);

      return { ...item, totalPrice: discountedPriceWithVAT }; // Add totalPrice to each item
    });

    // Calculate subTotal (price + VAT for all items, after item-level discounts)
    const subTotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

    // Calculate item-level discount total (for reporting purposes)
    const itemDiscountTotal = items.reduce(
      (sum, item) =>
        sum + (item.price * item.unit + item.price * item.unit * (item.vat / 100)) * ((item.discount ?? 0) / 100),
      0,
    );

    // Apply global discount if selected (on the subtotal, which includes VAT)
    const globalDiscountAmount = globalDiscount?.isSelected ? subTotal * (globalDiscount.value / 100) : 0;

    // Total discount (item-level + global)
    const discountTotal = itemDiscountTotal + globalDiscountAmount;

    // Calculate VAT total (from the discounted price with VAT)
    const vatTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.unit * (item.vat / 100) * (1 - (item.discount ?? 0) / 100),
      0,
    );

    // Final total
    const total = subTotal - globalDiscountAmount;

    // Get retention if selected (retention does not affect total, just a percentage of it)
    const retentionAmount = retention?.isSelected ? total * (retention.value / 100) : 0;

    return { subTotal, vatTotal, discountTotal, retentionAmount, total, updatedItems };
  }, [items, globalDiscount, retention]);

  useEffect(() => {
    setValue('price', {
      subTotal,
      vatTotal,
      discountTotal,
      retentionAmount,
      total,
    });
  }, [subTotal, vatTotal, discountTotal, retentionAmount, total, setValue]);

  return {
    subTotal,
    vatTotal,
    discountTotal,
    retentionAmount,
    total,
    updatedItems,
  };
};
