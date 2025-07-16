# table-kit

A customizable and easy-to-use React component library for building tables with advanced features like pagination and controls.

## Features
- Simple integration with React projects
- Pagination support
- Table controls for sorting and filtering
- Modular and extensible components

## Installation

```bash
npm install table-kit
```

## Usage

```jsx
import { StandardTable, Pagination, TableControls } from 'table-kit';

function App() {
  return (
    <div>
      <TableControls /* props */ />
      <StandardTable /* props */ />
      <Pagination /* props */ />
    </div>
  );
}
```

## File Structure

```
table-kit/
├── package.json
└── src/
    ├── components/
    │   ├── Pagination.tsx
    │   ├── StandardTable.tsx
    │   └── TableControls.tsx
    └── index.ts
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for any features, bug fixes, or suggestions.

## License

This project is licensed under the MIT License. 