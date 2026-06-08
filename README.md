# stuartizon.com

Personal website for Stuart Izon — software engineer, chazzan, and choir director. Built with Astro and deployed on Vercel.

## Stack

- [Astro](https://astro.build) — static site generator
- Inter (body) + Outfit (headings) via Google Fonts
- Plain CSS with custom properties — no Tailwind
- Astro content collections for projects, musical engagements, and blog posts
- `@astrojs/sitemap` — sitemap generated at build time
- `@vercel/analytics` — privacy-friendly analytics

## Project structure

```
src/
├── assets/
│   └── stuart.jpg                # Hero image (processed to WebP at build time)
├── content.config.ts             # Content collection schemas
├── content/
│   ├── projects/                 # Project entries (.md)
│   ├── engagements/              # Synagogue/choral engagement entries (.md)
│   └── blog/                     # Blog post entries (.md)
├── layouts/
│   └── Layout.astro              # Base layout, nav, footer, analytics
├── components/
│   ├── Icon.astro                # Inline SVG icon component
│   ├── ProjectCard.astro
│   └── SectionHeader.astro
└── pages/
    ├── index.astro               # Homepage
    ├── engineering.astro         # Engineering background
    ├── music.astro               # Music / chazzanut
    ├── projects.astro            # Projects listing
    ├── blog/
    │   ├── index.astro           # Blog listing
    │   └── [id].astro            # Individual blog post
    ├── contact.astro
    └── 404.astro
```

## Adding content

**New project** — add a `.md` file to `src/content/projects/`:

```md
---
title: Project Name
description: One paragraph description.
url: https://example.com
githubUrl: https://github.com/stuartizon/repo
youtubeUrl: https://www.youtube.com/@stuartizon  # optional
tags: [tag1, tag2]
featured: false
order: 10
domain: engineering  # engineering | music | both
---
```

**New engagement** — add a `.md` file to `src/content/engagements/`:

```md
---
venue: Synagogue Name
role: Chazzan
location: City, Country
period: 2020 – present  # optional
order: 10
---
```

**New blog post** — add a `.md` file to `src/content/blog/`:

```md
---
title: Post Title
description: One or two sentence summary, used in listings and meta tags.
pubDate: 2026-06-08
updatedDate: 2026-06-10  # optional
tags: [tag1, tag2]
draft: false  # set true to hide from the listing while drafting
---

Post body in Markdown.
```

## Commands

| Command           | Action                               |
| :---------------- | :----------------------------------- |
| `npm install`     | Install dependencies                 |
| `npm run dev`     | Start dev server at `localhost:4321` |
| `npm run build`   | Build to `./dist/`                   |
| `npm run preview` | Preview production build locally     |
