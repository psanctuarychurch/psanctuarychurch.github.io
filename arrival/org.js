/* Psanctuary Church's arrival config, read by arrival.js. Shared by every Psanctuary Church page: the entry portal
   and (by absolute URL) the AstroLog.

   Every fact here comes from psanctuary.org's own public pages (home, About, What to Expect,
   Community Tools, Membership). Anything not decided yet is marked as a placeholder or "coming soon"
   rather than guessed. People are named by first name only. Strings shown in the welcome guide may
   hold simple HTML. */
(function () {
  var ROOT = "https://psanctuarychurch.github.io";
  var LOG = ROOT + "/changelog-astro-public";
  var SITE = "https://www.psanctuary.org";
  // The church's private member network, powered by Mighty Networks. psanctuary.org links to it
  // publicly from its Membership page (the plan sign-ups) and explains it on its Community Tools page.
  var MIGHTY = "https://psanctuary-member-community.mn.co/";
  // Spore violets and golden caps. They color the guide's cap (one gill per step) and the initials
  // avatars of anyone without a GitHub picture.
  var GILLS = ["#a88bc9", "#e2b45a", "#8c70b0", "#d49a3a", "#c2a9e0", "#f0cf8a", "#6a4c8c", "#b8873a"];

  // An initials avatar in the family's shape: a tiny spore print (gills, dust, a stem ring) with the
  // initials at its heart. System serif only: an <img> SVG can't load the page's web fonts.
  function sporeAvatar(ini, c1, c2) {
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
      (ini.length > 1 ? 21 : 26) + '" fill="#f6efe4">' + ini + "</text></svg>"
    );
  }

  window.ARRIVAL = {
    org: {
      short: "Psanctuary Church",
      name: "On GitHub",
      motto: "Rooted in sincerity, cultivated by the mushroom.",
      about:
        "In psanctuary.org's own words, Psanctuary is “an inter-tradition church built on growing together with a sincere sacred mushroom practice rooted in spiritual autonomy.” There's no single doctrine, and members come from every background and tradition.",
      // The family mark: a spore print with its stem ring, in this org's accent.
      mark: { src: ROOT + "/favicon.svg" },
      home: {
        label: "psanctuary.org",
        href: SITE,
        text: "The church's real home: Sunday service, membership, courses, ceremonies and events all live there. Everything here on GitHub is the quieter, technical side, kept out in the open.",
      },
      welcomeNote: null,
      welcomePlaceholder:
        "A few words of welcome from the church belong here. The space is left empty on purpose until someone at Psanctuary would like to write them.",
    },

    // The church's portal and AstroLog share one origin, so one key carries every choice between them.
    storage: { key: "psanctuarychurch-arrival" },

    modes: [
      { id: "spore", name: "Spore Print", note: "Violet-black, like the print a cap leaves on paper overnight, lit in gold.", swatch: ["#16111a", "#e2b45a"], dark: true },
      { id: "paper", name: "Print Paper", note: "The white card a print is taken on, inked in violet and gold.", swatch: ["#f3f1f4", "#8a5b10"] },
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

    // The spore field behind every page: spores drift up, and the pointer grows mycelium threads to
    // the ones nearby. Its cursor effects (threads and spore dust) switch off on their own, and rest
    // whenever motion is Still. The field draws them itself, so no kit trail here.
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

    // Where the church's members talk, as psanctuary.org describes it.
    community: {
      name: "Mighty Networks",
      icon: "users-three",
      href: MIGHTY,
      label: "Open the member network",
      text: "Psanctuary's members talk in the church's private member network, powered by Mighty Networks: events, member-led clubs, courses and messages, on the web and in the Mighty app. It comes with membership.",
      more: [
        'New here? <a href="' + SITE + '/community-tools">psanctuary.org/community-tools</a> explains the network, and <a href="' + SITE + '/membership">psanctuary.org/membership</a> lists the plans. Sunday service is open to everyone, online.',
      ],
    },

    record: {
      intro: "The Psanctuary Church AstroLog has two halves.",
      share:
        "Sharing one change? Every entry and every write-up has its own preview card, a spore print of its own with the title and summary. Paste its link into Telegram, iMessage or Discord and it arrives with that card. The <strong>Copy a link</strong> button under each one does the copying.",
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
    },

    sites: {
      portal: {
        name: "Psanctuary Church on GitHub",
        what: "This is Psanctuary Church's front door on GitHub: a quiet place for the church's technical work, and the way into the AstroLog, where every change is written down.",
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
        text: "Behind each page, spores drift upward. Move your pointer and mycelium threads reach out to the spores nearby, the way a mushroom's network grows underground. Choose how much moves, and whether you'd like more contrast for reading.",
      },
      people: {
        text: "Every entry credits whoever did the work, by first name. Eric and Alana are here early, so you can see how the record will look as more of the community takes part.",
        fine: "Pictures come from public GitHub profiles. Anyone without one linked gets a small spore print with their initials.",
      },
    },
    guideFinale: "You've lit every gill of the print. Welcome to Psanctuary Church.",

    words: {
      enter: "Enter Psanctuary Church",
      cursorNote: "Mycelium threads that reach from your pointer to nearby spores, and a little spore dust as you move. Switch them off if you'd rather not.",
      pause: "Let the spores settle",
      play: "Let the spores drift",
      searchTip: "Anywhere on Psanctuary Church's pages, any time: every change, write-up, person and page, including the AstroLog from the entry portal.",
    },

    search: {
      sources: [{ url: LOG + "/search.json" }],
      items: [
        { t: "Psanctuary Church entry portal", k: "page", i: "house", h: ROOT + "/", pin: true, x: "home github io root portal" },
        { t: "psanctuary.org", k: "the church", i: "globe-simple", h: SITE, pin: true, x: "website main home church" },
        { t: "What to expect", k: "psanctuary.org", i: "compass", h: SITE + "/welcome", x: "welcome new members ceremony" },
        { t: "Sunday service", k: "psanctuary.org", i: "sun-horizon", h: SITE + "/sunday", x: "zoom meditation tao journaling weekly online" },
        { t: "Membership", k: "psanctuary.org", i: "hand-heart", h: SITE + "/membership", x: "join member plans" },
        { t: "Member network on Mighty Networks", k: "community", i: "users-three", h: MIGHTY, x: "community mighty networks members talk chat clubs" },
        { t: "About the member network", k: "psanctuary.org", i: "info", h: SITE + "/community-tools", x: "community tools mighty app" },
        { t: "Courses", k: "psanctuary.org", i: "graduation-cap", h: SITE + "/courses", x: "space holding foundations education" },
        { t: "Events calendar", k: "psanctuary.org", i: "calendar-dots", h: SITE + "/events", x: "events meetups" },
        { t: "Church blog", k: "psanctuary.org", i: "notebook", h: SITE + "/blog", x: "blog posts founders" },
        { t: "About Psanctuary", k: "psanctuary.org", i: "info", h: SITE + "/about", x: "mission vision about louisville kentucky" },
        { t: "My Mushroom Map", k: "psanctuary.org", i: "map-trifold", h: SITE + "/mushroom-map", x: "mini course safety legality integration" },
        { t: "Psanctuary on YouTube", k: "link", i: "youtube-logo", h: "https://www.youtube.com/@psanctuarychurch", x: "video" },
        { t: "Ask a question", k: "email", i: "envelope-simple", h: "mailto:info@psanctuary.org", x: "contact email info reach out" },
        { t: "Psanctuary Church on GitHub", k: "link", i: "github-logo", h: "https://github.com/psanctuarychurch", x: "organization code repositories" },
        { t: "Sibling org: psanctuary", k: "link", i: "tree-structure", h: "https://psanctuary.github.io/", x: "sibling second organization" },
      ],
    },
  };
})();
