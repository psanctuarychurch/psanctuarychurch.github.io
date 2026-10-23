# 🌱 Sustainability: what keeps this portal running

> The full, current version, covering this portal and the AstroLog together, is a page:
> **[psanctuarychurch.github.io/changelog-astro-public/sustainability](https://psanctuarychurch.github.io/changelog-astro-public/sustainability)**.
> This file lists what applies to **this repository**, so it's here even when you're reading the code.

Nothing here costs money. What it takes is a few things that quietly expire or drift, written down
so none of it depends on anyone's memory.

## What this repository is

`psanctuarychurch.github.io` is the entry portal (`/`, `/donate/`, `/pledge/`, `/map/`, the 404) and
the home of the **arrival kit** (1.4.0) every Psanctuary Church page loads: `arrival/arrival.js`,
`arrival/arrival.css`, `arrival/give/give.js` and `arrival/pledge/pledge.js` (the kit),
`arrival/org.js` + `arrival/org.css` (the church's own settings and look) and `arrival/sporefield.js`.
The AstroLog loads those files from here by full URL.

## What needs looking after

| What | Why it matters | What to do |
| --- | --- | --- |
| **The hourly README mirror** (`.github/workflows/mirror-profile-readme.yml`) | Copies the organization profile (`psanctuarychurch/.github` → `profile/README.md`) into this repo's `README.md` every hour. In a public repository, GitHub switches off scheduled workflows after 60 days without activity. | If the README stops following the profile, open **Actions → Mirror org profile README** and re-enable or run it. Edit the profile, never this `README.md`. |
| **The arrival kit is vendored** | `arrival.js`, `arrival.css`, `give/give.js` and `pledge/pledge.js` are copies. The canonical copy lives in `drasticstatic/my-template` (`changelog-template/arrival/`), and every org keeps its own copy so one org's change can't break another's. | To upgrade, copy all four from the template unchanged, check the porting notes in its README, and push this repo **before** the AstroLog. Never edit them here: the church's look and words belong in `org.js` and `org.css`. |
| **Deploy order** | The AstroLog loads the kit from this site. A new `org.js` key the AstroLog relies on must be live here first. | Push here, wait a minute for Pages, then push the AstroLog. |
| **Share images** (`social-card.jpg`, and the cards the AstroLog builds for `/donate/`, `/pledge/` and `/map/`) | Telegram, iMessage, Slack, Discord and LinkedIn keep their own copy of a link's preview. Cards never carry counts, so a cached one doesn't go stale on its own. | After changing a share image, refresh the cached previews: the steps for each app are in [`SOCIAL-PREVIEWS.md`](https://github.com/psanctuarychurch/.github/blob/main/SOCIAL-PREVIEWS.md) (for Telegram, send each link to @WebpageBot). |
| **The contribution ledger** (`donate/contributors.json`) | It names people. | Add someone only after they've said yes. First name and last initial; never an email or an amount. |
| **The giving link** | `/donate/` links to `psanctuary.org/donate`, which the church's site forwards to its checkout. | If the church changes how it takes gifts, update `donate.give` in `arrival/org.js`. |
| **Receipts and taxes** (`donate.tax` in `arrival/org.js`) | `/donate/` quotes the church's own words and links them: its [legal notice](https://www.psanctuary.org/legal-notice) ("a lawfully incorporated 508(c)(1)(a) Faith Based Organization") and its [donation page](https://ministries.psanctuary.org/donate) (tax deductible, and its CPA line). Receipts on request at info@psanctuary.org. | If either page changes its wording, change the quote to match, word for word; never restate it as more. If the church stops saying it, remove the line. |
| **Wallet giving and the pledge** (`arrival/give/give.js`, `arrival/pledge/pledge.js`) | `/donate/` has the kit's wallet module: one Connect button (Reown AppKit) for browser wallets, phone wallets by QR code, and email or social sign-in. `/pledge/` uses the same connection to sign a pledge of support (a message: free, nothing sent, nothing recorded, no counts). Both work only on sites listed in the Reown project's allowlist (this origin is on it, checked 2026-10-22). | `give.addresses` stays `null` until the church designates a treasury address: never a placeholder. No count ever goes on the pledge page. |
| **Wallet connect (Reown project)** | Every org's wallet features connect through **one shared Reown project today** (`00b6a1cd528ff580f1fd845ed08b0187`, made for the O-R-G dApp, held in Christopher W's Reown account). If it's deleted, suspended or runs past its free plan, wallet connect stops on every site at once (calmly; nothing breaks). | The church gets its own with a **one-line `org.js` change**: a free project at dashboard.reown.com under an account the church controls, this origin on its allowlist, and its ID in `give.reownProjectId` (the pledge uses it too). Before any treasury address is published. |
| **Licenses** (`LICENSE`, `LICENSE-CONTENT`, `TRADEMARKS.md`) | Code is MIT, words are CC BY-SA 4.0, and the Psanctuary name and marks belong to the church; the footer note says so on every page. | Keep the three files identical across this repository, the organization's `.github` and the AstroLog. |
| **Links that leave GitHub** | The nav, the contact and community windows and the map point at psanctuary.org (its contact page and legal notice), ministries.psanctuary.org/donate, the member network on Mighty Networks (one link, for joining and signing in) and [`CONTACTS.md`](https://github.com/psanctuarychurch/.github/blob/main/CONTACTS.md). | If one of those addresses changes, update `arrival/org.js` (one place), `CONTACTS.md` and the AstroLog's map. |

## 🤝 Stewardship and succession

Today drasticstatic (Christopher W) owns or administers the church's GitHub organization, and holds
the token that publishes the AstroLog and the Reown account above: a single point of failure. The
plan, so these pages outlive any one person: at least two owners from the church's own people,
publishing through org-owned automation instead of personal tokens, a token register and renewal
runbook, written hand-over steps, and scheduled exports and backups. The full plan is on the
[sustainability page](https://psanctuarychurch.github.io/changelog-astro-public/sustainability#-stewardship-and-succession),
and progress on the [roadmap](https://psanctuarychurch.github.io/changelog-astro-public/roadmap).

*Maintained by Christopher W with Alfred (Claude Code). Last reviewed 2026-10-22.*
