# table-kit

A customizable and easy-to-use React component library for building tables with advanced features like pagination and controls.

## Features
- Simple integration with React projects
- Pagination support
- Table controls for sorting and filtering
- Modular and extensible components

---

## Packages Used

- **react** & **react-dom**: For building interactive user interfaces.
- **vite**: Fast, modern build and development tool for React projects.
- **@vitejs/plugin-react**: Enables JSX and React features in Vite.
- **typescript**: Adds type safety to your codebase.
- **tailwindcss**: Utility-first CSS framework for rapid UI development.
- **postcss**: CSS processing tool (required for Tailwind).
- **@tailwindcss/postcss**: Tailwind plugin for PostCSS integration.
- **autoprefixer**: Automatically adds CSS vendor prefixes for cross-browser support.

---

## Installation

```bash
npm install table-kit
```

### Peer Dependencies

This library uses `react-i18next` for translations. Make sure to install it in your project:

```bash
npm install react-i18next i18next
```

---

## Usage

### 1. Import the Components

```tsx
import { StandardTable, Pagination, TableControls } from 'table-kit';
```

### 2. Full Example: Complete Table with All Features

Below is a complete example of how to use `StandardTable` with all features (pagination, filtering, date picker, and per-page control):

```tsx
import React from 'react';
import { StandardTable } from 'table-kit';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'city', label: 'City' },
  { key: 'date', label: 'Date' },
];
const allData = [
  { name: 'Ali', age: 25, city: 'Cairo', date: '2025-07-15' },
  { name: 'Sara', age: 30, city: 'Alexandria', date: '2025-07-16' },
  { name: 'Omar', age: 22, city: 'Giza', date: '2025-07-15' },
  { name: 'Mona', age: 28, city: 'Mansoura', date: '2025-07-14' },
  { name: 'Youssef', age: 35, city: 'Aswan', date: '2025-07-16' },
  { name: 'Laila', age: 27, city: 'Tanta', date: '2025-07-13' },
  { name: 'Hassan', age: 31, city: 'Suez', date: '2025-07-15' },
  { name: 'Nour', age: 24, city: 'Zagazig', date: '2025-07-16' },
  { name: 'Khaled', age: 29, city: 'Fayoum', date: '2025-07-14' },
  { name: 'Dina', age: 26, city: 'Ismailia', date: '2025-07-13' },
  { name: 'Samir', age: 33, city: 'Luxor', date: '2025-06-15' },
  { name: 'Rania', age: 23, city: 'Port Said', date: '2025-08-16' },
];

function App() {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(5);
  const [dateFilter, setDateFilter] = React.useState<string | undefined>(undefined); // Specific date
  const [rangeFilter, setRangeFilter] = React.useState('All'); // Time filter

  // Filtering logic
  let filteredData = allData;
  if (dateFilter) {
    filteredData = allData.filter(row => row.date === dateFilter);
  } else if (["This Month", "Last Month", "This Year"].includes(rangeFilter)) {
    // You can use a helper like getDateRangeFromFilter here
    const { from, to } = getDateRangeFromFilter(rangeFilter);
    if (from && to) {
      filteredData = allData.filter(row => row.date >= from && row.date <= to);
    }
  }

  const total = filteredData.length;
  const fromIdx = (page - 1) * perPage;
  const toIdx = fromIdx + perPage;
  const data = filteredData.slice(fromIdx, toIdx);

  return (
    <div className="p-8">
      <StandardTable
        columns={columns}
        data={data}
        total={total}
        page={page}
        perPage={perPage}
        filter={rangeFilter}
        onPageChange={setPage}
        onPerPageChange={(val) => { setPerPage(val); setPage(1); }}
        onFilterChange={(val) => {
          setRangeFilter(val);
          setDateFilter(undefined);
          setPage(1);
        }}
        date={dateFilter}
        onDateChange={(val) => {
          const onlyDate = val ? val.slice(0, 10) : undefined;
          setDateFilter(onlyDate);
          setRangeFilter('All');
          setPage(1);
        }}
        filterOptions={["All", "This Month", "Last Month", "This Year"]}
      />
    </div>
  );
}
```

**Explanation:**
- The table supports both time range filtering ("This Month", etc.) and specific date filtering (via date picker).
- Changing the time filter resets the date filter, and vice versa.
- Pagination and per-page controls are fully functional.

---

## Usage (Other Components)

### 3. Example: Using Pagination Directly

```tsx
import { Pagination } from 'table-kit';

<Pagination
  currentPage={1}
  lastPage={5}
  total={50}
  from={1}
  to={10}
  onPageChange={(page) => console.log(page)}
/>
```

### 4. Example: Using TableControls Directly

```tsx
import { TableControls } from 'table-kit';

<TableControls
  perPage={10}
  onPerPageChange={(val) => console.log(val)}
  filter={"All"}
  onFilterChange={(val) => console.log(val)}
  filterOptions={["All", "This Month", "Last Month", "This Year"]}
/>
```

---

## Components Details

### 1. StandardTable
- **Description:** A dynamic table component supporting filtering, pagination, per-page control, and search.
- **Main Props:**
  - `columns`: Array of column definitions (key and label).
  - `data`: The data to display.
  - `total`: Total number of items.
  - `page`, `perPage`: Current page and items per page.
  - `filter`, `onFilterChange`: Filtering by time range or value.
  - `onPageChange`, `onPerPageChange`: Pagination controls.
  - `filterOptions`: Time filter options.
- **Extra Features:**
  - Displays "No data found" automatically when empty.
  - Fully styled with TailwindCSS.

### 2. Pagination
- **Description:** Pagination control component (next/previous) with page numbers.
- **Props:**
  - `currentPage`, `lastPage`, `total`, `from`, `to`, `onPageChange`.
- **Usage:** Can be used standalone or within StandardTable.

### 3. TableControls
- **Description:** Controls for filters, per-page selection, search, and date filtering.
- **Props:**
  - `perPage`, `onPerPageChange`: Items per page control.
  - `filter`, `onFilterChange`, `filterOptions`: Time filters.
  - `date`, `onDateChange`: Filter by specific date.
  - `searchTerm`, `onSearchChange`: Search (optional).

---

## File Structure

```
table-kit/
├── package.json           # Project metadata and dependencies
├── README.md              # Documentation and usage instructions
├── vite.config.ts         # Vite build configuration
├── tsconfig.json          # TypeScript configuration
├── postcss.config.js      # PostCSS (and Tailwind) configuration
├── index.html             # App entry HTML (for Vite)
└── src/
    ├── index.ts           # Library entry point (exports components)
    └── components/
        ├── StandardTable.tsx   # Main table component
        ├── Pagination.tsx      # Pagination component
        ├── TableControls.tsx   # Table controls (filters, search, per-page)
        └── LoadingSpinner.tsx  # Loading spinner utility
    └── utils/
        └── helpers.ts          # Helper functions (date, formatting, etc)
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for any features, bug fixes, or suggestions.

## License

