# 🌱 Sustainability: what keeps these pages running

<div class="tldr"><i class="ph ph-plant"></i> <span><strong>TL;DR:</strong> PIR®'s GitHub pages cost nothing to host. What keeps them alive is a short list of things that quietly expire or drift: the publishing tokens, the scheduled jobs, a shared kit, one generator for the desk portals, cached link previews and a shared wallet-connect project. Each is written down here, so none of it depends on anyone's memory. And today one person holds most of the keys, so there's a plan to change that.</span></div>

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
| `alex-desk` (private) | A.L.E.X. itself, and `site/build.py`, which builds A.L.E.X.'s pages, writes the four generated desk portals, and refreshes the navbar and footer of the two hand-built ones | A workflow builds `site/dist` and publishes it to [`alex-desk-public`](https://github.com/psychedelicsinrecovery/alex-desk-public), which also serves the shared design system (`alex.css`, `alex.js`) |
| `litcom-desk`, `techcom-desk`, `github-desk`, `pr-desk` (private) | Each committee's helpdesk: tickets stay private; only `portal/` is public | A workflow copies `portal/` (plus the license, roadmap and sustainability files) to `<desk>-public` |
| [`gsr-desk-public`](https://github.com/psychedelicsinrecovery/gsr-desk-public), [`board-desk-public`](https://github.com/psychedelicsinrecovery/board-desk-public) (public) | The GSR Desk and BoardDesk: hand-built pages with no private source | GitHub Pages, straight from `main` |
| `catalyst-desk` (private) | The C.A.T.A.L.Y.S.T. chalkboard | A workflow copies `site/` to [`catalyst-desk-public`](https://github.com/psychedelicsinrecovery/catalyst-desk-public), **once it has a publishing token** (it has none today, so the public page lags its source) |

## 🛠️ What can quietly stop, and what to do

### 🔑 The publishing tokens (`PUBLIC_REPO_TOKEN`)
Each private repository above keeps a classic personal access token as the secret
`PUBLIC_REPO_TOKEN`, and uses it to push into its public twin. When it expires, **that site stops
updating with no sign on the site itself**; the desks' workflows skip quietly with a notice.
*What to do:* renew before the expiry date (scopes `repo` + `workflow`), update the secret in every
repository that uses it, and run each workflow once by hand.
- **`catalyst-desk` and `board-of-directors` since 2026-10-26:** their own fine-grained
  `public-sync-desks`. It reaches only `catalyst-desk-public` and `board-of-directors-public`, with
  Contents + Workflows read/write, and has **no expiration**.
- **The Board's proposal collector** reads committee proposals with a separate read-only
  `COMMITTEE_READ_TOKEN` (`committee-read`, no expiration). Both are written up in each repository's
  own SUSTAINABILITY.md.

### 🔒 The ledger's private lane (`LEDGER_TOKEN`)
The [ledger](https://psychedelicsinrecovery.github.io/changelog-astro-public/ledger) shows PIR's
private work masked. The build reads the opted-in private repositories with a `LEDGER_TOKEN` secret
when there is one (read-only "Contents" on those repositories), else `PUBLIC_REPO_TOKEN`; any it
can't read are carried, masked, from the committed snapshot.
- **Set since 2026-10-26:** the fine-grained `ledger-read-pir`, owned by `psychedelicsinrecovery`,
  reaching all its repositories with Contents read-only, and with **no expiration**.
- *To replace it:* make a new read-only token the same way, set it as `LEDGER_TOKEN` on
  `changelog-astro`, and run the publish workflow once. Refresh the snapshot with
  `LEDGER_TOKEN=$(gh auth token) npm run ledger:snapshot` in `astro/`.

### 🗓️ The daily ledger rebuild
The publish workflow also runs every morning (`cron: "23 10 * * *"`, UTC), so the ledger is never
more than a day behind, and checks that no private subject leaks into the build. *What to do:* if
the ledger's newest day looks old, read the workflow's run history. The workflow builds on **Node 24**
(since 2026-10-26): Astro 7.4 needs Node 22.23.4 or newer, and a bare `22` resolved to 22.23.3.

### 🪞 The hourly README mirror
The hub's `README.md` copies the organization profile (`psychedelicsinrecovery/.github`) every hour.
GitHub switches off scheduled workflows in a public repository after 60 days without activity.
*What to do:* edit the profile, never the copy; re-enable the workflow if it stops.

### 🧰 The arrival kit is shared, and vendored
`arrival.js`, `arrival.css`, `give/give.js` and `pledge/pledge.js` on the hub are copies of kit 1.4.0
from `drasticstatic/my-template` → `changelog-template/arrival/`, **unchanged**; `org.js` + `org.css`
are PIR's own. The AstroLog and every desk portal load them from the hub by full URL. Until
2026-10-22 PIR ran a local fork ("1.3.1", with `concierge.js` renaming and re-sorting the nav at
runtime); that's config in `org.js` now (the Foyers and Helpers dropdowns in groups). *What to do:*
upgrade by copying the four kit files unchanged (`cmp` first: a mismatch is a fork, not a stale
copy); push the hub **before** the AstroLog, and the AstroLog before rebuilding the desks. The pledge
pins its signature checker (`@noble/curves@1.9.7`, `@noble/hashes@1.8.0`): upgrade those in the kit.

### 🎨 Three stylesheets, one header
`alex.css` (the design system, from `alex-desk-public`) and this site's `astrolog.css` were written
before the kit's navbar. The hub's `arrival/org.css` keeps their old `.top nav a` rules and alex.css's
bare `section` padding out of the kit's navbar, footer, windows and map. *What to do:* if a header
or footer looks off after a design-system change, check the "PIR's header" block in `org.css` first.

### 🏭 The desk portals are generated
The LitCom, TechCom, GitHub and PR portals (`<desk>/portal/index.html`, `README.md`, `404.html`) are
written by `alex-desk/site/build.py --desks ..`, the same code that builds A.L.E.X.'s pages. The GSR
Desk and BoardDesk are hand-built (their public repositories are the pages), but the same run
rewrites the block between `<!-- kit:begin -->` and `<!-- kit:end -->` in each, so every desk has the
same navbar and footer. Each desk's share image (`social-card.jpg`) is the card this AstroLog builds
at `/og/page/<desk>.jpg` (words in `astro/src/og/pages.ts`), copied in. *What to do:* change a desk's
page in `build.py`, run `python3 site/build.py --desks ..` from `alex-desk` (with every desk repo
cloned beside it), and commit each desk's changes in its own repository. Hand edits to a generated
`portal/index.html`, or inside a hand-built desk's kit block, are overwritten.

### 🖼️ Cached link previews
Discord, WhatsApp, iMessage, Telegram and LinkedIn keep their own copy of a link's preview for days
or weeks. No card carries a count, so none goes stale on its own. *What to do:* after a card
changes, refresh the important links; `psychedelicsinrecovery/.github` → `SOCIAL-PREVIEWS.md` lists
every page with a tailored card and how to refresh each app (Telegram: send the link to @WebpageBot).

### 👛 Wallet giving stays off; the pledge has no money in it
The crypto slot on [`/donate/`](https://psychedelicsinrecovery.github.io/donate/) is empty on
purpose (`give: { enabled: false }`): PIR® declines outside contributions under its traditions. The
[gratitude pledge](https://psychedelicsinrecovery.github.io/pledge/) is a thank-you signed with a
wallet: an EIP-191 message, no gas, no money, nothing sent or recorded, and no counts. Its wording
(`pledge` in the hub's `arrival/org.js`) is a first draft for the trusted servants to refine. *What
to do:* never put a wallet address in `org.js`; change the pledge's words only with the fellowship's
agreement.

### 🔌 Wallet connect (the Reown project)
The pledge connects wallets through **one shared Reown project: `00b6a1cd528ff580f1fd845ed08b0187`**,
made for the O-R-G dApp, held in Christopher W's Reown account and used by every org's pages. Its
allowlist includes `https://psychedelicsinrecovery.github.io`. If that project is deleted, suspended or
runs past its free-plan limit, wallet connect stops on every site at once (each page then says so
calmly; nothing breaks). *What to do:* PIR can have its own project with a **one-line `org.js`
change**: create a free project at dashboard.reown.com under an account PIR controls, add
`https://psychedelicsinrecovery.github.io` to its allowlist, and set `pledge.reownProjectId` in the
hub's `arrival/org.js` (and `give.reownProjectId`, if giving is ever switched on).

### 💡 Proposals live beside the changelog
[`/proposals`](https://psychedelicsinrecovery.github.io/changelog-astro-public/proposals) is built from
`proposals/*.md` at this repository's root, a sibling of `changelog/` and `library/`, classified as
private in `sync-public.yml` so only the built pages are published. *What to do:* a new root folder
or file must be added to `public_allowlist` or `private_allowlist` there, or the publish fails on
purpose. A proposal stays `status: "proposal"` until the people who decide have decided.

### 🔗 Links that leave GitHub
The nav, the contact and community windows and the map point at psychedelicsinrecovery.org (its
contact form, 7th Tradition and WhatsApp pages), the service site's contact form, CONTACTS.md and
the Discord invite. *What to do:* if one of those addresses changes, update the hub's
`arrival/org.js` (one place) and this AstroLog's `astro/src/data/map.ts`.

### 📦 Dependencies
Astro, Satori and sharp are pinned in `astro/package-lock.json`. *What to do:* upgrade on purpose,
build locally, and check a few share cards before pushing.

## 🤝 Stewardship and succession

**Today, one person holds most of the keys.** drasticstatic (Christopher W) owns and administers PIR®'s
GitHub organization, holds the personal access tokens that publish these pages (`PUBLIC_REPO_TOKEN` and
its siblings on each private repository) and the Reown account above. That's a single point of
failure: if he stepped away, tokens would expire on schedule and the sites would quietly stop
updating, with nobody else able to renew them. (One already shows it: `catalyst-desk` has no token,
so its public page waits.) The plan, so these pages outlive any one person:

1. **At least two owners of the GitHub organization**, from PIR's own trusted servants, each with
   two-factor sign-in. Owners can do everything; give everyone else the narrowest role that works.
2. **Org-owned automation, not personal tokens.** Publishing moves to a GitHub App installed on the
   organization (short-lived tokens, scoped to the repositories it needs), or failing that a dedicated
   org bot account whose credentials the owners share. No workflow should depend on one person's account.
3. **A token register**: every token, key and secret the sites use, with what it does, which secret
   holds it, who owns it, its scopes and its expiry date, kept where every owner can read it (never
   the values themselves).
4. **A renewal runbook**: for each item in the register, how to renew it, step by step, and a reminder
   a month before each expiry date.
5. **Documented hand-over steps**: how to add an owner, transfer a repository, move the custom domains,
   transfer the Reown project (or create PIR's own), and remove someone who's leaving.
6. **Exports and backups**: the repositories (with their issues and history, the helpdesks' tickets
   included) cloned or exported somewhere PIR controls, on a schedule; the same for anything outside
   GitHub (forms, Discord, mailing lists). The domain and DNS have a proposal of their own:
   [SiteGround auto-renewal safeguards](https://psychedelicsinrecovery.github.io/changelog-astro-public/proposals/2026-10-22-siteground-auto-renewal-safeguards).

Progress on each step is on the [roadmap](https://psychedelicsinrecovery.github.io/changelog-astro-public/roadmap).

## 🙋 Who looks after it
Christopher W, with Alfred (Claude Code). Questions or corrections: open a `/techcom` ticket in
PIR's Discord. *Last reviewed 2026-10-22.*
