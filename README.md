# Northwind UI Dashboard

A simple UI implementation built using React and TypeScript for accessing Customers and Orders data from Northwind database

## Demo

This project is deployed to Netlify, and can be accessed at: https://northwind-tama.netlify.app

## Setup and Run Project Locally

To run this project locally, clone this repository and run the following commands:

```bash
npm run install
npm run dev
```

To build for production deployment, run:

```bash
npm run build
```

## Environment Variables

For the time being to setting up Environment variables is optional. However, if you want you can use the following template:

```
VITE_REST_API_URL=https://<your api service domain>
VITE_BASE_API_URL=<your desired path for the api proxy>
```

## React + TypeScript + Vite Template

This project was built using the following React + TypeScript + Vite template

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Other Tech Stacks

Other than the mentioned template above, this project also uses:

- [TanStack Router](https://tanstack.com/router/latest) for client-side routing
- [TanStack Query](https://tanstack.com/query/latest) for async state management
- [shadcn/ui](https://ui.shadcn.com/) to build using accessible UI components
- [zod](https://zod.dev) for schema validation
- [@servicestack/client](https://docs.servicestack.net/typescript-server-events-client) for fetching data from the provided api service.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
