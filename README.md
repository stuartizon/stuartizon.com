# stuartizon.com

Personal website for Stuart Izon — software engineer, chazzan, and choir director. Built with Astro and deployed on Vercel.

## Stack

- [Astro](https://astro.build) — static site generator
- Inter (body) + Outfit (headings) via Google Fonts
- Plain CSS with custom properties — no Tailwind
- Astro content collections for projects and musical engagements

## Project structure

```
src/
├── content/
│   ├── content.config.ts     # Collection schemas
│   ├── projects/             # Project entries (.md)
│   └── engagements/          # Synagogue/choral engagement entries (.md)
├── layouts/
│   └── Layout.astro          # Base layout, nav, footer
├── components/
│   ├── ProjectCard.astro
│   └── SectionHeader.astro
└── pages/
    ├── index.astro            # Homepage
    ├── engineering.astro      # Engineering background
    ├── music.astro            # Music / chazzanut
    ├── projects.astro         # Projects listing
    └── contact.astro
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

## Commands

| Command          | Action                                 |
| :--------------- | :------------------------------------- |
| `npm install`    | Install dependencies                   |
| `npm run dev`    | Start dev server at `localhost:4321`   |
| `npm run build`  | Build to `./dist/`                     |
| `npm run preview`| Preview production build locally       |
