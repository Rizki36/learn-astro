---
layout: ../../layouts/BlogPostLayout.astro
title: Getting Started with Astro (Dummy)
description: Learn how to build fast, content-focused websites with Astro's multi-page approach.
pubDate: 2023-09-15
createdAt: 2023-09-15
author: Fitra
minutesRead: "5"
tags: ["astro", "web development", "javascript", "tutorial"]
---

# Getting Started with Astro

Astro is a modern web framework designed for speed and simplicity. Unlike traditional JavaScript frameworks that load large amounts of JavaScript, Astro takes a "islands of interactivity" approach, resulting in faster websites with minimal JavaScript.

## Why Astro?

Astro shines when building content-focused websites like blogs, documentation sites, marketing sites, and portfolios. Here are some key benefits:

- **Performance first**: Astro websites are incredibly fast because they ship zero JavaScript by default
- **Content-focused**: Perfect for content-rich websites
- **Easy to use**: Familiar for those who know HTML, CSS, and JavaScript
- **Powerful**: Build with your favorite UI components from React, Vue, Svelte, and more
- **Flexible**: Integrates with your favorite tools and cms platforms

## Getting Started

To create a new Astro project, you can use the following command:

```bash
# create a new project with npm
npm create astro@latest
```

This will guide you through the setup process and create a new Astro project.

## Project Structure

A basic Astro project typically includes the following structure:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

The most important directories are:

- `src/pages/`: Contains your pages. Each .astro, .md, or .mdx file here becomes a route
- `src/components/`: Houses reusable UI components
- `src/layouts/`: Contains layout components that wrap your pages
- `public/`: Stores static assets that are served at the root of your site

## Building Pages

Creating pages in Astro is straightforward. Here's a simple example:

```astro
---
// src/pages/index.astro
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My Astro Site</title>
  </head>
  <body>
    <h1>Welcome to my website!</h1>
  </body>
</html>
```

## Conclusion

Astro offers a refreshing approach to building websites that prioritizes performance and simplicity. If you're building content-focused websites and want to deliver a fast experience to your users, Astro is definitely worth exploring.

For more information, check out the [official Astro documentation](https://docs.astro.build/).
