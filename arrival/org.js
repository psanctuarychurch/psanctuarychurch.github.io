/* Psanctuary Church's arrival config, read by arrival.js (kit v1.5). Shared by every Psanctuary
   Church page: the entry portal (/, /donate/, /pledge/, /map/, the 404) and, by absolute URL, the
   AstroLog.

   psanctuarychurch is the church's professional face on GitHub; its sibling, psanctuary, is the
   decentralized, playful side. Every fact here comes from psanctuary.org's own public pages (home,
   About, Contact, Community Tools, Membership, Donate). Anything not decided yet is marked as a
   placeholder or "coming soon" rather than guessed, and no link is ever made up. People are named by
   first name and last initial. Strings shown in the guide and the modals may hold simple HTML. */
(function () {
  var ROOT = "https://psanctuarychurch.github.io";
  var LOG = ROOT + "/changelog-astro-public";
  var READING = ROOT + "/reading-room-public/";   // the reading room's public page: proposals, procedures & decks
  var SITE = "https://www.psanctuary.org";
  var SIBLING = "https://psanctuary.github.io";
  // The church's member network on Mighty Networks: its front page, and the plans to join.
  var MIGHTY = "https://psanctuary-member-community.mn.co/";
  // Every way to reach the church, on GitHub (psanctuarychurch/.github).
  var CONTACTS = "https://github.com/psanctuarychurch/.github/blob/main/CONTACTS.md";
  // The church's own words about its standing and about giving, quoted on /donate/ (receipts and
  // taxes): the legal notice on psanctuary.org, and the donation page on its ministries site.
  var LEGAL = SITE + "/legal-notice";
  var MINISTRIES_DONATE = "https://ministries.psanctuary.org/donate";
  // Keeps fonts with contextual alternates from turning "(c)" into a copyright sign.
  var C508 = '<span style="font-variant-ligatures: none; font-feature-settings: \'calt\' 0, \'liga\' 0, \'dlig\' 0">508(c)(1)(a)</span>';
  // Spore violets and golden caps. They color the guide's cap (one gill per step) and the initials
  // avatars of anyone without a GitHub picture.
  var GILLS = ["#a88bc9", "#e2b45a", "#8c70b0", "#d49a3a", "#c2a9e0", "#f0cf8a", "#6a4c8c", "#b8873a"];

  // An initials avatar in the family's shape: a tiny spore print (gills, dust, a stem ring) with the
  // initials at its heart. System serif only: an <img> SVG can't load the page's web fonts.
  function sporeAvatar(ini, c1, c2, name) {
    // Someone named by one word gets one letter, not the first two of the name.
    var one = String(name || "").trim();
    if (one && !/\s/.test(one)) ini = one.charAt(0).toUpperCase();
    var g = "";
    for (var i = 0; i < 40; i++) {
      var a = (i / 40) * Math.PI * 2 + 0.05;
      var r1 = i % 4 === 0 ? 25 : i % 2 ? 36 : 31;
      g +=
        '<line x1="' + (50 + r1 * Math.cos(a)).toFixed(1) + '" y1="' + (50 + r1 * Math.sin(a)).toFixed(1) +
        '" x2="' + (50 + 47 * Math.cos(a)).toFixed(1) + '" y2="' + (50 + 47 * Math.sin(a)).toFixed(1) + '"/>';
    }
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      '<defs><radialGradient id="g" cx="50%" cy="50%" r="50%"><stop offset="0.3" stop-color="#1c1522"/>' +
      '<stop offset="0.75" stop-color="' + c2 + '"/><stop offset="1" stop-color="' + c1 + '"/></radialGradient></defs>' +
      '<circle cx="50" cy="50" r="50" fill="url(#g)"/>' +
      '<g stroke="#f6efe4" stroke-opacity=".34" stroke-width="1.2" stroke-linecap="round">' + g + "</g>" +
      '<circle cx="50" cy="50" r="22" fill="#16111a" fill-opacity=".72" stroke="' + c1 + '" stroke-width="2"/>' +
      '<text x="50" y="50" dy=".36em" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif" font-size="' +
      (ini.length > 1 ? 21 : 27) + '" fill="#f6efe4">' + ini + "</text></svg>"
    );
  }

  window.ARRIVAL = {
    org: {
      short: "Psanctuary Church",
      name: "On GitHub",
      motto: "Rooted in sincerity, cultivated by the mushroom.",
      about:
        "In psanctuary.org's own words, Psanctuary is “an inter-tradition church built on growing together with a sincere sacred mushroom practice rooted in spiritual autonomy.” This GitHub organization is the church's professional face on GitHub: its official home here, with an open record of everything built for it. The decentralized, playful side, where experiments in community-owned tools take shape, is its sibling, psanctuary.",
      // The family mark: a spore print with its stem ring, in this org's accent.
      mark: { src: ROOT + "/favicon.svg" },
      home: {
        label: "psanctuary.org",
        href: SITE,
        text: "The church's real home: Sunday service, membership, courses, ceremonies and events all live there. Everything here on GitHub is the quieter, technical side, kept out in the open.",
      },
      welcomeNote: null,
      welcomePlaceholder:
        "A few words of welcome from the church belong here, perhaps from its co-founders, Eric O, Courtney M and Athena. The space is left empty on purpose until they, or someone they ask, would like to write them.",
    },

    // The church's portal and AstroLog share one origin, so one key carries every choice between them.
    storage: { key: "psanctuarychurch-arrival" },

    modes: [
      { id: "spore", name: "Spore Print", note: "Violet-black, like the print a cap leaves on paper overnight, lit in gold.", swatch: ["#16111a", "#e2b45a"], dark: true },
      { id: "paper", name: "Print Paper", note: "The white card a print is taken on, inked in violet and gold.", swatch: ["#f3f1f4", "#8a5b10"], calm: true },
      { id: "candle", name: "Candlelight", note: "Amber and old gold, the sanctuary after dark, lit by candles.", swatch: ["#1a120d", "#f0c46a"], dark: true },
      {
        id: "day",
        name: "Follow the day",
        note: "Print paper by day, candlelight at dusk, spore print by night.",
        shows: ["paper", "candle", "spore"],
        ink: "repeating-conic-gradient(from 0deg at 50% 210%, transparent 0deg, rgba(22, 17, 26, 0.3) 0.8deg, transparent 1.6deg 3.4deg), linear-gradient(90deg, #f3f1f4 0 33.3%, #f0c46a 0 66.6%, #a88bc9 0)",
        follows: function (d) {
          var h = d.getHours();
          return h >= 7 && h < 17 ? "paper" : h >= 17 && h < 21 ? "candle" : "spore";
        },
      },
    ],
    defaultMode: "spore",

    // Reading mode: one tap for Print Paper, the spores at rest, more contrast, no mycelium threads
    // and a comfortable line length; text size steps sit beside it (kit 1.2).
    reading: { light: "paper" },

    // "What's new since your last visit": the AstroLog's latest.json lists its newest entries,
    // write-ups and ledger items (same origin for the portal and the AstroLog).
    news: { sources: [LOG + "/latest.json"] },

    // The spore field behind every page: spores drift up, and the pointer grows mycelium threads to
    // the ones nearby. Its cursor effects switch off on their own, and rest whenever motion is Still.
    motions: [
      { id: "still", name: "Still", icon: "pause", note: "The spores settle where they are, and nothing moves." },
      { id: "drift", name: "Drift", icon: "wind", note: "Spores drift upward. Your pointer grows mycelium threads to the ones nearby and leaves a little spore dust." },
      { id: "flush", name: "Flush", icon: "sparkle", note: "A flush: more spores, longer threads that reach further, and a brighter puff behind your pointer." },
    ],
    defaultMotion: "drift",
    stillMotion: "still",

    wedges: GILLS,

    // Gravatar only for an address at the church's own domain; otherwise GitHub, otherwise initials.
    avatar: { shape: "circle", roleDomains: ["psanctuary.org"], svg: sporeAvatar },

    // ── kit 1.2: the navbar, shared by the portal and the AstroLog ─────────────────────────────
    // Lower priority folds into "More" first when the bar runs short; below 1100px it all folds
    // into the Menu.
    nav: {
      label: "Psanctuary Church",
      fold: 1100,
      items: [
        { id: "portal", label: "Portal", icon: "house-simple", href: ROOT + "/", hideOn: ["portal"], priority: 1, note: "The church's front door on GitHub" },
        { id: "porch", label: "Porch", icon: "door-open", href: LOG + "/", exact: true, priority: 1, note: "The AstroLog's front door" },
        { id: "changelog", label: "Changelog", icon: "clock-counter-clockwise", href: LOG + "/changelog", priority: 3, note: "What changed, newest first" },
        { id: "library", label: "Library", icon: "books", href: LOG + "/library", priority: 2, note: "Longer write-ups on how it works" },
        { id: "ledger", label: "Ledger", icon: "scroll", href: LOG + "/ledger", priority: 2, note: "Every public change, in plain words" },
        { id: "map", label: "Map", icon: "map-trifold", href: LOG + "/map", hrefs: { portal: ROOT + "/map/" }, priority: 2, note: "Every place, with a picture of each" },
        {
          id: "involved",
          label: "Get involved",
          icon: "hand-heart",
          priority: 3,
          items: [
            { id: "community", label: "Community", icon: "users-three", href: MIGHTY, open: "community", note: "The member network, on Mighty Networks" },
            { id: "contact", label: "Reach out", icon: "envelope-simple", href: SITE + "/contact", open: "contact", note: "Every way to reach the church" },
            { id: "donate", label: "Donate", icon: "heart", href: ROOT + "/donate/", note: "Ways to give, and thanks by name" },
            { id: "pledge", label: "Pledge", icon: "handshake", href: ROOT + "/pledge/", note: "Sign a pledge of support: free, nothing sent" },
          ],
        },
        {
          id: "about",
          label: "About",
          icon: "info",
          priority: 1,
          items: [
            { id: "reading", label: "Proposals, procedures & decks", icon: "folder-open", href: READING, note: "The reading room: what anyone may read, and the way in for members" },
            { id: "roadmap", label: "Roadmap", icon: "path", href: LOG + "/roadmap", note: "Where these pages are headed" },
            { id: "sustainability", label: "Sustainability", icon: "plant", href: LOG + "/sustainability", note: "What it takes to keep them running" },
            { id: "home", label: "psanctuary.org", icon: "globe-simple", href: SITE, note: "The church's main site" },
            { id: "sibling", label: "psanctuary", icon: "tree-structure", href: SIBLING + "/", note: "The sibling org: the playful, decentralized side" },
            { id: "github", label: "GitHub", icon: "github-logo", href: "https://github.com/psanctuarychurch", note: "The organization and its code" },
          ],
        },
      ],
    },
    footer: {
      label: "Psanctuary Church, all the ways around",
      groups: [
        { label: "Explore", icon: "compass", items: ["portal", "porch", "changelog", "library", "ledger", "map", "reading"] },
        { label: "Get involved", icon: "hand-heart", items: ["community", "contact", "donate", "pledge", { id: "guide", label: "Welcome guide", icon: "signpost", href: "#welcome", open: "guide" }] },
        { label: "About this build", icon: "wrench", items: ["roadmap", "sustainability", "github", { id: "contacts", label: "CONTACTS.md", icon: "address-book", href: CONTACTS }, { id: "source", label: "AstroLog source", icon: "code", href: "https://github.com/psanctuarychurch/changelog-astro-public" }] },
        { label: "Psanctuary Church", icon: "plant", items: ["home", "sibling", { id: "youtube", label: "YouTube", icon: "youtube-logo", href: "https://www.youtube.com/@psanctuarychurch" }] },
      ],
      note: "Code here is MIT licensed and the words are CC BY-SA 4.0. The Psanctuary name and marks belong to the church.",
    },

    // ── kit 1.2: one modal for every way to reach the church ───────────────────────────────────
    contact: {
      title: "Reach out",
      intro: "Every way to reach the church. Pick whichever suits you; each one reaches the same team.",
      paths: [
        {
          kind: "form",
          label: "The contact form on psanctuary.org",
          href: SITE + "/contact",
          action: "Open the form",
          note: "In the church's own words: “To reach our team, please fill out the form below or e-mail info@psanctuary.org.”",
        },
        {
          kind: "email",
          label: "info@psanctuary.org",
          href: "mailto:info@psanctuary.org",
          note: "The church's public address, for questions about membership, Sunday service, ceremonies, courses, giving, or these pages.",
        },
        {
          kind: "github",
          label: "Every way in, on GitHub",
          href: CONTACTS,
          action: "Open CONTACTS.md",
          note: "The church's addresses, the member network and the channels psanctuary.org lists, in one page.",
        },
      ],
    },

    // ── where the community talks: the church's member network, one link (Christopher's decision,
    //    2026-10-22: the root and /plans/ show the same page to a visitor who isn't signed in, and
    //    both open the dashboard for a member who is), and a look ahead at a network of the
    //    community's own ────────────────────────────────────────────────────────────────────────
    community: {
      name: "the member community",
      icon: "users-three",
      label: "See every way in",
      title: "Where we gather",
      eyebrow: "Community",
      text: "The church's members gather in its member network on Mighty Networks: events, member-led clubs, courses and messages, on the web and in the Mighty app. It comes with membership.",
      intro: "The church's members gather in one place, its member network. One link does both: visitors see how to join, and members land on their dashboard.",
      platforms: [
        {
          id: "mighty",
          kind: "mighty",
          name: "Psanctuary Member Community",
          text: "The church's private member network: events, member-led clubs, courses and messages, on the web and in the Mighty app. It comes with membership.",
          // One door: the kit always draws a public slot too; org.css hides an empty one on a live card.
          join: { href: MIGHTY, label: "Join or sign in on Mighty Networks", note: "New here? You'll see how to join. Members land on their dashboard." },
        },
      ],
      bespoke: {
        title: "Looking ahead: a network of our own",
        tag: "Sneak peek",
        icon: "graph",
        text: "In time, the church hopes to offer its members a small social network of their own, owned by the community rather than by one company. The work begins on its sibling organization, psanctuary.",
        points: [
          "Profiles and posts on open protocols like Lens and Farcaster, so what members share stays theirs.",
          "Paired with a DAO, where members can propose ideas and decide together.",
          "Privacy first: members choose what's public and what stays among members.",
        ],
        note: "No dates, and nothing to sign up for yet. This is a direction, not a promise.",
      },
      more: ['Sunday service is open to everyone, online. <a href="' + SITE + '/community-tools">psanctuary.org/community-tools</a> explains the member network, and <a href="' + SITE + '/membership">psanctuary.org/membership</a> lists the plans.'],
    },

    // ── kit 1.2: the donate page (/donate/) ────────────────────────────────────────────────────
    // Give with crypto (kit v1.3, arrival/give/give.js): one Connect button in the donate page's crypto
    // slot. The Reown project (a public client ID, shared by the fleet's portals for now) must list
    // https://psanctuarychurch.github.io in its allowlist at dashboard.reown.com; until it does, the page
    // calmly says wallet connect isn't switched on for this site yet. No treasury address yet, so every
    // coin reads "Treasury address coming soon" and connecting is a labelled preview. Never put a
    // placeholder or example address here: the page would show it. note: the org's own words, if any.
    give: {
      reownProjectId: "00b6a1cd528ff580f1fd845ed08b0187",
      chains: ["mainnet"],
      addresses: { eth: null, btc: null, sol: null },
      note: "",
    },

    donate: {
      give: [
        {
          label: "Give through psanctuary.org",
          icon: "heart",
          href: SITE + "/donate",
          action: "Give on psanctuary.org",
          note: "The church's own giving page. In psanctuary.org's words: “Your donation supports the right to spiritual connection through entheogens and supports a growing community preserving and sharing practices with sacred mushrooms.”",
        },
      ],
      disclaimer: {
        title: "Please note",
        text: "Gifts are made on psanctuary.org, through the church's own checkout. This GitHub page doesn't take payments and never sees payment details. Questions about giving go to <a href=\"mailto:info@psanctuary.org\">info@psanctuary.org</a>.",
      },
      ledger: {
        src: ROOT + "/donate/contributors.json",
        title: "Contribution ledger",
        intro: "People and organizations who have given time, skills or gifts to the church's GitHub home, and agreed to be thanked by name here.",
      },
      crypto: {
        text: "Giving from a crypto wallet is planned for this page: one button for browser wallets, phone wallets and email sign-in. It isn't open yet.",
      },
      // kit 1.4: "Receipts and taxes", in the church's own words only, quoted and linked, never
      // restated as more (checked 2026-10-22, also in the private crawl archive): the legal notice's
      // own summary ("Psanctuary Church is a lawfully incorporated 508(c)(1)(a) Faith Based
      // Organization operating."; its body says "As a 508 organization") and the donation page on
      // ministries.psanctuary.org, with its own CPA line. The kit adds "This isn't tax advice."
      tax: {
        status: 'The church\'s own <a href="' + LEGAL + '">legal notice</a> describes Psanctuary Church as “a lawfully incorporated ' + C508 + ' Faith Based Organization”.',
        deductible: 'The church\'s <a href="' + MINISTRIES_DONATE + '">donation page</a> says: “All donations to Psanctuary (as a ' + C508 + ') are tax deductible.” It adds: “Please consult and confirm with your CPA regarding all tax related benefits for you personally.”',
        receipts: 'Ask the church for a receipt: email <a href="mailto:info@psanctuary.org" data-arr-direct>info@psanctuary.org</a> with the date and amount of your gift.',
      },
    },

    // ── kit 1.4: the dock (.universal-footer .footer-inner, the kit's default) shows a fade and a
    //    chevron on the side with more, so a phone visitor can tell it scrolls. ──────────────────
    dock: { scroll: true },

    // ── kit 1.4: a pledge of support, on its own page (/pledge/). A visitor signs it with a wallet:
    //    a message, not a transaction, so it's free, sends nothing and records nothing, and there are
    //    no counts. Same wallet connection as /donate/ (give.reownProjectId). The words are the
    //    church's own, from psanctuary.org (an inter-tradition church, a sincere sacred mushroom
    //    practice, spiritual autonomy, peer support, communal care). ─────────────────────────────
    pledge: {
      href: ROOT + "/pledge/",
      text: "I support Psanctuary Church: an inter-tradition church growing together around a sincere sacred mushroom practice, rooted in spiritual autonomy, peer support and communal care.",
      intro: "Three steps: read the pledge, connect a wallet, and sign. No gas and no money, and for now nothing is recorded. A pledge isn't membership; <a href=\"" + SITE + "/membership\">membership</a> is its own step, on psanctuary.org.",
      note: 'A pledge isn\'t a gift and asks nothing more of you. To give as well, see <a href="' + ROOT + '/donate/">the ways to give</a>.',
    },

    record: {
      intro: "The Psanctuary Church AstroLog has two halves.",
      share:
        "Sharing one change? Every entry and every write-up has its own preview card, framed in gold with a spore print of its own, the title and the summary. Paste its link into Telegram, iMessage or Discord and it arrives with that card. The <strong>Copy a link</strong> button under each one does the copying.",
      changelog: {
        name: "The changelog",
        text: "Every notable change to Psanctuary Church's GitHub home, newest first. Each entry opens with a one-line summary, with the full story folded underneath, and credits whoever did the work.",
        href: LOG + "/changelog",
        label: "Read the changelog",
      },
      library: {
        name: "The library",
        text: "Longer write-ups on how things are built and why. The changelog says what changed; the library explains how it works.",
        href: LOG + "/library",
        label: "Open the library",
      },
      ledger: {
        name: "The ledger",
        text: "Every public change to Psanctuary Church's code on GitHub, in plain words: grouped by day and by kind, credited by name, and linked to the change itself. For anyone who'd rather not open GitHub. It refreshes every day.",
        href: LOG + "/ledger",
        label: "Open the ledger",
      },
    },

    sites: {
      portal: {
        name: "Psanctuary Church on GitHub",
        what: "This is Psanctuary Church's official home on GitHub: the church's technical work, kept in order and out in the open, and the way into the AstroLog, where every change is written down.",
      },
      astrolog: {
        name: "the Psanctuary Church AstroLog",
        what: "The AstroLog is Psanctuary Church's plain-language record of what changed on GitHub, who made each change, and how the pieces fit together.",
      },
    },

    guide: {
      light: {
        text: "Every Psanctuary Church page takes its colors from a spore print: violet-black, the paper it's taken on, and the candlelit gold of a sanctuary after dark. Pick one, and it follows you from page to page.",
      },
      motion: {
        text: "Behind each page, spores drift upward. Move your pointer and mycelium threads reach out to the spores nearby, the way a mushroom's network grows underground. Choose how much moves, how large the text is, and whether you'd like more contrast for reading.",
      },
      people: {
        text: "Every entry credits whoever did the work, by first name and last initial. Eric O and Alana are here early, so you can see how the record will look as more of the community takes part.",
        fine: "Pictures come from public GitHub profiles. Anyone without one linked gets a small spore print with their initials.",
      },
    },
    guideFinale: "You've lit every gill of the print. Welcome to Psanctuary Church.",

    words: {
      enter: "Enter Psanctuary Church",
      cursorNote: "Mycelium threads that reach from your pointer to nearby spores, and a little spore dust as you move. Switch them off if you'd rather not.",
      readingNote: "One tap for the calmest page: Print Paper, the spores at rest, more contrast, shorter lines, and no mycelium threads. Tap again to go back to how you had it.",
      pause: "Let the spores settle",
      play: "Let the spores drift",
      searchTip: "Anywhere on Psanctuary Church's pages, any time: every change, write-up, person and page, including the AstroLog from the entry portal.",
    },

    search: {
      sources: [{ url: LOG + "/search.json" }],
      items: [
        { t: "Psanctuary Church entry portal", k: "page", i: "house", h: ROOT + "/", pin: true, x: "home github io root portal" },
        { t: "psanctuary.org", k: "the church", i: "globe-simple", h: SITE, pin: true, x: "website main home church" },
        { t: "The ledger: every public change", k: "AstroLog", i: "scroll", h: LOG + "/ledger", pin: true, x: "commits github history code record plain words" },
        { t: "Map: every place, with pictures", k: "page", i: "map-trifold", h: LOG + "/map", pin: true, x: "sitemap where everything links overview thumbnails" },
        { t: "Donate", k: "page", i: "heart", h: ROOT + "/donate/", x: "give gift support money contribution ledger thanks crypto receipt tax deductible 508" },
        { t: "A pledge of support", k: "page", i: "handshake", h: ROOT + "/pledge/", x: "pledge sign wallet support signature verify" },
        { t: "Join or sign in: the member community", k: "Mighty Networks", i: "users-three", h: MIGHTY, pin: true, x: "community members mighty networks join sign in dashboard app clubs events" },
        { t: "Every way to reach the church (CONTACTS.md)", k: "GitHub", i: "address-book", h: CONTACTS, x: "contacts email info address channels youtube spotify instagram facebook reach out" },
        { t: "Legal notice", k: "psanctuary.org", i: "scroll", h: LEGAL, x: "legal 508 faith based organization rfra church status" },
        { t: "Proposals, procedures & decks: the reading room", k: "page", i: "folder-open", h: READING, x: "reading room proposals procedures sop standard operating decks slides welcome pdf members access" },
        { t: "Roadmap", k: "page", i: "path", h: LOG + "/roadmap", x: "plans next future ideas direction" },
        { t: "Sustainability", k: "page", i: "plant", h: LOG + "/sustainability", x: "maintenance keep running tokens costs upkeep" },
        { t: "What to expect", k: "psanctuary.org", i: "compass", h: SITE + "/welcome", x: "welcome new members ceremony" },
        { t: "Sunday service", k: "psanctuary.org", i: "sun-horizon", h: SITE + "/sunday", x: "zoom meditation tao journaling weekly online" },
        { t: "Membership", k: "psanctuary.org", i: "hand-heart", h: SITE + "/membership", x: "join member plans" },
        { t: "Courses", k: "psanctuary.org", i: "graduation-cap", h: SITE + "/courses", x: "space holding foundations education" },
        { t: "Events calendar", k: "psanctuary.org", i: "calendar-dots", h: SITE + "/events", x: "events meetups" },
        { t: "Church blog", k: "psanctuary.org", i: "notebook", h: SITE + "/blog", x: "blog posts founders" },
        { t: "About Psanctuary", k: "psanctuary.org", i: "info", h: SITE + "/about", x: "mission vision about louisville kentucky" },
        { t: "My Mushroom Map", k: "psanctuary.org", i: "map-trifold", h: SITE + "/mushroom-map", x: "mini course safety legality integration" },
        { t: "Psanctuary on YouTube", k: "link", i: "youtube-logo", h: "https://www.youtube.com/@psanctuarychurch", x: "video" },
        { t: "Psanctuary Church on GitHub", k: "link", i: "github-logo", h: "https://github.com/psanctuarychurch", x: "organization code repositories" },
        { t: "Sibling org: psanctuary", k: "link", i: "tree-structure", h: SIBLING + "/", x: "sibling second organization playful decentralized experiments" },
      ],
    },
  };
})();

/* ── Kit 1.5 (2026-10-26): languages. English first: every visitor starts in English, and the welcome's
   first row ("Your language · Tu idioma") offers Español one tap away. The kit's own
   words come from arrival/i18n/<id>.js; the org's own words below are swapped by exact match
   (`text`). They're AI-written and marked reviewed: false ("translation in review") until someone
   who speaks the language as their own reads them. Names, marks, quotes and the pledge statement
   (the exact message a wallet signs) stay as written. ── */
(function () {
  var A = window.ARRIVAL;
  if (!A) return;
  A.languages = { list: [{ id: "en", name: "English" }, { id: "es", name: "Español" }], start: "en" };
  A.i18n = {
    es: {
      reviewed: false,
      text: {
        "Rooted in sincerity, cultivated by the mushroom.": "Enraizado en la sinceridad, cultivado por el hongo.",
        "Spore Print": "Huella de esporas",
        "Print Paper": "Papel de huella",
        "Follow the day": "Sigue el día",
        "Still": "Quieto",
        "The spores settle where they are, and nothing moves.": "Las esporas se asientan donde están y nada se mueve.",
        "Drift": "Deriva",
        "Spores drift upward. Your pointer grows mycelium threads to the ones nearby and leaves a little spore dust.": "Las esporas flotan hacia arriba. Tu puntero hace crecer hilos de micelio hacia las que están cerca y deja un poco de polvo de esporas.",
        "Flush": "Brote",
        "A flush: more spores, longer threads that reach further, and a brighter puff behind your pointer.": "Un brote: más esporas, hilos más largos que llegan más lejos y una nube más brillante tras tu puntero.",
        "Portal": "Portal",
        "Porch": "Pórtico",
        "The AstroLog's front door": "La puerta de entrada del AstroLog",
        "Changelog": "Registro de cambios",
        "What changed, newest first": "Qué cambió, lo más nuevo primero",
        "Library": "Biblioteca",
        "Longer write-ups on how it works": "Textos más largos sobre cómo funciona",
        "Ledger": "Libro de cambios",
        "Every public change, in plain words": "Cada cambio público, en palabras sencillas",
        "Map": "Mapa",
        "Every place, with a picture of each": "Cada lugar, con una imagen de cada uno",
        "Get involved": "Participa",
        "Community": "Comunidad",
        "The member network, on Mighty Networks": "La red de miembros, en Mighty Networks",
        "Reach out": "Ponte en contacto",
        "Every way to reach the church": "Todas las formas de contactar a la iglesia",
        "Donate": "Donar",
        "Ways to give, and thanks by name": "Formas de dar, y el agradecimiento por nombre",
        "Pledge": "Compromiso",
        "Sign a pledge of support: free, nothing sent": "Firma un compromiso de apoyo: gratis, no se envía nada",
        "About": "Acerca de",
        "Proposals, procedures & decks": "Propuestas, procedimientos y presentaciones",
        "The reading room: what anyone may read, and the way in for members": "La sala de lectura: lo que cualquiera puede leer, y la entrada para los miembros",
        "Proposals, procedures & decks: the reading room": "Propuestas, procedimientos y presentaciones: la sala de lectura",
        "Roadmap": "Hoja de ruta",
        "Where these pages are headed": "Hacia dónde van estas páginas",
        "Sustainability": "Sostenibilidad",
        "What it takes to keep them running": "Lo que hace falta para que sigan funcionando",
        "The church's main site": "El sitio principal de la iglesia",
        "The organization and its code": "La organización y su código",
        "Explore": "Explora",
        "Welcome guide": "Guía de bienvenida",
        "About this build": "Sobre este sitio",
        "AstroLog source": "Código del AstroLog",
        "Code here is MIT licensed and the words are CC BY-SA 4.0. The Psanctuary name and marks belong to the church.": "El código aquí tiene licencia MIT y los textos, CC BY-SA 4.0. El nombre y las marcas de Psanctuary pertenecen a la iglesia.",
        "The contact form on psanctuary.org": "El formulario de contacto en psanctuary.org",
        "Open the form": "Abrir el formulario",
        "In the church's own words: “To reach our team, please fill out the form below or e-mail info@psanctuary.org.”": "En las propias palabras de la iglesia (en inglés): “To reach our team, please fill out the form below or e-mail info@psanctuary.org.”",
        "The church's public address, for questions about membership, Sunday service, ceremonies, courses, giving, or these pages.": "La dirección pública de la iglesia, para preguntas sobre la membresía, el servicio del domingo, las ceremonias, los cursos, las donaciones o estas páginas.",
        "Every way in, on GitHub": "Todas las formas de entrar, en GitHub",
        "Open CONTACTS.md": "Abrir CONTACTS.md",
        "The church's addresses, the member network and the channels psanctuary.org lists, in one page.": "Las direcciones de la iglesia, la red de miembros y los canales que indica psanctuary.org, en una sola página.",
        "the member community": "la comunidad de miembros",
        "See every way in": "Ver todas las formas de entrar",
        "Where we gather": "Donde nos reunimos",
        "Join or sign in on Mighty Networks": "Únete o inicia sesión en Mighty Networks",
        "New here? You'll see how to join. Members land on their dashboard.": "¿Eres nuevo? Verás cómo unirte. Los miembros llegan a su panel.",
        "Sneak peek": "Un adelanto",
        "Profiles and posts on open protocols like Lens and Farcaster, so what members share stays theirs.": "Perfiles y publicaciones en protocolos abiertos como Lens y Farcaster, para que lo que comparten los miembros siga siendo suyo.",
        "Give through psanctuary.org": "Da a través de psanctuary.org",
        "Give on psanctuary.org": "Dar en psanctuary.org",
        "The church's own giving page. In psanctuary.org's words: “Your donation supports the right to spiritual connection through entheogens and supports a growing community preserving and sharing practices with sacred mushrooms.”": "La propia página de donaciones de la iglesia. En palabras de psanctuary.org (en inglés): “Your donation supports the right to spiritual connection through entheogens and supports a growing community preserving and sharing practices with sacred mushrooms.”",
        "Please note": "Ten en cuenta",
        "Gifts are made on psanctuary.org, through the church's own checkout. This GitHub page doesn't take payments and never sees payment details. Questions about giving go to <a href=\"mailto:info@psanctuary.org\">info@psanctuary.org</a>.": "Las donaciones se hacen en psanctuary.org, con el propio sistema de pago de la iglesia. Esta página de GitHub no recibe pagos y nunca ve datos de pago. Las preguntas sobre donaciones van a <a href=\"mailto:info@psanctuary.org\">info@psanctuary.org</a>.",
        "Contribution ledger": "Registro de contribuciones",
        "Giving from a crypto wallet is planned for this page: one button for browser wallets, phone wallets and email sign-in. It isn't open yet.": "Dar desde una billetera cripto está planeado para esta página: un solo botón para billeteras del navegador, billeteras del teléfono e inicio de sesión con correo. Todavía no está abierto.",
        "The church's own <a href=\"https://www.psanctuary.org/legal-notice\">legal notice</a> describes Psanctuary Church as “a lawfully incorporated <span style=\"font-variant-ligatures: none; font-feature-settings: 'calt' 0, 'liga' 0, 'dlig' 0\">508(c)(1)(a)</span> Faith Based Organization”.": "El propio <a href=\"https://www.psanctuary.org/legal-notice\">aviso legal</a> de la iglesia describe a Psanctuary Church (en inglés) como “a lawfully incorporated <span style=\"font-variant-ligatures: none; font-feature-settings: 'calt' 0, 'liga' 0, 'dlig' 0\">508(c)(1)(a)</span> Faith Based Organization”.",
        "The church's <a href=\"https://ministries.psanctuary.org/donate\">donation page</a> says: “All donations to Psanctuary (as a <span style=\"font-variant-ligatures: none; font-feature-settings: 'calt' 0, 'liga' 0, 'dlig' 0\">508(c)(1)(a)</span>) are tax deductible.” It adds: “Please consult and confirm with your CPA regarding all tax related benefits for you personally.”": "La <a href=\"https://ministries.psanctuary.org/donate\">página de donaciones</a> de la iglesia dice (en inglés): “All donations to Psanctuary (as a <span style=\"font-variant-ligatures: none; font-feature-settings: 'calt' 0, 'liga' 0, 'dlig' 0\">508(c)(1)(a)</span>) are tax deductible.” Y agrega: “Please consult and confirm with your CPA regarding all tax related benefits for you personally.”",
        "The changelog": "El registro de cambios",
        "Read the changelog": "Leer el registro de cambios",
        "The library": "La biblioteca",
        "Longer write-ups on how things are built and why. The changelog says what changed; the library explains how it works.": "Textos más largos sobre cómo se construyen las cosas y por qué. El registro de cambios dice qué cambió; la biblioteca explica cómo funciona.",
        "Open the library": "Abrir la biblioteca",
        "The ledger": "El libro de cambios",
        "Open the ledger": "Abrir el libro de cambios",
        "Behind each page, spores drift upward. Move your pointer and mycelium threads reach out to the spores nearby, the way a mushroom's network grows underground. Choose how much moves, how large the text is, and whether you'd like more contrast for reading.": "Detrás de cada página, las esporas flotan hacia arriba. Mueve tu puntero y los hilos de micelio se extienden hacia las esporas cercanas, como crece bajo tierra la red de un hongo. Elige cuánto se mueve, qué tan grande es el texto y si quieres más contraste para leer.",
        "Every entry credits whoever did the work, by first name and last initial. Eric O and Alana are here early, so you can see how the record will look as more of the community takes part.": "Cada entrada reconoce a quien hizo el trabajo, por su nombre y la inicial de su apellido. Eric O y Alana están aquí desde temprano, para que veas cómo se verá el registro a medida que más de la comunidad participe.",
        "Pictures come from public GitHub profiles. Anyone without one linked gets a small spore print with their initials.": "Las imágenes vienen de perfiles públicos de GitHub. Quien no tenga uno enlazado recibe una pequeña huella de esporas con sus iniciales.",
        "Mycelium threads that reach from your pointer to nearby spores, and a little spore dust as you move. Switch them off if you'd rather not.": "Hilos de micelio que van de tu puntero a las esporas cercanas, y un poco de polvo de esporas al moverte. Apágalos si lo prefieres.",
        "One tap for the calmest page: Print Paper, the spores at rest, more contrast, shorter lines, and no mycelium threads. Tap again to go back to how you had it.": "Un toque para la página más tranquila: Papel de huella, las esporas en reposo, más contraste, líneas más cortas y sin hilos de micelio. Toca otra vez para volver a como la tenías.",
        "Let the spores settle": "Dejar que las esporas se asienten",
        "Let the spores drift": "Dejar que las esporas floten",
        "the church": "la iglesia",
        "The ledger: every public change": "El libro de cambios: cada cambio público",
        "Map: every place, with pictures": "Mapa: cada lugar, con imágenes",
        "A pledge of support": "Un compromiso de apoyo",
        "Join or sign in: the member community": "Únete o inicia sesión: la comunidad de miembros",
        "Every way to reach the church (CONTACTS.md)": "Todas las formas de contactar a la iglesia (CONTACTS.md)",
        "Legal notice": "Aviso legal",
        "What to expect": "Qué esperar",
        "Sunday service": "Servicio del domingo",
        "Membership": "Membresía",
        "Courses": "Cursos",
        "Events calendar": "Calendario de eventos",
        "Church blog": "Blog de la iglesia",
        "About Psanctuary": "Acerca de Psanctuary",
        "My Mushroom Map": "My Mushroom Map",
        "Psanctuary on YouTube": "Psanctuary en YouTube",
        "On GitHub": "En GitHub",
        "In psanctuary.org's own words, Psanctuary is “an inter-tradition church built on growing together with a sincere sacred mushroom practice rooted in spiritual autonomy.” This GitHub organization is the church's professional face on GitHub: its official home here, with an open record of everything built for it. The decentralized, playful side, where experiments in community-owned tools take shape, is its sibling, psanctuary.": "En las propias palabras de psanctuary.org (en inglés), Psanctuary es “an inter-tradition church built on growing together with a sincere sacred mushroom practice rooted in spiritual autonomy.” Esta organización de GitHub es la cara profesional de la iglesia en GitHub: su casa oficial aquí, con un registro abierto de todo lo que se construye para ella. El lado descentralizado y lúdico, donde toman forma los experimentos con herramientas que son de la comunidad, es su hermana, psanctuary.",
        "The church's real home: Sunday service, membership, courses, ceremonies and events all live there. Everything here on GitHub is the quieter, technical side, kept out in the open.": "La verdadera casa de la iglesia: el servicio del domingo, la membresía, los cursos, las ceremonias y los eventos viven ahí. Todo lo que hay aquí en GitHub es el lado más tranquilo y técnico, a la vista de todos.",
        "A few words of welcome from the church belong here, perhaps from its co-founders, Eric O, Courtney M and Athena. The space is left empty on purpose until they, or someone they ask, would like to write them.": "Aquí van unas palabras de bienvenida de la iglesia, quizá de sus cofundadores, Eric O, Courtney M y Athena. Este espacio queda vacío a propósito hasta que ellos, o alguien a quien se lo pidan, quieran escribirlas.",
        "Violet-black, like the print a cap leaves on paper overnight, lit in gold.": "Negro violáceo, como la huella que un sombrero deja sobre el papel durante la noche, iluminado en oro.",
        "The white card a print is taken on, inked in violet and gold.": "La tarjeta blanca sobre la que se toma una huella, entintada en violeta y oro.",
        "Candlelight": "Luz de velas",
        "Amber and old gold, the sanctuary after dark, lit by candles.": "Ámbar y oro viejo, el santuario de noche, iluminado por velas.",
        "Print paper by day, candlelight at dusk, spore print by night.": "Papel de huella de día, luz de velas al atardecer, huella de esporas de noche.",
        "The church's front door on GitHub": "La puerta de entrada de la iglesia en GitHub",
        "The sibling org: the playful, decentralized side": "La organización hermana: el lado lúdico y descentralizado",
        "Psanctuary Church, all the ways around": "Psanctuary Church, todos los caminos",
        "Every way to reach the church. Pick whichever suits you; each one reaches the same team.": "Todas las formas de contactar a la iglesia. Elige la que te quede mejor; todas llegan al mismo equipo.",
        "The church's members gather in its member network on Mighty Networks: events, member-led clubs, courses and messages, on the web and in the Mighty app. It comes with membership.": "Los miembros de la iglesia se reúnen en su red de miembros en Mighty Networks: eventos, clubes guiados por miembros, cursos y mensajes, en la web y en la app Mighty. Viene con la membresía.",
        "The church's members gather in one place, its member network. One link does both: visitors see how to join, and members land on their dashboard.": "Los miembros de la iglesia se reúnen en un solo lugar, su red de miembros. Un mismo enlace sirve para ambas cosas: quien visita ve cómo unirse, y los miembros llegan a su panel.",
        "The church's private member network: events, member-led clubs, courses and messages, on the web and in the Mighty app. It comes with membership.": "La red privada de miembros de la iglesia: eventos, clubes guiados por miembros, cursos y mensajes, en la web y en la app Mighty. Viene con la membresía.",
        "Looking ahead: a network of our own": "Mirando hacia adelante: una red propia",
        "In time, the church hopes to offer its members a small social network of their own, owned by the community rather than by one company. The work begins on its sibling organization, psanctuary.": "Con el tiempo, la iglesia espera ofrecer a sus miembros una pequeña red social propia, que sea de la comunidad y no de una empresa. El trabajo empieza en su organización hermana, psanctuary.",
        "Paired with a DAO, where members can propose ideas and decide together.": "Junto con una DAO, donde los miembros puedan proponer ideas y decidir juntos.",
        "Privacy first: members choose what's public and what stays among members.": "La privacidad primero: los miembros eligen qué es público y qué queda entre miembros.",
        "No dates, and nothing to sign up for yet. This is a direction, not a promise.": "Sin fechas, y todavía nada en qué inscribirse. Es una dirección, no una promesa.",
        "Sunday service is open to everyone, online. <a href=\"https://www.psanctuary.org/community-tools\">psanctuary.org/community-tools</a> explains the member network, and <a href=\"https://www.psanctuary.org/membership\">psanctuary.org/membership</a> lists the plans.": "El servicio del domingo está abierto a todos, en línea. <a href=\"https://www.psanctuary.org/community-tools\">psanctuary.org/community-tools</a> explica la red de miembros, y <a href=\"https://www.psanctuary.org/membership\">psanctuary.org/membership</a> muestra los planes.",
        "People and organizations who have given time, skills or gifts to the church's GitHub home, and agreed to be thanked by name here.": "Personas y organizaciones que han dado tiempo, habilidades o regalos a la casa de la iglesia en GitHub, y que aceptaron ser agradecidas por nombre aquí.",
        "Ask the church for a receipt: email <a href=\"mailto:info@psanctuary.org\" data-arr-direct>info@psanctuary.org</a> with the date and amount of your gift.": "Pídele un recibo a la iglesia: escribe a <a href=\"mailto:info@psanctuary.org\" data-arr-direct>info@psanctuary.org</a> con la fecha y el monto de tu donación.",
        "Three steps: read the pledge, connect a wallet, and sign. No gas and no money, and for now nothing is recorded. A pledge isn't membership; <a href=\"https://www.psanctuary.org/membership\">membership</a> is its own step, on psanctuary.org.": "Tres pasos: lee el compromiso, conecta una billetera y firma. Sin gas y sin dinero, y por ahora no se registra nada. El texto que se firma queda en inglés. Un compromiso no es una membresía; la <a href=\"https://www.psanctuary.org/membership\">membresía</a> es un paso aparte, en psanctuary.org.",
        "A pledge isn't a gift and asks nothing more of you. To give as well, see <a href=\"https://psanctuarychurch.github.io/donate/\">the ways to give</a>.": "Un compromiso no es un regalo y no te pide nada más. Para dar también, mira <a href=\"https://psanctuarychurch.github.io/donate/\">las formas de dar</a>.",
        "The Psanctuary Church AstroLog has two halves.": "El AstroLog de Psanctuary Church tiene dos mitades.",
        "Sharing one change? Every entry and every write-up has its own preview card, framed in gold with a spore print of its own, the title and the summary. Paste its link into Telegram, iMessage or Discord and it arrives with that card. The <strong>Copy a link</strong> button under each one does the copying.": "¿Vas a compartir un cambio? Cada entrada y cada texto tiene su propia tarjeta de vista previa, con marco dorado, una huella de esporas propia, el título y el resumen. Pega su enlace en Telegram, iMessage o Discord y llega con esa tarjeta. El botón <strong>Copiar un enlace</strong> debajo de cada uno lo copia por ti.",
        "Every notable change to Psanctuary Church's GitHub home, newest first. Each entry opens with a one-line summary, with the full story folded underneath, and credits whoever did the work.": "Cada cambio notable en la casa de Psanctuary Church en GitHub, lo más nuevo primero. Cada entrada abre con un resumen de una línea, con la historia completa plegada debajo, y reconoce a quien hizo el trabajo.",
        "Every public change to Psanctuary Church's code on GitHub, in plain words: grouped by day and by kind, credited by name, and linked to the change itself. For anyone who'd rather not open GitHub. It refreshes every day.": "Cada cambio público en el código de Psanctuary Church en GitHub, en palabras sencillas: agrupados por día y por tipo, reconocidos por nombre y enlazados al cambio mismo. Para quien prefiera no abrir GitHub. Se actualiza cada día.",
        "Psanctuary Church on GitHub": "Psanctuary Church en GitHub",
        "This is Psanctuary Church's official home on GitHub: the church's technical work, kept in order and out in the open, and the way into the AstroLog, where every change is written down.": "Esta es la casa oficial de Psanctuary Church en GitHub: el trabajo técnico de la iglesia, ordenado y a la vista, y el camino al AstroLog, donde se anota cada cambio.",
        "the Psanctuary Church AstroLog": "el AstroLog de Psanctuary Church",
        "The AstroLog is Psanctuary Church's plain-language record of what changed on GitHub, who made each change, and how the pieces fit together.": "El AstroLog es el registro en lenguaje sencillo de lo que cambió en el GitHub de Psanctuary Church, quién hizo cada cambio y cómo encajan las piezas.",
        "Every Psanctuary Church page takes its colors from a spore print: violet-black, the paper it's taken on, and the candlelit gold of a sanctuary after dark. Pick one, and it follows you from page to page.": "Cada página de Psanctuary Church toma sus colores de una huella de esporas: el negro violáceo, el papel sobre el que se toma y el oro a la luz de las velas de un santuario de noche. Elige uno y te acompaña de página en página.",
        "You've lit every gill of the print. Welcome to Psanctuary Church.": "Encendiste cada laminilla de la huella. Te damos la bienvenida a Psanctuary Church.",
        "Enter Psanctuary Church": "Entrar a Psanctuary Church",
        "Anywhere on Psanctuary Church's pages, any time: every change, write-up, person and page, including the AstroLog from the entry portal.": "En cualquier lugar de las páginas de Psanctuary Church, en cualquier momento: cada cambio, texto, persona y página, incluido el AstroLog desde el portal de entrada.",
        "Psanctuary Church entry portal": "Portal de entrada de Psanctuary Church",
        "Sibling org: psanctuary": "Organización hermana: psanctuary",
      },
    },
  };
})();
/* ── end of the languages block ── */
