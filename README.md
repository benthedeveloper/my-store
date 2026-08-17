# MyStore

A modern Angular 22 storefront application built with standalone components and signal-based state management. Browse products by category, view detailed product information, and manage your shopping cart.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.7.

## Prerequisites

- Install NodeJS with NPM if you have not yet done so (this app was tested with Node v24.18.0).
- Run `npm install` to install dependencies.

## Key Features

- **Product Browsing**: Browse products from various categories with automatic filtering
- **Category Filtering**: Filter products by category to quickly find what you're looking for
- **Product Details**: View comprehensive product information including descriptions, prices, and images
- **Shopping Cart**: Add items to your cart and manage your shopping experience
- **Responsive Design**: Fully responsive UI that works on desktop and mobile devices
- **Pagination**: Navigate through large product listings with built-in pagination
- **Real-time Data**: Integrated with DummyJSON API for mock product data

## Tech Stack

- **Framework**: Angular 22 with standalone components
- **State Management**: Angular signals for reactive state
- **Styling**: CSS with responsive design
- **Testing**: Vitest for unit tests
- **Code Formatting**: Prettier for consistent code style

## Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
npm run test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
