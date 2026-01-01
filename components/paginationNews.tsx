// src/components/common/NewsPagination.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface NewsPaginationProps {
  currentPage: number
  totalPages: number
  className?: string
}

export default function NewsPagination({
  currentPage,
  totalPages,
  className = "",
}: NewsPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // تغییر صفحه
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/?${params.toString()}`)
  }

  // تولید صفحات برای نمایش
  const getVisiblePages = () => {
    const pages: (number | string)[] = []
    
    // همیشه صفحه اول
    pages.push(1)
    
    // نمایش ... اگر صفحات زیاد باشد
    if (currentPage > 3) {
      pages.push('...')
    }
    
    // صفحات اطراف صفحه فعلی
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    
    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i)
      }
    }
    
    // ... قبل از صفحه آخر
    if (currentPage < totalPages - 2) {
      pages.push('...')
    }
    
    // همیشه صفحه آخر (اگر بیشتر از 1 صفحه داریم)
    if (totalPages > 1) {
      pages.push(totalPages)
    }
    
    return pages
  }

  const visiblePages = getVisiblePages()

  // اگر فقط یک صفحه داریم، pagination نشان نده
  if (totalPages <= 1) {
    return null
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* دکمه قبلی */}
        <PaginationItem>
          <PaginationPrevious 
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) {
                handlePageChange(currentPage - 1)
              }
            }}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {/* صفحات */}
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <span className="px-2 text-gray-400">...</span>
              </PaginationItem>
            )
          }
          
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(page as number)
                }}
                isActive={currentPage === page}
                className="min-w-10 cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {/* دکمه بعدی */}
        <PaginationItem>
          <PaginationNext 
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) {
                handlePageChange(currentPage + 1)
              }
            }}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}