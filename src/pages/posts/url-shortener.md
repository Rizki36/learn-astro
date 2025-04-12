---
layout: "../../layouts/ArticleLayout.astro"
title: "Building a URL shortener (Dummy)"
pubDate: 2024-12-23
date: "23 December 2024"
minutesRead: "10"
category: "TECHNOLOGY"
categoryColor: "#dbeafe"
excerpt: "I used Nextjs to build a simple URL Shortener and it looks really great and here's the stack I used to build this project. Learn about the implementation details and key features."
featuredImg: "https://placehold.co/800x600/252525/CCCCCC?text=TECHNOLOGY"
---

# Building a URL shortener

I used Nextjs to build a simple URL Shortener and it looks really great. Here's the stack I used to build this project:

## The Tech Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose for modeling
- **Deployment**: Vercel

## Key Features

1. **Instant URL shortening**: Enter a long URL and get a short one immediately
2. **Custom slugs**: Create custom short URLs if you want something memorable
3. **Analytics**: Basic click tracking to see how many times your link has been used
4. **QR Code generation**: For each shortened URL

## The Development Process

The most challenging part was ensuring the uniqueness of generated slugs while keeping them short. I implemented a base62 encoding function that converts a counter to a short alphanumeric string.

Another interesting aspect was implementing rate limiting to prevent abuse of the API. I used a simple Redis-based solution that tracks API calls per IP address.

If you're interested in the full code, you can check out the repository at [github.com/boihendo/url-shortener](https://github.com/boihendo/url-shortener).
