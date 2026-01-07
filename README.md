# AIFA TURKEY Website

A localized, high-performance website for AIFA TURKEY, built with Next.js 15, Tailwind CSS, and TypeScript.

## Features

- **Localization**: Full support for Turkish (`tr`) and English (`en`) via `next-intl`.
- **Dynamic Content/CMS**: Mock CMS implemented via local JSON files in `src/data` and API routes.
- **SEO Optimized**: Dynamic metadata, OpenGraph tags, and semantic HTML.
- **Modern UI**: Styled with Tailwind CSS and Lucide icons.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The default locale is Turkish, so it will redirect to [http://localhost:3000/tr](http://localhost:3000/tr).

## Project Structure

- `src/app/[locale]`: Localized page routes (Home, Solutions, Industries, etc.).
- `src/components`: Reusable UI components.
- `src/data`: JSON files acting as the data source (CMS).
- `src/messages`: Localization strings (`tr.json`, `en.json`).
- `src/proxy.ts`: Middleware for locale routing.

## Deployment

The application is ready for deployment on Vercel.

```bash
npm run build
```
