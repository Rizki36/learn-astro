---
slug: getting-started-with-astro
title: "Getting Started with Astro: The Modern Web Framework (Dummy)"
description: "Learn how Astro can help you build faster websites with less JavaScript and a better developer experience."
pubDate: 2023-09-25
author: "Fitra"
featuredImage: "/images/blog/astro-framework.jpg"
category: "Web Development"
tags: ["Astro", "JavaScript", "Web Development", "Frontend"]
---

## What is Astro?

Astro is a modern web framework that allows you to build faster websites with less client-side JavaScript. It uses a unique "islands architecture" that lets you deliver highly optimized HTML with optional JavaScript when needed.

## Why Choose Astro?

There are several compelling reasons to choose Astro for your next project:

### 1. Performance-First Approach

Astro ships zero JavaScript by default, resulting in extremely fast page loads. Each component can opt into client-side hydration only when necessary.

### 2. Framework Agnostic

One of the most powerful features of Astro is its ability to work with components from multiple frameworks. You can use React, Vue, Svelte, and more - all in the same project!

```jsx
// Example React component in Astro
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}