import * as React from 'react';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  total: number;
  from: number;
  to: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  lastPage, 
  total, 
  from, 
  to, 
  onPageChange 
}: PaginationProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-4 text-sm text-gray-700 dark:text-gray-300">
      <span>
        Show {from || 0} to {to || 0} of {total} entries
      </span>
      <div className="flex gap-1">
        <button 
          className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-transparent disabled:opacity-50" 
          disabled={currentPage === 1}
          onClick={() => {
            onPageChange(Math.max(1, currentPage - 1));
          }}
        >
          Previous
        </button>
        <button className="px-2 py-1 rounded border border-red-500 text-white bg-red-500">{currentPage}</button>
        <button 
          className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-transparent disabled:opacity-50"
          disabled={currentPage >= lastPage}
          onClick={() => {
            onPageChange(Math.min(lastPage, currentPage + 1));
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
} 