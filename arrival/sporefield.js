/* Psanctuary Church's spore field: the living background behind every Psanctuary Church page (the entry portal, its
   404, and the AstroLog, which loads this same file by absolute URL so the two can't drift apart).

   Spores drift upward. Wherever the pointer goes, the spores nearby light up with thin mycelium
   threads (the network a mushroom actually grows from), and moving releases a little spore dust.
   Colors come from the page's --spore and --accent tokens, so it follows the light the visitor picks.

   It follows the arrival kit's choices on <html>:
     data-motion   still: the spores rest where they are (one still frame, nothing animates)
                   drift: the field as it has always been
                   flush: more spores, a wider reach, longer threads and a brighter puff
     data-cursor   "off": no threads and no dust; the spores keep drifting on their own
     data-contrast "more": the field steps back so the words stand out
   Without the kit it falls back to prefers-reduced-motion. Canvas, no dependencies, and it pauses
   while the tab is hidden. Needs <canvas id="sporefield-canvas" aria-hidden="true"> in the page. */
(function () {
  "use strict";
  var canvas = document.getElementById("sporefield-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;
  var root = document.documentElement;

  var LEVELS = {
    drift: { area: 10500, max: 120, speed: 1, reach: 140, link: 72, threads: 12, dust: 2, glow: 0.16, dustSize: 1 },
    flush: { area: 6400, max: 200, speed: 1.55, reach: 190, link: 92, threads: 18, dust: 3, glow: 0.24, dustSize: 1.35 },
  };

  var spores = [];
  var puffs = [];
  var mouse = { x: -9999, y: -9999, active: false };
  var last = { x: -9999, y: -9999 };
  var W = 0;
  var H = 0;
  var dpr = 1;
  var raf = 0;
  var sporeColor = "#a88bc9";
  var accentColor = "#e2b45a";
  var quiet = 1;

  function prefersLess() {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      return false;
    }
  }
  function motion() {
    var m = root.getAttribute("data-motion");
    if (m) return m;
    return prefersLess() ? "still" : "drift";
  }
  function level() {
    return LEVELS[motion()] || LEVELS.drift;
  }
  function still() {
    return motion() === "still";
  }
  function cursorOn() {
    return root.getAttribute("data-cursor") !== "off" && !still();
  }

  function readColors() {
    var cs = getComputedStyle(root);
    sporeColor = cs.getPropertyValue("--spore").trim() || sporeColor;
    accentColor = cs.getPropertyValue("--accent").trim() || accentColor;
    quiet = root.getAttribute("data-contrast") === "more" ? 0.45 : 1;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spore(L) {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.3 + 0.5,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(0.04 + Math.random() * 0.14),
      sway: Math.random() * Math.PI * 2,
      glow: Math.random() < L.glow,
    };
  }
  // Grow or thin the field to the level's density without reseeding the spores already there.
  function fill() {
    var L = level();
    var want = Math.min(L.max, Math.floor((W * H) / L.area));
    while (spores.length < want) spores.push(spore(L));
    if (spores.length > want) spores.length = want;
  }

  function drawSpore(s, alpha) {
    ctx.globalAlpha = alpha * quiet;
    ctx.fillStyle = s.glow ? accentColor : sporeColor;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    if (s.glow) {
      ctx.globalAlpha = alpha * quiet * 0.18;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // A hypha: a thin line that bends a little, so the network reads as grown, not drawn with a ruler.
  function hypha(x1, y1, x2, y2, alpha, bend) {
    var mx = (x1 + x2) / 2;
    var my = (y1 + y2) / 2;
    var dx = x2 - x1;
    var dy = y2 - y1;
    ctx.globalAlpha = alpha * quiet;
    ctx.strokeStyle = sporeColor;
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(mx - dy * bend, my + dx * bend, x2, y2);
    ctx.stroke();
  }

  function frame(t) {
    raf = 0;
    var L = level();
    var follow = mouse.active && cursorOn();
    ctx.clearRect(0, 0, W, H);
    var near = [];
    for (var i = 0; i < spores.length; i++) {
      var s = spores[i];
      s.sway += 0.006 * L.speed;
      s.x += (s.vx + Math.sin(s.sway) * 0.08) * L.speed;
      s.y += s.vy * L.speed;
      if (s.y < -6) {
        s.y = H + 6;
        s.x = Math.random() * W;
      }
      if (s.x < -6) s.x = W + 6;
      if (s.x > W + 6) s.x = -6;
      var twinkle = 0.5 + 0.5 * Math.sin(t * 0.0012 + s.sway * 3);
      drawSpore(s, s.glow ? 0.55 + twinkle * 0.35 : 0.22 + twinkle * 0.22);
      if (follow) {
        var dx = s.x - mouse.x;
        var dy = s.y - mouse.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < L.reach) near.push({ s: s, d: d });
      }
    }

    if (near.length) {
      near.sort(function (a, b) {
        return a.d - b.d;
      });
      near = near.slice(0, L.threads);
      for (var j = 0; j < near.length; j++) {
        var a = near[j];
        hypha(mouse.x, mouse.y, a.s.x, a.s.y, (1 - a.d / L.reach) * 0.5, 0.18);
        for (var k = j + 1; k < near.length; k++) {
          var b = near[k];
          var ex = a.s.x - b.s.x;
          var ey = a.s.y - b.s.y;
          var e = Math.sqrt(ex * ex + ey * ey);
          if (e < L.link) hypha(a.s.x, a.s.y, b.s.x, b.s.y, (1 - e / L.link) * 0.28, -0.12);
        }
      }
    }

    for (var p = puffs.length - 1; p >= 0; p--) {
      var q = puffs[p];
      q.x += q.vx;
      q.y += q.vy;
      q.vx *= 0.95;
      q.vy = q.vy * 0.95 - 0.006;
      q.life -= 0.012;
      if (q.life <= 0) {
        puffs.splice(p, 1);
        continue;
      }
      ctx.globalAlpha = q.life * 0.8 * quiet;
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(q.x, q.y, q.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!document.hidden && !still()) raf = requestAnimationFrame(frame);
  }

  function puff(x, y) {
    if (last.x < -9000) {
      last.x = x;
      last.y = y;
      return;
    }
    var L = level();
    var dx = x - last.x;
    var dy = y - last.y;
    for (var i = 0; i < L.dust; i++) {
      if (puffs.length > 120) puffs.shift();
      puffs.push({
        x: x,
        y: y,
        vx: dx * 0.08 + (Math.random() - 0.5) * 0.7 * L.speed,
        vy: dy * 0.08 + (Math.random() - 0.5) * 0.7 * L.speed,
        life: 1,
        size: (0.8 + Math.random() * 1.2) * L.dustSize,
      });
    }
    last.x = x;
    last.y = y;
  }

  // Still: one quiet frame, every spore where it is, no threads.
  function drawStatic() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < spores.length; i++) drawSpore(spores[i], spores[i].glow ? 0.6 : 0.3);
    ctx.globalAlpha = 1;
  }

  function run() {
    if (still() || document.hidden) {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      puffs = [];
      if (still()) drawStatic();
      return;
    }
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function move(x, y) {
    if (!cursorOn()) {
      mouse.active = false;
      return;
    }
    mouse.x = x;
    mouse.y = y;
    mouse.active = true;
    puff(x, y);
  }
  function leave() {
    mouse.active = false;
    last.x = -9999;
  }

  window.addEventListener("resize", function () {
    resize();
    fill();
    if (still()) drawStatic();
  });
  window.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "touch") move(e.clientX, e.clientY);
  });
  window.addEventListener(
    "touchmove",
    function (e) {
      if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: true }
  );
  document.addEventListener("mouseleave", leave);
  window.addEventListener("touchend", leave);
  document.addEventListener("visibilitychange", run);

  // The arrival kit changes these as the visitor chooses; follow along.
  new MutationObserver(function () {
    readColors();
    fill();
    if (!cursorOn()) leave();
    run();
  }).observe(root, { attributes: true, attributeFilter: ["data-theme", "data-motion", "data-cursor", "data-contrast"] });

  resize();
  readColors();
  fill();
  run();
})();
