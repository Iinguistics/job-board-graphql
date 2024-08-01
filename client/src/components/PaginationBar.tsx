import { MouseEventHandler } from 'react';

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationBar({ currentPage, totalPages, onPageChange }: PaginationBarProps) {
  const pages = getVisiblePages(currentPage, totalPages);
  return (
    <nav className="pagination is-centered" role="navigation" aria-label="pagination">
      <button className="pagination-previous" aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}>
        &#x25C0;
      </button>
      <button className="pagination-next" arial-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}>
        &#x25B6;
      </button>
      <ul className="pagination-list">
        {pages.map((page) => (
          <li key={page}>
            <PageButton page={page} currentPage={currentPage}
              onClick={() => onPageChange(page as number)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface PageButtonProps {
  page: number | string;
  currentPage: number;
  onClick: MouseEventHandler;
}

function PageButton({ page, currentPage, onClick }: PageButtonProps) {
  if (page === currentPage) {
    return (
      <button className="pagination-link is-current"
        aria-label={`Page ${page}`} aria-current="page">
        {page}
      </button>
    );
  }
  if (page === '<' || page === '>') {
    return (
      <span className="pagination-ellipsis">
        &hellip;
      </span>
    );
  }
  return (
    <button className="pagination-link" aria-label={`Go to page ${page}`}
      onClick={onClick}>
      {page}
    </button>
  );
}

function getVisiblePages(current: number, total: number) {
  if (total <= 7) {
    return range(total);
  }
  if (current < 5) {
    return [...range(5), '>', total];
  }
  if (current > total - 4) {
    return [1, '<', ...range(5, total - 4)];
  }
  return [1, '<', current - 1, current, current + 1, '>', total];
}

function range(count: number, start = 1) {
  return Array.from(new Array(count), (x, i) => i + start);
}

export default PaginationBar;
