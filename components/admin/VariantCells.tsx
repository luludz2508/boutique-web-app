'use client';

import { useRef } from 'react';
import { isStale } from '@/lib/admin/time';
import { InlineNumber } from './InlineNumber';

type Props = {
  variantId: string;
  price: number;
  stock: number;
  trackInventory: boolean;
  updatedAt: string;
};

/**
 * Price and stock cells of one variant. They share one concurrency token, so saving the price
 * doesn't make the stock cell think someone else edited the row.
 */
export function VariantCells({ variantId, price, stock, trackInventory, updatedAt }: Props) {
  const token = useRef(updatedAt);
  // a refreshed page may bring a newer token than the one we hold
  if (isStale(token.current, updatedAt)) token.current = updatedAt;
  const shared = { get: () => token.current, set: (ts: string) => void (token.current = ts) };
  return (
    <>
      <InlineNumber variantId={variantId} field="price" value={price} token={shared} label="Giá (đ)" />
      <InlineNumber
        variantId={variantId}
        field="inventory_quantity"
        value={stock}
        token={shared}
        label={trackInventory ? 'Tồn kho' : 'Tồn kho (không theo dõi)'}
      />
    </>
  );
}
