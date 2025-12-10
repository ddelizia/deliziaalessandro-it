# Delizia Alessandro S.r.l.

Professional landing page and blog for **Delizia Alessandro S.r.l.**, an Italian company specializing in building materials, bathroom furnishings, and general construction supplies.

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) v5
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with React
- **Content**: MDX for blog posts with Astro Content Collections
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Package Manager**: pnpm

## 📁 Project Structure

```
src/
├── components/     # Astro & React UI components
├── content/        # Blog posts (MDX) and content config
├── layouts/        # Page layouts
├── lib/            # Utility functions
├── pages/          # Route pages
│   ├── blog/       # Blog listing and post pages
│   └── index.astro # Landing page
└── styles/         # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 24+
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The site will be available at `http://localhost:4321`.

### Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `pnpm dev`      | Start development server             |
| `pnpm build`    | Build for production                 |
| `pnpm preview`  | Preview production build locally     |
| `pnpm deploy`   | Deploy to Cloudflare Pages           |

## 📝 Adding Blog Posts

Create new blog posts in `src/content/blog/` as `.mdx` files:

```mdx
---
title: "Your Post Title"
description: "Brief description of the post"
pubDate: 2025-12-10
author: "Author Name"
heroImage: "/images/hero.jpg"
tags: ["tag1", "tag2"]
---

Your content here...
```

## 🔧 Configuration

- **Astro Config**: `astro.config.mjs`
- **Tailwind**: `src/styles/global.css`
- **TypeScript**: `tsconfig.json`
- **Cloudflare**: `wrangler.jsonc`
- **shadcn**: `components.json`

## 🚢 Deployment

The site automatically deploys to Cloudflare Pages on push to `main` via GitHub Actions.

### Required Secrets

Set these in your GitHub repository settings:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## 📄 License

© 2025 Delizia Alessandro S.r.l. All rights reserved.
