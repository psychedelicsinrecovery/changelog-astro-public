# 🌵 PIR® Changelog & Library

> A running, public-safe record of what's shipped for Psychedelics In Recovery™ — plus a growing
> library of the deeper technical write-ups behind it, for anyone who wants to actually understand
> how this all works.

[![License: MIT](https://img.shields.io/badge/license-MIT-lightgrey?style=flat)](LICENSE)
[![Live Site](https://img.shields.io/badge/%F0%9F%8C%90%20Live-changelog--astro--public-8b5cf6)](https://psychedelicsinrecovery.github.io/changelog-astro-public/)
[![Sync](https://github.com/psychedelicsinrecovery/changelog-astro/actions/workflows/sync-public.yml/badge.svg)](https://github.com/psychedelicsinrecovery/changelog-astro/actions/workflows/sync-public.yml)
[![Built with Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code%20CLI-blueviolet)](https://code.claude.com/docs/en/overview)

---

<strong><i class="ph ph-door-open"></i> <a href="https://psychedelicsinrecovery.github.io/changelog-astro-public/">Changelog &amp; Library Astro Porch →</a></strong>

<a href="https://psychedelicsinrecovery.github.io/"><i class="ph ph-arrow-square-out"></i> Entry portal</a> ·
<a href="https://psychedelicsinrecovery.github.io/changelog-astro-public/changelog"><i class="ph ph-clock-counter-clockwise"></i> Changelog</a> ·
<a href="https://psychedelicsinrecovery.github.io/changelog-astro-public/library"><i class="ph ph-books"></i> Library</a>

---

## 👋 What this is

This is the private source for PIR®'s public changelog site — a plain-language, dated record of
what's actually shipped for [psychedelicsinrecovery.org](https://www.psychedelicsinrecovery.org),
plus a `/library` of deeper technical write-ups for the curious. No debugging trails, no internal
jargon — written for someone outside the fleet who wants to know what changed and why it mattered.

This README is also rendered as the live site's own homepage — so if you're reading this on the
website, 👋 hi, same file.

## 🗂️ What's here

- `changelog/` — one markdown file per shipped entry, `YYYY-MM-DD-short-slug.md`. Kept as a sibling
  of `astro/`, never inside it, so the sync workflow's source-strip step keeps this repo's history
  private — only the compiled HTML reaches the public repo.
- `library/` — deeper, standalone technical docs that don't belong to one changelog entry.
- `astro/` — the Astro site itself: content collections, pages, layout.
- `.github/workflows/sync-public.yml` — builds the site, strips everything except the compiled
  output, and pushes it to
  [`psychedelicsinrecovery/changelog-astro-public`](https://github.com/psychedelicsinrecovery/changelog-astro-public).

Built from the fleet-wide `my-template/changelog-template/` pattern — that directory's own
`README.md` is the actual spec: the frontmatter schema, the "confirmed-done goes straight to
changelog" convention, and why the public repo lives under the `psychedelicsinrecovery` org instead
of a personal `drasticstatic` repo.

## ✍️ Adding an entry

New file in `changelog/`, named `YYYY-MM-DD-short-slug.md`:

```yaml
---
title: "Plain-language title"
date: "YYYY-MM-DD"
priority: "P1-high" # or P2-medium (default) or P3-low
repo: "wordpress" # which project this entry belongs to
---

Body in plain language — what shipped and why it mattered. Not a debugging trail; that stays in
pir-wp-live's own private technical docs.
```

Push to `main` and the sync workflow rebuilds and republishes automatically.

---

*Maintained by [psychedelicsinrecovery](https://github.com/psychedelicsinrecovery) · w/ Anthropic's Claude Code CLI*

Co-Authored-By: Alfred · ClaudeCodeCLI · Anthropic [Sonnet-5]
