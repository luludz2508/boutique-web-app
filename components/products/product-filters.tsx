'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface ProductFiltersProps {
  productTypes: string[];
  totalProducts: number;
}

export function ProductFilters({ productTypes, totalProducts }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const currentType = searchParams.get('type') || 'all';
  const currentSort = searchParams.get('sort') || 'newest';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all' || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Reset to page 1 when filters change
    params.delete('page');

    router.push(`/products?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters('search', searchQuery);
  };

  const clearFilters = () => {
    setSearchQuery('');
    router.push('/products');
  };

  const hasActiveFilters = currentType !== 'all' || currentSort !== 'newest' || searchQuery;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" />
          <Input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-none border-0 border-b border-ink/30 bg-transparent pl-7 text-ink shadow-none placeholder:text-ink-2/70 focus-visible:border-gold focus-visible:ring-0"
          />
        </div>
        <Button type="submit" className="ink-bloom-dark rounded-none bg-ink px-6 text-xs uppercase tracking-[.18em] text-paper">
          Tìm kiếm
        </Button>
      </form>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Product Type Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-[.18em] text-ink-2">Loại:</span>
          <Select value={currentType} onValueChange={(value) => updateFilters('type', value)}>
            <SelectTrigger className="w-[200px] rounded-none border-0 border-b border-ink/30 bg-transparent text-ink shadow-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none border-ink/15 bg-paper text-ink">
              <SelectItem
                value="all"
                className="text-ink focus:bg-paper-2 focus:text-ink"
              >
                Tất cả ({totalProducts})
              </SelectItem>
              {productTypes.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="text-ink focus:bg-paper-2 focus:text-ink"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-[.18em] text-ink-2">Sắp xếp:</span>
          <Select value={currentSort} onValueChange={(value) => updateFilters('sort', value)}>
            <SelectTrigger className="w-[180px] rounded-none border-0 border-b border-ink/30 bg-transparent text-ink shadow-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none border-ink/15 bg-paper text-ink">
              <SelectItem
                value="newest"
                className="text-ink focus:bg-paper-2 focus:text-ink"
              >
                Mới nhất
              </SelectItem>
              <SelectItem
                value="oldest"
                className="text-ink focus:bg-paper-2 focus:text-ink"
              >
                Cũ nhất
              </SelectItem>
              <SelectItem
                value="price-asc"
                className="text-ink focus:bg-paper-2 focus:text-ink"
              >
                Giá tăng dần
              </SelectItem>
              <SelectItem
                value="price-desc"
                className="text-ink focus:bg-paper-2 focus:text-ink"
              >
                Giá giảm dần
              </SelectItem>
              <SelectItem
                value="name-asc"
                className="text-ink focus:bg-paper-2 focus:text-ink"
              >
                Tên A-Z
              </SelectItem>
              <SelectItem
                value="name-desc"
                className="text-ink focus:bg-paper-2 focus:text-ink"
              >
                Tên Z-A
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-2 rounded-none text-ink-2 hover:bg-paper-2 hover:text-ink"
          >
            <X className="h-4 w-4" />
            Xóa bộ lọc
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {currentType !== 'all' && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-ink-2">Đang lọc:</span>
          <Badge variant="secondary" className="gap-2 rounded-none border border-gold/50 bg-transparent font-normal text-ink">
            {currentType}
            <X
              className="h-3 w-3 cursor-pointer hover:text-seal"
              onClick={() => updateFilters('type', 'all')}
            />
          </Badge>
        </div>
      )}
    </div>
  );
}
