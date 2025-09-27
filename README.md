# Project Setup Guide

## Prerequisites

Before running this project, ensure you have the following software installed on your system:

- **Node.js** (version 16.x or higher recommended)
- **npm** (comes with Node.js) or alternative package managers (pnpm, yarn, bun)
- **Git** (for cloning the repository)

### Verify Installation

Check if the required tools are properly installed by running:

```bash
node --version
npm --version
git --version
```

## Environment Configuration

### Required Environment Variables

After cloning the project, you must create a `.env` file in the root directory with the following configuration:

```bash
API_BASE_URL=your_backend_api_url
```

**Example Configuration:**
```bash
API_BASE_URL=http://127.0.0.1:8000/api
```

> **Note:** This example uses a local development backend. Replace with your actual backend URL. For reference, this project integrates with [this backend implementation](https://github.com/fvargasz/fh_back).

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm (recommended)
npm install

# Using pnpm
pnpm install

# Using yarn
yarn install

# Using bun
bun install
```

## Development

### Start Development Server

Launch the development server on `http://localhost:3000`:

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev

# Using yarn
yarn dev

# Using bun
bun run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000) with hot-reload enabled for development.

## Production Deployment

### Build for Production

Generate the production build:

```bash
# Using npm
npm run build

# Using pnpm
pnpm build

# Using yarn
yarn build

# Using bun
bun run build
```

### Preview Production Build

Test the production build locally:

```bash
# Using npm
npm run preview

# Using pnpm
pnpm preview

# Using yarn
yarn preview

# Using bun
bun run preview
```

## Additional Resources

- **Nuxt.js Documentation:** [Getting Started Guide](https://nuxt.com/docs/getting-started/introduction)
- **Deployment Guide:** [Nuxt Deployment Documentation](https://nuxt.com/docs/getting-started/deployment)

## Troubleshooting

### Common Issues

- **Port 3000 already in use:** Kill the process using the port or specify a different port
- **Module not found errors:** Delete `node_modules` and `package-lock.json`, then reinstall dependencies
- **Environment variables not loading:** Ensure the `.env` file is in the root directory and properly formatted

### Getting Help

If you encounter issues not covered in this guide, please refer to the [Nuxt.js documentation](https://nuxt.com/docs) or check the project's issue tracker.
