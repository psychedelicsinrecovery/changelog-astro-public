# 🌱 Sustainability: what keeps these pages running

<div class="tldr"><i class="ph ph-plant"></i> <span><strong>TL;DR:</strong> PIR®'s GitHub pages cost nothing to host. What keeps them alive is a short list of things that quietly expire or drift: the publishing tokens, the scheduled jobs, a shared kit, one generator for the desk portals, and cached link previews. Each is written down here, so none of it depends on anyone's memory.</span></div>

This covers PIR's hub on GitHub, this AstroLog and the helpdesk portals together. It's also this
repository's `SUSTAINABILITY.md`, and the hub keeps a shorter copy for its own repository. A.L.E.X.,
PIR's Discord helper, has its own page about what it takes to run it:
[A.L.E.X.'s sustainability](https://psychedelicsinrecovery.github.io/alex-desk-public/sustainability.html).

## 🧩 The pieces

| Repository | What it is | How it goes live |
| --- | --- | --- |
| [`psychedelicsinrecovery.github.io`](https://github.com/psychedelicsinrecovery/psychedelicsinrecovery.github.io) (public) | The hub: `/`, `/donate/`, `/map/`, the 404, and the **arrival kit** every page loads | GitHub Pages, straight from `main` |
| `changelog-astro` (private) | The source of this AstroLog: entries, write-ups, the Astro site | A workflow builds it and publishes **only the finished pages** |
| [`changelog-astro-public`](https://github.com/psychedelicsinrecovery/changelog-astro-public) (public) | The built AstroLog you're reading | GitHub Pages, from what the workflow pushes |
| `alex-desk` (private) | A.L.E.X. itself, and `site/build.py`, which builds A.L.E.X.'s pages **and** writes the four desk portals | A workflow builds `site/dist` and publishes it to [`alex-desk-public`](https://github.com/psychedelicsinrecovery/alex-desk-public), which also serves the shared design system (`alex.css`, `alex.js`) |
| `litcom-desk`, `techcom-desk`, `github-desk`, `pr-desk` (private) | Each committee's helpdesk: tickets stay private; only `portal/` is public | A workflow copies `portal/` (plus the license, roadmap and sustainability files) to `<desk>-public` |
| `catalyst-desk` (private) | The C.A.T.A.L.Y.S.T. chalkboard | A workflow copies `site/` to [`catalyst-desk-public`](https://github.com/psychedelicsinrecovery/catalyst-desk-public) |

## 🛠️ What can quietly stop, and what to do

### 🔑 The publishing tokens (`PUBLIC_REPO_TOKEN`)
Each private repository above keeps a classic personal access token as the secret
`PUBLIC_REPO_TOKEN`, and uses it to push into its public twin. When it expires, **that site stops
updating with no sign on the site itself**; the desks' workflows skip quietly with a notice.
*What to do:* renew before the expiry date (scopes `repo` + `workflow`), update the secret in every
repository that uses it, and run each workflow once by hand.

### 🔒 The ledger's private lane (`LEDGER_TOKEN`, optional)
The [ledger](https://psychedelicsinrecovery.github.io/changelog-astro-public/ledger) shows PIR's
private work masked. The build reads the opted-in private repositories with a `LEDGER_TOKEN` secret
when there is one (read-only "Contents" on those repositories), else `PUBLIC_REPO_TOKEN`; any it
can't read are carried, masked, from the committed snapshot. *What to do:* add a fine-grained
`LEDGER_TOKEN` to keep those rows live; refresh the snapshot with
`LEDGER_TOKEN=$(gh auth token) npm run ledger:snapshot` in `astro/`.

### 🗓️ The daily ledger rebuild
The publish workflow also runs every morning (`cron: "23 10 * * *"`, UTC), so the ledger is never
more than a day behind, and checks that no private subject leaks into the build. *What to do:* if
the ledger's newest day looks old, read the workflow's run history.

### 🪞 The hourly README mirror
The hub's `README.md` copies the organization profile (`psychedelicsinrecovery/.github`) every hour.
GitHub switches off scheduled workflows in a public repository after 60 days without activity.
*What to do:* edit the profile, never the copy; re-enable the workflow if it stops.

### 🧰 The arrival kit is shared, and vendored
`arrival.js` + `arrival.css` on the hub are copies of `drasticstatic/my-template` →
`changelog-template/arrival/`; `org.js` + `org.css` are PIR's own. The AstroLog and every desk portal
load them from the hub by full URL. *What to do:* upgrade by copying the two kit files unchanged;
push the hub **before** the AstroLog, and the AstroLog before rebuilding the desks.

### 🎨 Three stylesheets, one header
`alex.css` (the design system, from `alex-desk-public`) and this site's `astrolog.css` were written
before the kit's navbar. The hub's `arrival/org.css` keeps their old `.top nav a` rules and alex.css's
bare `section` padding out of the kit's navbar, footer, windows and map. *What to do:* if a header
or footer looks off after a design-system change, check the "PIR's header" block in `org.css` first.

### 🏭 The desk portals are generated
The LitCom, TechCom, GitHub and PR portals (`<desk>/portal/index.html`, `README.md`, `404.html`) are
written by `alex-desk/site/build.py --desks ..`, the same code that builds A.L.E.X.'s pages. Each
desk's share image (`portal/social-card.jpg`) is the card this AstroLog builds at
`/og/page/<desk>.jpg` (words in `astro/src/og/pages.ts`), copied in. *What to do:* change a desk's
page in `build.py`, run `python3 site/build.py --desks ..` from `alex-desk`, and commit each desk's
`portal/` in its own repository. Hand edits to a desk's `portal/index.html` are overwritten.

### 🖼️ Cached link previews
Discord, WhatsApp, iMessage, Telegram and LinkedIn keep their own copy of a link's preview for days
or weeks. No card carries a count, so none goes stale on its own. *What to do:* after a card
changes, refresh the important links; `psychedelicsinrecovery/.github` → `SOCIAL-PREVIEWS.md` lists
every page with a tailored card and how to refresh each app (Telegram: send the link to @WebpageBot).

### 👛 Wallet giving, later
The crypto slot on [`/donate/`](https://psychedelicsinrecovery.github.io/donate/) is empty on
purpose. *What to do:* when the wallet module (Reown AppKit, Web3Auth for email sign-in) is switched
on, add `https://psychedelicsinrecovery.github.io` to both domain allowlists, with a real client ID.
Never put a wallet address in `org.js`.

### 🔗 Links that leave GitHub
The nav, the contact and community windows and the map point at psychedelicsinrecovery.org (its
contact form, 7th Tradition and WhatsApp pages), the service site's contact form, CONTACTS.md and
the Discord invite. *What to do:* if one of those addresses changes, update the hub's
`arrival/org.js` (one place) and this AstroLog's `astro/src/data/map.ts`.

### 📦 Dependencies
Astro, Satori and sharp are pinned in `astro/package-lock.json`. *What to do:* upgrade on purpose,
build locally, and check a few share cards before pushing.

## 🙋 Who looks after it
Christopher W, with Alfred (Claude Code). Questions or corrections: open a `/techcom` ticket in
PIR's Discord. *Last reviewed 2026-10-13.*
