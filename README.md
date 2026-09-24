# Shijo Sylan — Portfolio

> A handcrafted, dark editorial portfolio for **Shijo Sylan**, focused on AI/ML, full-stack development, and product engineering.

🌐 **Live:** https://shijo.me/  
💻 **Source:** https://github.com/shijo-hex/shijo-site

---

## ✦ Overview

**shijo.site** is my personal portfolio and engineering playground.

The site is intentionally built without a framework or build step. Instead of relying on a large component library, it uses semantic HTML, custom CSS, and vanilla JavaScript to keep the experience lightweight, fast, and easy to understand.

The goal is simple:

**show the work, show the thinking, and make the interaction memorable.**

---

## ⚡ Highlights

- Editorial dark-mode visual system
- Responsive layout for desktop, tablet, and mobile
- Intro/loading experience with session persistence
- Custom cursor and magnetic interactions on pointer devices
- Scroll-based section reveals using `IntersectionObserver`
- Animated skills matrix with keyboard support
- Interactive engineering / terminal section
- Timeline documenting the evolution from CS foundations to AI + systems work
- Three.js particle / wireframe hero backdrop
- GSAP-driven hero scroll animation
- `prefers-reduced-motion` support
- Accessible focus states and keyboard interactions
- SEO and social metadata
- Dedicated universal UPI payment page
- Mobile UPI deep linking + desktop QR flow
- No application server or database required

---

## 🧠 What the Site Represents

The portfolio is structured around a few areas of work:

| Area | Focus |
| --- | --- |
| AI / ML | Machine learning, generative AI, NLP, data-driven systems |
| Full Stack | React, TypeScript, Node.js, APIs, frontend engineering |
| Backend | FastAPI, Python, data + service-oriented systems |
| Engineering | Git, GitHub, Docker, product development |
| Product | Building useful software end-to-end |

---

## 🛠 Tech Stack

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- Responsive CSS
- CSS custom properties

### Interaction & Motion

- **GSAP** — scroll-driven hero animation
- **Three.js** — procedural 3D particle / wireframe backdrop
- **IntersectionObserver** — reveal, timeline, and terminal interactions
- CSS transitions and keyframes

### Typography

- Space Grotesk
- Inter
- JetBrains Mono

### Payments

- Standard `upi://pay` deep links
- Dynamic UPI QR generation
- Clipboard API

---

## 🎬 Interaction Design

A major part of the project is making the portfolio feel like an interface rather than a static résumé.

### Hero

The opening section combines typography, metadata, motion, and a lightweight Three.js visual field. As the page scrolls, the hero content and 3D backdrop respond to the scroll position.

### Cursor

On desktop / fine-pointer devices, the site uses a custom cursor that expands over interactive elements and can display contextual UI such as `VIEW`.

### Magnetic Interactions

Selected links use a small pointer-following transform to give buttons and archive items a tactile feel without adding heavy libraries.

### Scroll Reveals

Sections progressively enter the viewport using `IntersectionObserver`, keeping the animation model simple and avoiding a large animation runtime for basic reveals.

### Terminal

The engineering section presents a small command-line style interface and types its output when it enters the viewport.

---

## 💳 Universal UPI Support

The project includes a dedicated payment experience at:

**https://shijo.site/pay/**

It uses a standard UPI URI rather than locking the experience to a specific provider.

### Payment Flow

**Mobile**

1. Choose an amount.
2. Tap **Pay via UPI**.
3. The browser attempts to open a compatible installed UPI app.

**Desktop**

1. Choose an amount.
2. Scan the generated QR code using a UPI app on your phone.

The page also exposes the UPI ID directly with a copy action.

> UPI ID: `shijosylan@oksbi`

---

## 📁 Project Structure

```text
shijo-site/
├── index.html          # Main portfolio page
├── main.js             # Site content + interactions + animation logic
├── pay/
│   └── index.html      # Universal UPI payment page
└── README.md
```

One deliberate design choice is keeping portfolio content in a single `SITE_DATA` object near the top of `main.js`.

This makes common content updates possible without touching the page markup.

---

## 🚀 Run Locally

Because the project is currently a static site with no build step, you can run it with any simple local HTTP server.

### Using Python

```bash
git clone https://github.com/shijo-hex/shijo-site.git
cd shijo-site
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

> Using a local HTTP server is recommended instead of opening `index.html` directly so browser APIs and relative paths behave consistently.

---

## ✏️ Updating Content

Most portfolio content lives in the `SITE_DATA` object near the top of `main.js`.

You can update:

- Skills
- Timeline / journey
- Project archive
- Terminal output

without rewriting the rendering or interaction logic.

---

## ♿ Accessibility & Performance

The project intentionally includes several graceful-degradation paths:

- Respects `prefers-reduced-motion`
- Disables motion-heavy effects for reduced-motion users
- Avoids the custom cursor on touch / coarse-pointer devices
- Provides visible `focus-visible` states
- Supports keyboard interaction for expandable skill rows
- Uses semantic links and buttons
- Handles lower-power / smaller-screen Three.js rendering with fewer particles
- Pauses the Three.js animation when the page is not visible
- Uses responsive sizing rather than fixed desktop-only layouts

---

## 📈 Direction

This repository is also an evolving experiment.

Planned improvements include:

- richer case-study pages
- deeper project storytelling
- more refined page transitions
- stronger accessibility coverage
- performance profiling and asset optimization
- a more componentized architecture as the site grows

The visual direction may evolve, but the principle stays the same:

> **Less framework. More craft.**

---

## 👤 About Me

I'm **Shijo Sylan**, a B.Tech Computer Science student and software developer interested in:

- AI / ML
- Full-stack engineering
- Backend systems
- Developer tools
- Product-focused software

I'm especially interested in turning ideas into working systems rather than stopping at prototypes.

---

## 🔗 Connect

- Website: https://shijo.me/
- GitHub: https://github.com/shijo-hex

---

## 📄 License

This project is a personal portfolio website.

The source is public for learning and reference, but the personal branding, content, assets, and identity represented here are not intended to be reused as-is.
