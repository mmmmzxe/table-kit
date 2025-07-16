import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import { StandardTable } from './index';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
];
const data = [
  { name: 'Ali', age: 25 },
  { name: 'Sara', age: 30 },
];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="p-8">
      <StandardTable
        columns={columns}
        data={data}
        total={2}
        page={1}
        perPage={10}
        filter={''}
        onPageChange={() => {}}
        onPerPageChange={() => {}}
        onFilterChange={() => {}}
      />
    </div>
  </React.StrictMode>
); 