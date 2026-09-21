/* ==========================================================================
   SHIJO.SITE — main.js (Bold / Pop direction)
   ========================================================================== */
(function () {
  "use strict";

  var SITE_DATA = {
    skills: [
      { name: "Languages", items: ["Python", "Java", "JavaScript", "C", "C++", "SQL"], tab: "#ffd100" },
      { name: "AI / ML", items: ["Machine Learning", "Generative AI", "NLP", "Data Science"], tab: "#ff4d8d" },
      { name: "Web", items: ["React", "TypeScript", "Node.js", "HTML", "CSS"], tab: "#34d399" },
      { name: "Tools", items: ["Git", "GitHub", "Docker"], tab: "#a3b8ff" }
    ],
    timeline: [
      { year: "2024", title: "Foundations", text: "Core CS fundamentals, data structures, and the first real projects — learning by building rather than only studying.", stack: ["Python", "Java", "SQL"] },
      { year: "2025", title: "Building", text: "Moved into full‑stack development and shipped complete products end to end, from backend APIs to interfaces.", stack: ["React", "Node.js", "TypeScript"] },
      { year: "2026", title: "Systems + AI", text: "Combined applied machine learning with production engineering — including LEDGR — to build systems that reason about data, not just display it.", stack: ["FastAPI", "Machine Learning", "Docker"] },
      { year: "2027", title: "What's next", text: "Deeper AI/ML work, larger systems, and new collaborations.", stack: [], badge: true }
    ],
    archive: [
      { name: "shijo-site", desc: "This site — a from-scratch, dependency-light personal site with a universal UPI payment flow.", url: "https://github.com/shijo-hex/shijo-site" },
      { name: "More on GitHub", desc: "Additional projects and experiments live on the profile below.", url: "https://github.com/shijo-hex" }
    ]
  };

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) document.body.classList.add("reduced-motion");
  var isTouch = matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ---------------------------------------------------------------------
   * 1. THEME — day/night toggle, CSS-variable driven, persisted
   * ------------------------------------------------------------------- */
  (function theme() {
    var toggles = [document.getElementById("theme-toggle"), document.getElementById("mm-theme-toggle")].filter(Boolean);
    var metaColor = document.querySelector('meta[name="theme-color"]');
    var mmLabel = document.querySelector(".mm-theme-label");
    var COLORS = { light: "#2A3EFF", dark: "#07070B" };
    var stored = null;
    try { stored = localStorage.getItem("shijo-theme"); } catch (e) {}
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var current = stored || (prefersDark ? "dark" : "light");
    apply(current);

    toggles.forEach(function (btn) {
      btn.addEventListener("click", function () {
        current = current === "dark" ? "light" : "dark";
        apply(current);
        try { localStorage.setItem("shijo-theme", current); } catch (e) {}
      });
    });

    function apply(mode) {
      if (mode === "dark") document.body.setAttribute("data-theme", "dark");
      else document.body.removeAttribute("data-theme");
      toggles.forEach(function (btn) {
        btn.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
        btn.setAttribute("aria-label", mode === "dark" ? "Switch to day mode" : "Switch to dark mode");
      });
      if (mmLabel) mmLabel.textContent = mode === "dark" ? "Day mode" : "Dark mode";
      if (metaColor) metaColor.setAttribute("content", COLORS[mode]);
    }
  })();

  /* ---------------------------------------------------------------------
   * 2. CURSOR — dot + lagging ring, hover/click/view states
   * ------------------------------------------------------------------- */
  (function cursor() {
    if (isTouch || reduceMotion) return;
    var ring = document.getElementById("cursor-ring");
    var dot = document.getElementById("cursor-dot");
    if (!ring || !dot) return;
    document.body.classList.add("has-custom-cursor");

    var tx = 0, ty = 0, rx = 0, ry = 0;
    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = "translate(" + tx + "px," + ty + "px)";
    });

    (function loop() {
      rx += (tx - rx) * 0.15;
      ry += (ty - ry) * 0.15;
      ring.style.transform = "translate(" + rx + "px," + ry + "px)";
      requestAnimationFrame(loop);
    })();

    window.addEventListener("mousedown", function () { ring.classList.add("-down"); dot.classList.add("-down"); });
    window.addEventListener("mouseup", function () { ring.classList.remove("-down"); dot.classList.remove("-down"); });

    document.querySelectorAll(".btn, [data-magnetic]").forEach(function (n) {
      n.addEventListener("mouseenter", function () { ring.classList.add("-link"); });
      n.addEventListener("mouseleave", function () { ring.classList.remove("-link"); });
    });
    document.querySelectorAll(".nav-links a, .nav-brand, .theme-toggle").forEach(function (n) {
      n.addEventListener("mouseenter", function () { ring.classList.add("-nav"); });
      n.addEventListener("mouseleave", function () { ring.classList.remove("-nav"); });
    });
    document.querySelectorAll(".chapter, .skill-cat, .arch-row, .c-link, .status-card").forEach(function (n) {
      n.addEventListener("mouseenter", function () { ring.classList.add("-view"); });
      n.addEventListener("mouseleave", function () { ring.classList.remove("-view"); });
    });
  })();

  /* ---------------------------------------------------------------------
   * 3. MOUSE PARALLAX — subtle drift on existing decorative blobs/stars
   * ------------------------------------------------------------------- */
  (function parallax() {
    if (isTouch || reduceMotion) return;
    var els = Array.prototype.slice.call(document.querySelectorAll(".blob, .star"));
    if (!els.length) return;
    var mx = 0, my = 0;
    window.addEventListener("mousemove", function (e) {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    (function loop() {
      els.forEach(function (el, i) {
        var depth = el.classList.contains("star") ? 6 : 12;
        el.style.transform = "translate(" + (mx * depth).toFixed(1) + "px," + (my * depth).toFixed(1) + "px)";
      });
      requestAnimationFrame(loop);
    })();
  })();

  /* ---------------------------------------------------------------------
   * 4. INTRO
   * ------------------------------------------------------------------- */
  (function intro() {
    var el = document.getElementById("intro");
    if (!el) return;
    var seen = false;
    try { seen = sessionStorage.getItem("shijo-intro-seen") === "1"; } catch (e) {}
    if (seen) { el.remove(); return; }
    document.body.classList.add("intro-lock");
    function dismiss() {
      el.classList.add("leaving");
      document.body.classList.remove("intro-lock");
      setTimeout(function () { el.remove(); }, reduceMotion ? 0 : 340);
      try { sessionStorage.setItem("shijo-intro-seen", "1"); } catch (e) {}
    }
    el.addEventListener("click", dismiss);
    if (reduceMotion) { dismiss(); return; }
    requestAnimationFrame(function () { el.classList.add("-show"); });
    setTimeout(dismiss, 900);
  })();

  /* ---------------------------------------------------------------------
   * 5. MAGNETIC — primary CTAs only
   * ------------------------------------------------------------------- */
  (function magnetic() {
    if (isTouch || reduceMotion) return;
    document.querySelectorAll("[data-magnetic]").forEach(function (n) {
      var strength = 0.18;
      n.addEventListener("mousemove", function (e) {
        var r = n.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        n.style.transform = "translate(" + mx * strength + "px," + my * strength + "px)";
      });
      n.addEventListener("mouseleave", function () { n.style.transform = "translate(0,0)"; });
    });
  })();

  /* ---------------------------------------------------------------------
   * 6. NAV
   * ------------------------------------------------------------------- */
  (function nav() {
    var header = document.getElementById("site-nav");
    var links = document.querySelectorAll(".nav-links a");
    var sections = Array.prototype.map.call(links, function (l) { return document.getElementById(l.dataset.sec); }).filter(Boolean);
    if ("IntersectionObserver" in window && sections.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (l) { l.classList.remove("-active"); });
          var match = document.querySelector('.nav-links a[data-sec="' + entry.target.id + '"]');
          if (match) match.classList.add("-active");
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(function (s) { io.observe(s); });
    }

    if (header) {
      var setScrolled = function () { header.classList.toggle("-scrolled", window.scrollY > 24); };
      setScrolled();
      window.addEventListener("scroll", setScrolled, { passive: true });
    }

    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("mobile-menu");
    var closeBtn = document.getElementById("mm-close");
    function openMenu() {
      menu.classList.add("-open"); menu.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden";
      var first = menu.querySelector("a"); if (first) first.focus();
    }
    function closeMenu() {
      menu.classList.remove("-open"); menu.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; toggle.focus();
    }
    if (toggle) toggle.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("-open")) closeMenu(); });
  })();

  /* ---------------------------------------------------------------------
   * 7. REVEAL ON SCROLL
   * ------------------------------------------------------------------- */
  (function reveals() {
    var items = document.querySelectorAll(".reveal, .about-statement, .chapter, .t-node");
    if (!("IntersectionObserver" in window)) { items.forEach(function (n) { n.classList.add("-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("-in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (n) { io.observe(n); });
  })();

  /* ---------------------------------------------------------------------
   * 8. ABOUT — line-mask reveal
   * ------------------------------------------------------------------- */
  (function about() {
    var el = document.getElementById("about-statement");
    if (!el || !("IntersectionObserver" in window)) { if (el) el.classList.add("-in"); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { el.classList.add("-in"); io.unobserve(el); } });
    }, { threshold: 0.4 });
    io.observe(el);
  })();

  /* ---------------------------------------------------------------------
   * 9. SKILLS — colored swatch + tag chips, slight per-card tilt on hover
   * ------------------------------------------------------------------- */
  (function skills() {
    var grid = document.getElementById("skills-grid");
    if (!grid) return;
    SITE_DATA.skills.forEach(function (cat, i) {
      var row = document.createElement("div");
      row.className = "skill-cat";
      row.style.setProperty("--tab", cat.tab);
      row.style.setProperty("--tilt", (i % 2 === 0 ? "-1deg" : "1deg"));
      row.tabIndex = 0;
      row.setAttribute("role", "button");
      row.setAttribute("aria-expanded", "false");
      row.innerHTML =
        '<div class="top">' +
          '<div><div class="num">' + String(i + 1).padStart(2, "0") + '</div><div class="cat-name">' + cat.name + ' <small>' + cat.items.length + ' items</small></div></div>' +
          '<span class="swatch" style="background:' + cat.tab + '"></span>' +
        '</div>' +
        '<div class="skill-items"><div class="skill-items-inner"><div class="skill-tags">' +
          cat.items.map(function (s) { return "<span>" + s + "</span>"; }).join("") +
        '</div></div></div>';
      function toggle() {
        var open = row.classList.toggle("-open");
        row.setAttribute("aria-expanded", open ? "true" : "false");
      }
      row.addEventListener("click", toggle);
      row.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
      grid.appendChild(row);
    });
    var first = grid.querySelector(".skill-cat");
    if (first) { first.classList.add("-open"); first.setAttribute("aria-expanded", "true"); }
  })();

  /* ---------------------------------------------------------------------
   * 10. TIMELINE
   * ------------------------------------------------------------------- */
  (function timeline() {
    var wrap = document.getElementById("timeline-nodes");
    if (!wrap) return;
    SITE_DATA.timeline.forEach(function (t) {
      var node = document.createElement("div");
      node.className = "t-node";
      node.innerHTML =
        '<span class="yr mono">' + t.year + (t.badge ? ' <span class="badge">Next</span>' : "") + "</span>" +
        '<h3 class="ti">' + t.title + "</h3>" +
        (t.text ? '<p class="tx">' + t.text + "</p>" : "") +
        (t.stack && t.stack.length ? '<div class="stack">' + t.stack.map(function (s) { return "<span>" + s + "</span>"; }).join("") + "</div>" : "");
      wrap.appendChild(node);
    });
    var track = document.getElementById("timeline");
    var fill = document.getElementById("timeline-fill");
    if (!track || !fill) return;
    function update() {
      var r = track.getBoundingClientRect();
      var vh = window.innerHeight;
      var total = r.height - vh * 0.5;
      var passed = vh * 0.7 - r.top;
      var pct = total > 0 ? Math.min(1, Math.max(0, passed / total)) : 0;
      fill.style.height = (pct * 100) + "%";
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  })();

  /* ---------------------------------------------------------------------
   * 11. ARCHIVE
   * ------------------------------------------------------------------- */
  (function archive() {
    var wrap = document.getElementById("archive-list");
    if (!wrap) return;
    SITE_DATA.archive.forEach(function (p, i) {
      var a = document.createElement("a");
      a.className = "arch-row";
      a.href = p.url; a.target = "_blank"; a.rel = "noopener";
      a.innerHTML =
        '<span class="num mono">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span><span class="name">' + p.name + '</span><div class="desc">' + p.desc + "</div></span>" +
        '<span class="arr">↗</span>';
      wrap.appendChild(a);
    });
  })();

  /* ---------------------------------------------------------------------
   * 12. NUMBER TICKER
   * ------------------------------------------------------------------- */
  (function numberTicker() {
    var els = document.querySelectorAll("[data-ticker]");
    if (!els.length) return;
    function run(el) {
      var target = parseFloat(el.dataset.ticker) || 0;
      var suffix = el.dataset.suffix || "";
      if (reduceMotion) { el.textContent = target + suffix; return; }
      var start = null, dur = 800;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min(1, (ts - start) / dur);
        el.textContent = Math.round(p * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); } });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---------------------------------------------------------------------
   * 13. PINNED CASE-STUDY SCROLL
   * ------------------------------------------------------------------- */
  (function pinChapters() {
    var head = document.querySelector(".project-head");
    var chaptersWrap = document.querySelector(".chapters");
    var chapters = document.querySelectorAll(".chapter");
    if (!head || !chaptersWrap || !chapters.length) return;
    if (!reduceMotion && window.gsap && window.ScrollTrigger && window.matchMedia("(min-width: 860px)").matches) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.create({ trigger: chaptersWrap, start: "top top+=110", end: "bottom bottom", pin: head, pinSpacing: false });
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { entry.target.classList.toggle("-active", entry.isIntersecting); });
      }, { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" });
      chapters.forEach(function (c) { io.observe(c); });
    } else { chapters.forEach(function (c) { c.classList.add("-active"); }); }
  })();

  /* ---------------------------------------------------------------------
   * 14. MISC
   * ------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
