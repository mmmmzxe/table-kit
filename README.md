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

### Peer Dependencies

This library uses `react-i18next` for translations. Make sure to install it in your project:

```bash
npm install react-i18next i18next
```

## Usage Example

Here is a practical example of how to use the `Pagination` component in your React project:


> **Note:** You need to configure `i18n` and provide the necessary translation keys for pagination (e.g., `pagination.show`, `pagination.to`, `pagination.of`, `pagination.entries`, `pagination.previous`, `pagination.next`).

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