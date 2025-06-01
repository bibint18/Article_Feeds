import React from 'react';
import Button from '../Shared/Button';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    const maxPagesToShow = 5; // Show up to 5 page numbers at a time
    const pages: (number | string)[] = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pages.push(1); // Always show first page
      if (startPage > 2) pages.push('...'); // Add ellipsis if gap is more than 1
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...'); // Add ellipsis if gap is more than 1
      pages.push(totalPages); // Always show last page
    }

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    totalItems > itemsPerPage && (
      <div className="flex justify-center items-center mt-8 space-x-2">
        <Button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 px-4 py-2 rounded-lg"
        >
          Previous
        </Button>
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            disabled={typeof page === 'string' || page === currentPage}
            className={`px-4 py-2 rounded-lg ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {page}
          </button>
        ))}
        <Button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 px-4 py-2 rounded-lg"
        >
          Next
        </Button>
        <span className="text-gray-700 self-center ml-4">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    )
  );
};

export default Pagination;