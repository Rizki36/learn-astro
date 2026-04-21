---
name: "Portfolio Rewrite Prompt"
description: "Rewrite portfolio or project text into polished English with a structure and tone similar to Booku. Use when rewriting descriptions, markdown sections, or rough drafts into concise portfolio-ready copy."
argument-hint: "Paste the sentences, paragraph, or markdown section to rewrite"
agent: "agent"
---

Rewrite the provided text into natural, polished English.

Use the style and quality bar from [Booku](../../src/content/portfolio/booku.md) as the reference:
- confident and professional
- concise but descriptive
- product-focused, not overly academic
- smooth flow with strong readability

Requirements:
- Preserve the original meaning, facts, dates, technologies, and claims.
- Do not invent features, metrics, tools, links, or project details.
- Fix grammar, wording, and sentence flow.
- If the source text is in Indonesian or mixed language, translate it to English while rewriting it.
- Keep the output clean and ready to paste into a portfolio markdown file.

Output rules:
- If the input is plain prose, return only the rewritten prose.
- If the input is markdown, you may restructure it into clearer Booku-style sections when the source content supports it.
- Only add headings or sections when they clarify existing information, not to pad the content.
- Prefer strong opening sentences similar to the Booku introduction.
- Avoid filler, repetition, and generic hype.
- Keep the tone modern and credible.

If the input is unclear or missing critical context, make the smallest safe rewrite and list brief assumptions at the end.
