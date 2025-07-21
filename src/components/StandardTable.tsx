import * as React from 'react';
import TableControls from './TableControls';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';



interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T, idx: number) => React.ReactNode;
  className?: string;
}

interface StandardTableProps<T> {
  columns: Column<T>[];
  data: T[];
  total: number;
  page: number;
  perPage: number;
  filter: string;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onFilterChange: (filter: string) => void;
  entriesOptions?: number[];
  filterOptions?: string[];
  loading?: boolean;
  error?: string | null;
  statusColors?: { [key: string]: string };
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  date?: string;
  onDateChange?: (date: string) => void;
}

export default function StandardTable<T extends object>({
  columns,
  data,
  total,
  page,
  perPage,
  filter,
  onPageChange,
  onPerPageChange,
  onFilterChange,
  entriesOptions = [10, 20, 50],
  filterOptions = ["All","This Month", "Last Month", "This Year"],
  loading,
  error,
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  date,
  onDateChange,
}: StandardTableProps<T>) {
  const totalPages = Math.ceil(total / perPage);
  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
      <TableControls
        perPage={perPage}
        onPerPageChange={(val) => { onPerPageChange(val); onPageChange(1); }}
        filter={filter}
        onFilterChange={onFilterChange}
        entriesOptions={entriesOptions}
        filterOptions={filterOptions}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        searchPlaceholder={searchPlaceholder}
        date={date}
        onDateChange={onDateChange}
      />
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-left border-collapse">
        <thead className="hidden md:table-header-group bg-gray-50 dark:bg-gray-700">
        <tr className="border-b-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
              {columns.map((col, idx) => (
                <th key={idx} className={`p-3 font-semibold ${col.className || ''}`}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-12">
                  <LoadingSpinner size="large" />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-6 text-red-500 dark:text-red-400">
                  {error}
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length} className="text-center p-6 dark:text-gray-400">No data found.</td></tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 flex flex-col md:table-row border-b border-gray-200 dark:border-gray-700 md:border-b-0">
                  {columns.map((col, cidx) => (
                    <td key={cidx} className={`p-3 flex md:table-cell text-md  items-center gap-5  ${col.className || ''}`}> {
                      <span className="block md:hidden font-semibold  text-gray-500 mb-1">{col.label}</span>
                    }
                    {col.render ? col.render(row, idx) : (row[col.key as keyof T] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={page}
        lastPage={totalPages}
        total={total}
        from={from}
        to={to}
        onPageChange={onPageChange}
      />
    </div>
  );
} 