"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface ProductFiltersProps {
  productTypes: string[];
  totalProducts: number;
}

export function ProductFilters({
  productTypes,
  totalProducts,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const currentType = searchParams.get("type") || "all";
  const currentSort = searchParams.get("sort") || "newest";

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Reset to page 1 when filters change
    params.delete("page");

    router.push(`/products?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters("search", searchQuery);
  };

  const clearFilters = () => {
    setSearchQuery("");
    router.push("/products");
  };

  const hasActiveFilters =
    currentType !== "all" || currentSort !== "newest" || searchQuery;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-neutral-800 border-neutral-700 text-neutral-100 placeholder:text-neutral-400 focus:border-neutral-600"
          />
        </div>
        <Button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white"
        >
          Tìm kiếm
        </Button>
      </form>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Product Type Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-300">Loại:</span>
          <Select
            value={currentType}
            onValueChange={(value) => updateFilters("type", value)}
          >
            <SelectTrigger className="w-[200px] bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-750">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700">
              <SelectItem
                value="all"
                className="text-neutral-100 focus:bg-neutral-700 focus:text-neutral-100"
              >
                Tất cả ({totalProducts})
              </SelectItem>
              {productTypes.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="text-neutral-100 focus:bg-neutral-700 focus:text-neutral-100"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-300">Sắp xếp:</span>
          <Select
            value={currentSort}
            onValueChange={(value) => updateFilters("sort", value)}
          >
            <SelectTrigger className="w-[180px] bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-750">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700">
              <SelectItem
                value="newest"
                className="text-neutral-100 focus:bg-neutral-700 focus:text-neutral-100"
              >
                Mới nhất
              </SelectItem>
              <SelectItem
                value="oldest"
                className="text-neutral-100 focus:bg-neutral-700 focus:text-neutral-100"
              >
                Cũ nhất
              </SelectItem>
              <SelectItem
                value="price-asc"
                className="text-neutral-100 focus:bg-neutral-700 focus:text-neutral-100"
              >
                Giá tăng dần
              </SelectItem>
              <SelectItem
                value="price-desc"
                className="text-neutral-100 focus:bg-neutral-700 focus:text-neutral-100"
              >
                Giá giảm dần
              </SelectItem>
              <SelectItem
                value="name-asc"
                className="text-neutral-100 focus:bg-neutral-700 focus:text-neutral-100"
              >
                Tên A-Z
              </SelectItem>
              <SelectItem
                value="name-desc"
                className="text-neutral-100 focus:bg-neutral-700 focus:text-neutral-100"
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
            className="gap-2 text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800"
          >
            <X className="h-4 w-4" />
            Xóa bộ lọc
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {currentType !== "all" && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-400">Đang lọc:</span>
          <Badge
            variant="secondary"
            className="gap-2 bg-neutral-800 text-neutral-100 border-neutral-700"
          >
            {currentType}
            <X
              className="h-3 w-3 cursor-pointer hover:text-neutral-300"
              onClick={() => updateFilters("type", "all")}
            />
          </Badge>
        </div>
      )}
    </div>
  );
}
