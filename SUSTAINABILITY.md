# 🌱 Sustainability: what keeps this portal running

> The full, current version, covering this portal and the AstroLog together, is a page:
> **[psanctuarychurch.github.io/changelog-astro-public/sustainability](https://psanctuarychurch.github.io/changelog-astro-public/sustainability)**.
> This file lists what applies to **this repository**, so it's here even when you're reading the code.

Nothing here costs money. What it takes is a few things that quietly expire or drift, written down
so none of it depends on anyone's memory.

## What this repository is

`psanctuarychurch.github.io` is the entry portal (`/`, `/donate/`, `/map/`, the 404) and the home of the
**arrival kit** every Psanctuary Church page loads: `arrival/arrival.js` + `arrival/arrival.css` (the kit),
`arrival/org.js` + `arrival/org.css` (the church's own settings and look) and `arrival/sporefield.js`.
The AstroLog loads those files from here by full URL.

## What needs looking after

| What | Why it matters | What to do |
| --- | --- | --- |
| **The hourly README mirror** (`.github/workflows/mirror-profile-readme.yml`) | Copies the organization profile (`psanctuarychurch/.github` → `profile/README.md`) into this repo's `README.md` every hour. In a public repository, GitHub switches off scheduled workflows after 60 days without activity. | If the README stops following the profile, open **Actions → Mirror org profile README** and re-enable or run it. Edit the profile, never this `README.md`. |
| **The arrival kit is vendored** | `arrival.js` and `arrival.css` are copies. The canonical copy lives in `drasticstatic/my-template` (`changelog-template/arrival/`), and every org keeps its own copy so one org's change can't break another's. | To upgrade, copy both files from the template unchanged, check the porting notes in its README, and push this repo **before** the AstroLog. |
| **Deploy order** | The AstroLog loads the kit from this site. A new `org.js` key the AstroLog relies on must be live here first. | Push here, wait a minute for Pages, then push the AstroLog. |
| **Share images** (`social-card.jpg`, and the cards the AstroLog builds for `/donate/` and `/map/`) | Telegram, iMessage, Slack, Discord and LinkedIn keep their own copy of a link's preview. | After changing a share image, refresh the cached previews (for Telegram, send each link to @WebpageBot). |
| **The contribution ledger** (`donate/contributors.json`) | It names people. | Add someone only after they've said yes. First name and last initial; never an email or an amount. |
| **The giving link** | `/donate/` links to `psanctuary.org/donate`, which the church's site forwards to its checkout. | If the church changes how it takes gifts, update `donate.give` in `arrival/org.js`. |
| **Wallet giving, later** | The crypto slot on `/donate/` is empty on purpose. A wallet-connect module (Reown AppKit, with Web3Auth for email sign-in) will fill it. | Its project allowlist must include `https://psanctuarychurch.github.io`, or the button won't load here. |
| **Links that leave GitHub** | The nav, the contact and community modals and the map point at psanctuary.org and the member network. | If one of those addresses changes, update `arrival/org.js` (one place) and the AstroLog's map. |

*Maintained by Christopher W with Alfred (Claude Code). Last reviewed 2026-10-13.*
