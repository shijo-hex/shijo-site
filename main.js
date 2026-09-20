/* ==========================================================================
   SHIJO.SITE — main.js
   Vanilla JS, no build step. Edit SITE_DATA below to update content without
   touching markup or animation logic.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
   * 0. CONTENT DATA — edit this to update the site
   * ------------------------------------------------------------------- */
  var SITE_DATA = {
    skills: [
      { name: "Languages", items: ["Python", "Java", "JavaScript", "C", "C++", "SQL"] },
      { name: "AI / ML", items: ["Machine Learning", "Generative AI", "NLP", "Data Science"] },
      { name: "Web", items: ["React", "TypeScript", "Node.js", "HTML", "CSS"] },
      { name: "Tools", items: ["Git", "GitHub", "Docker"] }
    ],
    timeline: [
      { year: "2024", title: "Foundations", text: "Core CS fundamentals, data structures, and the first real projects — learning by building rather than only studying.", stack: ["Python", "Java", "SQL"] },
      { year: "2025", title: "Building", text: "Moved into full‑stack development and shipped complete products end to end, from backend APIs to interfaces.", stack: ["React", "Node.js", "TypeScript"] },
      { year: "2026", title: "Systems + AI", text: "Combined applied machine learning with production engineering — including LEDGR — to build systems that reason about data, not just display it.", stack: ["FastAPI", "Machine Learning", "Docker"] },
      { year: "2027", title: "What's next", text: "Deeper AI/ML work, larger systems, and new collaborations.", stack: [] }
    ],
    archive: [
      { name: "shijo-site", desc: "This site — a from-scratch, dependency-light personal site with a universal UPI payment flow.", url: "https://github.com/shijo-hex/shijo-site" },
      { name: "More on GitHub", desc: "Additional projects and experiments live on the profile below.", url: "https://github.com/shijo-hex" }
    ],
    terminalLines: [
      { p: "$ whoami", o: "shijo" },
      { p: "$ stack", o: "python · typescript · react · fastapi" },
      { p: "$ focus", o: "ai/ml, full-stack, product engineering" }
    ]
  };

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) document.body.classList.add("reduced-motion");

  var isTouch = matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ---------------------------------------------------------------------
   * 1. INTRO LOADER
   * ------------------------------------------------------------------- */
  (function intro() {
    var el = document.getElementById("intro");
    var fill = document.getElementById("intro-fill");
    var status = document.getElementById("intro-status");
    if (!el) return;

    var seen = false;
    try { seen = sessionStorage.getItem("shijo-intro-seen") === "1"; } catch (e) {}

    function dismiss() {
      el.classList.add("leaving");
      document.body.classList.remove("intro-lock");
      setTimeout(function () { el.remove(); }, reduceMotion ? 0 : 450);
      try { sessionStorage.setItem("shijo-intro-seen", "1"); } catch (e) {}
    }

    if (seen) { el.remove(); return; }

    document.body.classList.add("intro-lock");
    el.addEventListener("click", dismiss);

    if (reduceMotion) {
      dismiss();
      return;
    }

    if (window.gsap) {
      gsap.to(fill, { scaleX: 1, duration: 0.9, ease: "power2.out" });
    } else {
      fill.style.transition = "transform .9s ease";
      requestAnimationFrame(function () { fill.style.transform = "scaleX(1)"; });
    }
    setTimeout(function () { status.textContent = "02 — READY"; }, 650);
    setTimeout(dismiss, 1150);
  })();

  /* ---------------------------------------------------------------------
   * 2. CUSTOM CURSOR (desktop, fine pointer, motion allowed)
   * ------------------------------------------------------------------- */
  (function cursor() {
    if (isTouch || reduceMotion) return;
    var el = document.getElementById("cursor");
    if (!el) return;
    document.body.classList.add("has-custom-cursor");

    var x = 0, y = 0, cx = 0, cy = 0;
    window.addEventListener("mousemove", function (e) { x = e.clientX; y = e.clientY; });

    function loop() {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    }
    loop();

    document.querySelectorAll("a, button, [data-magnetic]").forEach(function (n) {
      n.addEventListener("mouseenter", function () {
        el.classList.add("-link");
        if (n.dataset.cursor === "view") el.classList.add("-view");
      });
      n.addEventListener("mouseleave", function () {
        el.classList.remove("-link", "-view");
      });
    });
  })();

  /* ---------------------------------------------------------------------
   * 3. MAGNETIC BUTTONS
   * ------------------------------------------------------------------- */
  (function magnetic() {
    if (isTouch || reduceMotion) return;
    document.querySelectorAll("[data-magnetic]").forEach(function (n) {
      var strength = 0.28;
      n.addEventListener("mousemove", function (e) {
        var r = n.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        n.style.transform = "translate(" + mx * strength + "px," + my * strength + "px)";
      });
      n.addEventListener("mouseleave", function () {
        n.style.transform = "translate(0,0)";
      });
    });
  })();

  /* ---------------------------------------------------------------------
   * 4. NAV — scroll state, active section, mobile menu
   * ------------------------------------------------------------------- */
  (function nav() {
    var header = document.getElementById("site-nav");
    var onScroll = function () {
      header.classList.toggle("-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var links = document.querySelectorAll(".nav-links a");
    var sections = Array.prototype.map.call(links, function (l) {
      return document.getElementById(l.dataset.sec);
    }).filter(Boolean);

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

    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("mobile-menu");
    var closeBtn = document.getElementById("mm-close");
    function openMenu() {
      menu.classList.add("-open");
      menu.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var first = menu.querySelector("a");
      if (first) first.focus();
    }
    function closeMenu() {
      menu.classList.remove("-open");
      menu.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      toggle.focus();
    }
    if (toggle) toggle.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("-open")) closeMenu();
    });
  })();

  /* ---------------------------------------------------------------------
   * 5. REVEAL ON SCROLL (generic — used sparingly, see CSS notes)
   * ------------------------------------------------------------------- */
  (function reveals() {
    var items = document.querySelectorAll(".reveal, .about-statement, .chapter, .t-node");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (n) { io.observe(n); });
  })();

  /* ---------------------------------------------------------------------
   * 6. SKILLS MATRIX — build + hover/focus/tap expand
   * ------------------------------------------------------------------- */
  (function skills() {
    var grid = document.getElementById("skills-grid");
    if (!grid) return;
    SITE_DATA.skills.forEach(function (cat, i) {
      var row = document.createElement("div");
      row.className = "skill-cat";
      row.tabIndex = 0;
      row.setAttribute("role", "button");
      row.setAttribute("aria-expanded", "false");
      row.innerHTML =
        '<div class="num">' + String(i + 1).padStart(2, "0") + "</div>" +
        '<div>' +
          '<div class="cat-name">' + cat.name + ' <small>' + cat.items.length + ' items</small><span class="chev">+</span></div>' +
          '<div class="skill-items"><div class="skill-items-inner"><div class="skill-tags">' +
            cat.items.map(function (s) { return "<span>" + s + "</span>"; }).join("") +
          '</div></div></div>' +
        '</div>';
      function toggle() {
        var open = row.classList.toggle("-open");
        row.setAttribute("aria-expanded", open ? "true" : "false");
      }
      row.addEventListener("click", toggle);
      row.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });
      grid.appendChild(row);
    });
    // open the first category by default so the section isn't empty-looking
    var first = grid.querySelector(".skill-cat");
    if (first) { first.classList.add("-open"); first.setAttribute("aria-expanded", "true"); }
  })();

  /* ---------------------------------------------------------------------
   * 7. TIMELINE — build nodes + scroll progress fill
   * ------------------------------------------------------------------- */
  (function timeline() {
    var wrap = document.getElementById("timeline-nodes");
    if (!wrap) return;
    SITE_DATA.timeline.forEach(function (t) {
      var node = document.createElement("div");
      node.className = "t-node";
      node.innerHTML =
        '<span class="yr mono">' + t.year + "</span>" +
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
   * 8. ABOUT — line-mask reveal trigger (CSS handles the animation)
   * ------------------------------------------------------------------- */
  (function about() {
    var el = document.getElementById("about-statement");
    if (!el || !("IntersectionObserver" in window)) { if (el) el.classList.add("-in"); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { el.classList.add("-in"); io.unobserve(el); }
      });
    }, { threshold: 0.4 });
    io.observe(el);
  })();

  /* ---------------------------------------------------------------------
   * 9. ARCHIVE LIST
   * ------------------------------------------------------------------- */
  (function archive() {
    var wrap = document.getElementById("archive-list");
    if (!wrap) return;
    SITE_DATA.archive.forEach(function (p, i) {
      var a = document.createElement("a");
      a.className = "arch-row";
      a.href = p.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("data-magnetic", "");
      a.setAttribute("data-cursor", "view");
      a.innerHTML =
        '<span class="num mono">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span><span class="name">' + p.name + '</span><div class="desc">' + p.desc + "</div></span>" +
        '<span class="arr">↗</span>';
      wrap.appendChild(a);
    });
  })();

  /* ---------------------------------------------------------------------
   * 10. ENGINEERING TERMINAL — typed effect (skips instantly if reduced motion)
   * ------------------------------------------------------------------- */
  (function terminal() {
    var el = document.getElementById("eng-term");
    if (!el) return;

    var full = SITE_DATA.terminalLines.map(function (l) {
      return '<span class="p">' + l.p + "</span>\n" + l.o + "\n";
    }).join("\n");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      el.innerHTML = full;
      return;
    }

    var typed = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || typed) return;
        typed = true;
        io.unobserve(el);
        typeLines(SITE_DATA.terminalLines, el);
      });
    }, { threshold: 0.5 });
    io.observe(el);

    function typeLines(lines, target) {
      var li = 0;
      target.innerHTML = "";
      var caret = document.createElement("span");
      caret.className = "caret";

      function nextLine() {
        if (li >= lines.length) { target.appendChild(caret); return; }
        var promptEl = document.createElement("span");
        promptEl.className = "p";
        target.appendChild(promptEl);
        typeText(lines[li].p, promptEl, function () {
          target.appendChild(document.createTextNode("\n"));
          var outEl = document.createElement("span");
          target.appendChild(outEl);
          typeText(lines[li].o, outEl, function () {
            target.appendChild(document.createTextNode("\n\n"));
            li++;
            nextLine();
          }, 14);
        }, 22);
      }
      nextLine();
    }

    function typeText(str, el2, done, speed) {
      var i = 0;
      (function step() {
        if (i <= str.length) {
          el2.textContent = str.slice(0, i);
          i++;
          setTimeout(step, speed);
        } else {
          done();
        }
      })();
    }
  })();

  /* ---------------------------------------------------------------------
   * 11. HERO 3D BACKDROP (three.js) — degrades gracefully
   * ------------------------------------------------------------------- */
  (function heroCanvas() {
    var canvas = document.getElementById("hero-canvas");
    if (!canvas || typeof THREE === "undefined") return;

    var lowPower = isTouch || window.innerWidth < 760;
    var particleCount = reduceMotion ? 0 : (lowPower ? 220 : 620);
    if (particleCount === 0) { canvas.style.display = "none"; return; }

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    } catch (e) { return; }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 9;

    function size() {
      var w = canvas.parentElement.clientWidth;
      var h = canvas.parentElement.clientHeight;
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    size();
    window.addEventListener("resize", size);

    // point field arranged loosely around an icosahedron shell
    var geo = new THREE.IcosahedronGeometry(4.4, lowPower ? 1 : 2);
    var positions = geo.attributes.position;
    var pts = new Float32Array(particleCount * 3);
    for (var i = 0; i < particleCount; i++) {
      var idx = Math.floor(Math.random() * (positions.count));
      pts[i * 3] = positions.getX(idx) + (Math.random() - 0.5) * 0.6;
      pts[i * 3 + 1] = positions.getY(idx) + (Math.random() - 0.5) * 0.6;
      pts[i * 3 + 2] = positions.getZ(idx) + (Math.random() - 0.5) * 0.6;
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pts, 3));
    var pMat = new THREE.PointsMaterial({ color: 0x8b7bff, size: 0.045, transparent: true, opacity: 0.8 });
    var points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    var wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(4.4, 1)),
      new THREE.LineBasicMaterial({ color: 0x58e0c2, transparent: true, opacity: 0.12 })
    );
    scene.add(wire);

    var raf;
    function tick() {
      points.rotation.y += 0.0009;
      points.rotation.x += 0.0003;
      wire.rotation.y += 0.0009;
      wire.rotation.x += 0.0003;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) cancelAnimationFrame(raf);
      else tick();
    });
  })();

  /* ---------------------------------------------------------------------
   * 12. HERO SCROLL TRANSFORM (GSAP ScrollTrigger)
   * ------------------------------------------------------------------- */
  (function heroScroll() {
    if (reduceMotion || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".hero-inner", {
      yPercent: 14,
      opacity: 0.35,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
    gsap.to("#hero-canvas", {
      scale: 1.15,
      opacity: 0.15,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
  })();

  /* ---------------------------------------------------------------------
   * 13. MISC
   * ------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
