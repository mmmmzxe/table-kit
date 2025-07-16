import * as React from 'react';

interface TableControlsProps {
  // Entries controls
  perPage: number;
  onPerPageChange: (perPage: number) => void;
  
  // Filter controls
  filter: string;
  onFilterChange: (filter: string) => void;
  
  // Optional props for customization
  entriesOptions?: number[];
  filterOptions?: string[];
  showFilters?: boolean;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  date?: string;
  onDateChange?: (date: string) => void;
}

export default function TableControls({ 
  perPage, 
  onPerPageChange, 
  filter = "All",
  onFilterChange,
  entriesOptions = [2, 5, 10, 20, 50],
  filterOptions = ["All", "This Month", "Last Month", "This Year"],
  showFilters = true,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  date,
  onDateChange
}: TableControlsProps) {
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <span>Show</span>
        <select 
          className="border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800"
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
        >
          {entriesOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <span>entries</span>
      </div>
      
      <div className="flex items-center gap-2">
        {showFilters && (
          <div className="flex items-center dark:text-white gap-2 relative">
            <button
              className="border border-gray-200 dark:border-gray-700 rounded px-2 py-1 flex items-center gap-1 text-sm"
              type="button"
              onClick={() => setShowDatePicker((prev) => !prev)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </button>
            {showDatePicker && (
              <input
                type="date"
                className="absolute top-10 left-0 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 z-10"
                value={date || ''}
                onChange={e => {
                  setShowDatePicker(false);
                  if (onDateChange) onDateChange(e.target.value);
                }}
                onBlur={() => setShowDatePicker(false)}
                autoFocus
              />
            )}
            <select 
              className="border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800"
              value={filter}
              onChange={e => onFilterChange(e.target.value)}
            >
              {filterOptions.map(option => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        )}

        {onSearchChange && (
          <div className='border border-gray-200 dark:text-white dark:border-gray-700 px-3 py-2 rounded'>
            <input 
              placeholder={searchPlaceholder} 
              type='search'
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="outline-none bg-transparent text-gray-700 dark:text-gray-300"
            />
          </div>
        )}
      </div>
    </div>
  );
} 