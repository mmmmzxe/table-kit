import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import { StandardTable } from './index';
import { getDateRangeFromFilter } from './utils/helpers';

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
  const [dateFilter, setDateFilter] = React.useState<string | undefined>(undefined);
  const [rangeFilter, setRangeFilter] = React.useState('All'); 

  let filteredData = allData;
  if (dateFilter) {
    filteredData = allData.filter(row => {
      console.log('Comparing:', row.date, '===', dateFilter);
      return row.date === dateFilter;
    });
  } else if (["This Month", "Last Month", "This Year"].includes(rangeFilter)) {
    const { from, to } = getDateRangeFromFilter(rangeFilter);
    console.log('Range:', from, to);
    console.log('All Data:', allData.map(r => r.date));
    if (from && to) {
      filteredData = allData.filter(row => {
        // قارن فقط الجزء yyyy-mm-dd
        return row.date >= from && row.date <= to;
      });
    }
  } // else All => كل الداتا

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
          setDateFilter(undefined); // عند تغيير الفلتر الزمني امسح التاريخ
          setPage(1);
        }}
        date={dateFilter}
        onDateChange={(val) => {
          const onlyDate = val ? val.slice(0, 10) : undefined;
          console.log('Picked date:', onlyDate);
          setDateFilter(onlyDate);
          setRangeFilter('All');
          setPage(1);
        }}
        filterOptions={["All", "This Month", "Last Month", "This Year"]}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 