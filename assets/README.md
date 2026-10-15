# 🖼️ assets - the image shelf

This folder is the one home for screenshots and images used by the AstroLog. Anything placed here rides the sync workflow to the public site and becomes a permanent, native asset of the repository - no external image hosts needed.

New here? Open the friendly walkthrough: [walkthrough.html](https://psychedelicsinrecovery.github.io/changelog-astro-public/assets/walkthrough.html) - the same guide, with the three paths laid out step by step.

## How to add an image (the 60-second version)

1. Go to this repo on GitHub, open the `assets` folder, click **Add file -> Upload files**. (Or press `.` on the repo page to open github.dev and drag the file in.)
2. Name the file first, following the convention below (you can rename in the upload dialog).
3. Commit to `main`. That's it - the next sync run publishes it at:

   `https://psychedelicsinrecovery.github.io/changelog-astro-public/assets/<your-file-name>`

## Naming convention (please keep it)

`YYYY-MM-DD-short-name.png`

Examples:

- `2025-10-08-david-lee-ticket-102161.png`
- `2026-10-14-xdn-panel-main-domain-building.png`

The date is the date the screenshot captures, not the day you upload it - so the file sorts next to the ledger entry it belongs to.

## Using an image in a ledger entry

In any `changelog/*.md` or `library/*.md` file, reference it by its public URL:

```html
<img src="https://psychedelicsinrecovery.github.io/changelog-astro-public/assets/2025-10-08-david-lee-ticket-102161.png" alt="Ticket #102161 - David Lee's first message to WPX" style="max-width:100%;border-radius:12px;margin:1rem 0" loading="lazy" />
```

Always include an `alt` that describes what a person would see - the ledger is read by screen readers too. One file, referenced by URL: there is never a need to duplicate an image.

## Privacy and care

- **Blur or crop anything personal** before uploading - ticket numbers and names of support staff are fine (the fellowship's first-name-last-initial courtesy applies), but account numbers, emails, and any personal details of members should not appear.
- Keep files reasonably sized (a screenshot is usually well under 1 MB). If yours is huge, consider a smaller crop - the ledger loads on phones.

## Why one folder

Images live here rather than inside the Astro source so that anyone in the fellowship can contribute without touching code: upload, name it well, done. The build never reads this folder - it simply carries it - so an image can never break the site. For the full story of how the ledger works, see the library: [Why the site got slow](https://psychedelicsinrecovery.github.io/changelog-astro-public/library/why-the-site-was-slow-and-it-wasnt-ai/) and the who-is-who page at `/library/contacts/`.
