'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export function ProductPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}: ProductPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/products?${params.toString()}`);
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      {/* Items Info */}
      <p className="text-sm text-neutral-400 text-center px-4">
        Hiển thị <span className="font-medium text-neutral-200">{startItem}</span> đến{' '}
        <span className="font-medium text-neutral-200">{endItem}</span> trong tổng số{' '}
        <span className="font-medium text-neutral-200">{totalItems}</span> sản phẩm
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1 overflow-x-auto max-w-full px-4">
        {/* First Page - Hidden on mobile */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className="bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700 disabled:opacity-50 hidden sm:flex"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous Page */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page Numbers - Responsive */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) =>
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-1 sm:px-2 text-neutral-400 text-sm">
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => goToPage(page as number)}
                className={`min-w-[32px] h-8 ${
                  currentPage === page
                    ? 'bg-primary-600 hover:bg-primary-700 text-white border-primary-600'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700'
                }`}
              >
                {page}
              </Button>
            ),
          )}
        </div>

        {/* Next Page */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last Page - Hidden on mobile */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className="bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700 disabled:opacity-50 hidden sm:flex"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
