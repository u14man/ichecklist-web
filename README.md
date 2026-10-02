# Jira Checklist website

English, responsive product website built with React, TypeScript, and Vite. Its visual system follows the supplied Supahub style reference.

## Local development

Install dependencies with `npm install`, then start the development server with `npm run dev`. The default URL is http://localhost:5174.

## Validation

- `npm run build`: strict TypeScript check and production build.
- `npm test`: browser smoke and interaction tests. Playwright requires a Chromium browser installation.
- `npm run preview`: serve the production build locally.

## Website scope

Home, eight feature detail pages, four role-specific solution pages, interactive demo, pricing inquiry, about, contact, guides and articles, searchable help center, product capability notes, and preview-specific privacy and terms pages.

The product demo uses sample data in memory. Reset restores the initial sample. It is not connected to Jira. Contact forms prepare a downloadable or copyable inquiry and clearly state that no message is sent. No invented prices, customer endorsements, certifications, company addresses, or Marketplace listing are included.

## Before production

Connect the contact form to a verified delivery service, supply approved commercial pricing and the real Marketplace URL, and replace preview legal notices with reviewed production policies. History-based routes require a host fallback to `index.html`.
