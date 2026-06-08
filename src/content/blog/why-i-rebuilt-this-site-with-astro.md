---
title: Why I rebuilt this site with Astro
description: A few notes on choosing Astro for a small personal site that spans two very different audiences — and why static-first still feels like the right call in 2026.
pubDate: 2026-06-08
tags: [astro, static-sites, web-dev]
draft: true
---

I've rebuilt this site more times than I'd like to admit. Each time, the rewrite says less about the previous version being broken and more about me wanting to use the project as an excuse to try something new.

This time the something new was [Astro](https://astro.build), and a few months in, I think it was the right call.

## The brief, to myself

The site needed to do two unrelated things well: present me as a software engineer to recruiters and collaborators, and present me as a chazzan and choir director to synagogues and music communities. Same person, very different audiences, and I didn't want either side to feel like an afterthought bolted onto the other.

Beyond that, the technical brief was simple:

- Mostly static content — bios, project listings, engagement history
- Content that changes occasionally, not constantly
- Fast, accessible, and easy to maintain alone

## Why static-first won

It's tempting, as an engineer, to reach for a framework that can do everything — SSR, client state, the works — just in case. But almost nothing on this site needs to be dynamic. Pages like `/engineering` and `/music` are essentially documents. Even the more data-driven sections, like project cards and synagogue engagements, are small, slow-changing collections that I update by hand a few times a year.

Astro's content collections turned out to be a great fit for exactly that shape of problem: typed Markdown front matter, validated against a schema at build time, rendered into static HTML with no client-side JavaScript unless I explicitly opt in. The `projects` and `engagements` sections of this site are both just folders of Markdown files with a `zod` schema describing their shape — and now this blog is too.

## What that buys me

A few things stand out, six months on:

1. **Version control for content.** Every bio update, every new engagement, every blog post is a commit. I can see exactly what changed and when, and roll anything back without thinking about a database.
2. **Almost no runtime surface area.** There's very little that can break in production, because there's very little running in production. Most of the site is just files served from a CDN.
3. **Speed by default**, not as something I had to optimize for.

## What I'd tell past me

Don't be afraid of "boring" technology for a personal site. The interesting part of this project was never going to be the framework — it was going to be the writing, the design decisions, and making two very different parts of my life sit comfortably on the same domain. Astro got out of the way and let me focus on that.

This post is also, conveniently, the first entry in a small blog I'm adding to the site — mostly so I have somewhere to write down things like this before I forget them.
