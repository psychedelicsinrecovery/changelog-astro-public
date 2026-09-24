# PIR Changelog — private source

Private source for the public PIR changelog site. Public build output is pushed to
[`psychedelicsinrecovery/changelog-astro-public`](https://github.com/psychedelicsinrecovery/changelog-astro-public),
deployed at https://psychedelicsinrecovery.github.io/changelog-astro-public/.

Built from the fleet-wide `my-template/changelog-template/` pattern — that directory's `README.md`
is the actual spec: the frontmatter schema, the "confirmed-done goes straight to changelog"
convention, and why the public repo lives under the `psychedelicsinrecovery` GitHub org rather than
a personal `drasticstatic` repo.

## Structure

- `changelog/` — one markdown file per entry. Kept as a sibling of `astro/`, never inside it, so
  the sync workflow's source-strip step keeps raw entries private — only the compiled HTML reaches
  the public repo.
- `astro/` — the Astro site itself (content collection + changelog pages).
- `.github/workflows/sync-public.yml` — builds the site, strips everything except the compiled
  output, force-pushes to the public repo.

## Adding an entry

New file in `changelog/`, named `YYYY-MM-DD-short-slug.md`:

```yaml
---
title: "Plain-language title"
date: "YYYY-MM-DD"
priority: "P1-high" # or P2-medium (default) or P3-low
---

Body in plain language — what shipped and why it mattered. Not a debugging trail; that stays in
`pir-wp-live`'s own private technical docs.
```

Push to `main` and the sync workflow rebuilds and republishes automatically (once
`PUBLIC_REPO_TOKEN` is configured — see `my-template/how-to-setup-GITEXPORTER.md` if it isn't yet).

---

Co-Authored-By: Alfred · ClaudeCodeCLI · Anthropic [Sonnet-5]
