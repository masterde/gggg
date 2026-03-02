# CommerceJS Storefront Starter

A production-ready ecommerce storefront built with [CommerceJS](https://github.com/commerce-js/commerce.js), Nuxt 4, and Tailwind CSS.

## Features

- 🛍️ Full storefront: products, categories, cart, checkout
- 🔌 Adapter-based — works with CommerceJS Platform, Salla, or Medusa
- 🎨 Beautiful UI with [@commercejs/ui](https://www.npmjs.com/package/@commercejs/ui) components
- ⚡ SSR with CDN caching via route rules
- 🔍 Product search with keyboard shortcuts
- ☁️ Deploy to Cloudflare Pages, Vercel, or Netlify

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your database URL and adapter config

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Configuration

All configuration is done via environment variables. See [`.env.example`](.env.example) for all options.

| Variable | Required | Description |
|----------|----------|-------------|
| `NUXT_COMMERCE_DATABASE_URL` | Yes | PostgreSQL connection string |
| `NUXT_COMMERCE_ADAPTER` | Yes | Backend adapter (`platform`, `salla`, `medusa`) |
| `NUXT_COMMERCE_CURRENCY` | No | Currency code (default: SAR) |

## Deploy

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Cloudflare Pages

This template is pre-configured for Cloudflare Pages deployment. Connect your repository in the Cloudflare dashboard or use the [CommerceJS Cloud](https://github.com/commerce-js/commerce.js) dashboard for one-click deployment.

## Learn More

- [CommerceJS Documentation](https://github.com/commerce-js/commerce.js)
- [Nuxt Documentation](https://nuxt.com/docs)
- [Nuxt UI](https://ui.nuxt.com)
