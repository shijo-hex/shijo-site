# Shijo Sylan — Personal Portfolio

> A handcrafted software-engineering portfolio built from scratch with HTML, CSS, and vanilla JavaScript — with interactive motion, 3D visuals, and a lightweight personal UPI checkout experience.

🌐 **Live:** https://shijo.me/  
💻 **GitHub:** https://github.com/shijo-hex/shijo-site

---

## ✦ About

**shijo.me** is my personal portfolio, engineering playground, and ongoing experiment in building polished web experiences without hiding everything behind a framework.

The project is intentionally lightweight:

- No React
- No Next.js
- No build pipeline
- No application server
- No database
- No component library

Instead, the core experience is built with:

```text
HTML
CSS
Vanilla JavaScript
Three.js
GSAP
Browser APIs
```

The idea is simple:

> **Less framework. More craft.**

---

## ⚡ What Makes It Different

This isn't intended to be a static résumé placed inside a webpage.

The site experiments with:

- editorial visual design
- interactive motion
- procedural 3D graphics
- scroll-driven storytelling
- custom cursor interactions
- keyboard-accessible interactions
- responsive layouts
- browser-native APIs
- a lightweight direct-UPI checkout experience

The repository is intentionally public so the implementation itself can be explored:

**→ https://github.com/shijo-hex/shijo-site**

---

## 🧩 Features

### Portfolio Experience

- Responsive portfolio layout
- Editorial / brutalist-inspired visual system
- Dark-mode interface
- Animated hero section
- Procedural Three.js background
- GSAP scroll interactions
- Scroll-triggered reveals
- Interactive skills matrix
- Engineering / terminal interface
- Project archive
- Timeline / career journey
- Responsive navigation
- Custom pointer interactions
- Magnetic interactions on pointer devices

### Browser & UX Engineering

- `IntersectionObserver`-based reveals
- `prefers-reduced-motion` support
- `visibilitychange` handling
- Responsive viewport behavior
- Safe-area support
- Keyboard interaction
- `focus-visible` states
- Touch-aware interaction behavior
- Clipboard API integration
- Graceful degradation when advanced effects aren't available

---

# 💳 Personal UPI Checkout

One of the experiments in the portfolio is a small **personal UPI checkout layer**.

Payment page:

**https://shijo.me/pay/**

Source:

**https://github.com/shijo-hex/shijo-site/tree/main/pay**

This is **not a payment gateway** and is deliberately not designed as one.

The project uses a normal personal UPI ID:

```text
shijosylan@oksbi
```

The goal is to explore how far a polished payment experience can be built using browser-native capabilities without introducing an enterprise payment stack.

---

## UPI Architecture

```text
                    SHIJO.ME
                       │
                       ▼
                SUPPORT MY WORK
                       │
                       ▼
              PERSONAL CHECKOUT
                       │
             ┌─────────┴─────────┐
             │                   │
          MOBILE               DESKTOP
             │                   │
        UPI Intent               QR
             │                   │
             ▼                   ▼
          UPI App             Scan QR
             │                   │
             └─────────┬─────────┘
                       ▼
                shijosylan@oksbi
```

The checkout supports:

- preset amounts
- custom amounts
- dynamic UPI payment links
- dynamically generated QR codes
- mobile UPI app launching
- desktop QR fallback
- copy-to-clipboard UPI ID
- payment-state messaging
- mobile fallback handling

---

## Why Not a Payment Gateway?

This project intentionally doesn't try to become Razorpay.

There is no:

- payment aggregator
- merchant dashboard
- payment gateway backend
- API key management
- payment database
- card processing
- payment settlement system
- server-side payment verification

The website simply creates a standard UPI payment request and hands the user over to their UPI app.

That makes the payment feature appropriate for a **personal portfolio / prototype**, while keeping the implementation small enough to understand completely.

---

## Payment Flow

### Mobile

```text
Select amount
     ↓
Pay via UPI
     ↓
upi://pay
     ↓
Installed UPI application
     ↓
User completes payment
```

### Desktop

```text
Select amount
     ↓
QR generated
     ↓
Scan with phone
     ↓
UPI application
     ↓
User completes payment
```

The QR and mobile payment request are generated from the same canonical UPI payment URI.

---

## Important Payment Limitation

The website **does not independently verify UPI transactions**.

Opening a UPI app does not mean that a payment succeeded.

Therefore the frontend never treats:

```text
UPI app opened
```

as:

```text
Payment verified
```

Actual payment verification would require integration with an appropriate payment-processing/acquiring system.

This distinction is intentional.

---

# 🛠 Technology

## Core

- HTML5
- CSS3
- Vanilla JavaScript

## Graphics & Motion

- **Three.js** — procedural 3D visual background
- **GSAP** — scroll-driven animation
- **IntersectionObserver** — viewport-triggered interactions
- CSS transitions / keyframes

## Browser APIs

- Clipboard API
- `IntersectionObserver`
- `ResizeObserver`
- `visibilitychange`
- `matchMedia`
- `prefers-reduced-motion`

## Payment

- UPI URI scheme
- Dynamic UPI QR generation
- Clipboard API
- Mobile deep linking

## Typography

- Archivo Black
- DM Sans
- JetBrains Mono

---

# 📁 Project Structure

```text
shijo-site/
│
├── index.html
│   └── Main portfolio experience
│
├── main.js
│   └── Site data, interactions, animation and UI logic
│
├── pay/
│   └── index.html
│       └── Personal UPI checkout
│
└── README.md
```

Repository:

**https://github.com/shijo-hex/shijo-site**

---

# 🧠 Engineering Principles

The project follows a few simple principles.

### 1. Use the platform first

Before adding another dependency, check whether the browser already provides the required capability.

Examples:

```text
IntersectionObserver
Clipboard API
matchMedia
visibilitychange
native links
CSS media queries
```

---

### 2. Keep the architecture understandable

The project deliberately avoids unnecessary abstraction.

A developer should be able to open the repository and understand how the site works without navigating through dozens of components.

---

### 3. Progressive enhancement

Advanced effects should enhance the website, not define whether it works.

If:

```text
Three.js fails
```

the portfolio should still function.

If:

```text
clipboard isn't available
```

the UPI ID should still be visible.

If:

```text
UPI Intent doesn't work
```

the QR fallback should remain available.

---

### 4. Don't fake capabilities

The payment page does not pretend to know whether a UPI transaction succeeded.

The website knows:

```text
payment request created
```

and:

```text
UPI app launched
```

but without trusted transaction verification it cannot honestly claim:

```text
money received
```

That boundary is intentionally respected.

---

# 📱 Mobile-First Payment UX

The payment page is designed around a simple fallback hierarchy:

```text
1. UPI Intent
       ↓
2. QR
       ↓
3. Copy UPI ID
```

This means the payment experience remains useful even when:

- the preferred UPI app isn't installed
- browser Intent handling doesn't work
- the user is on desktop
- the QR library fails
- clipboard access is unavailable

---

# ♿ Accessibility

Accessibility is treated as part of the implementation rather than an afterthought.

The site includes:

- semantic HTML
- keyboard navigation
- visible focus states
- `focus-visible`
- accessible labels
- `aria-live` status updates
- `aria-pressed` amount controls
- reduced-motion support
- touch-aware interactions
- readable mobile typography

Motion-heavy effects are reduced or disabled when users request reduced motion.

---

# ⚡ Performance

The project intentionally avoids a large application runtime.

Performance considerations include:

- no framework runtime
- no build process
- limited dependencies
- responsive rendering
- reduced particle counts on smaller screens
- pausing Three.js when the page is not visible
- avoiding unnecessary animation on touch devices
- progressive enhancement

The goal isn't to eliminate every dependency.

The goal is to make every dependency worth having.

---

# 🚀 Run Locally

Clone the repository:

```bash
git clone https://github.com/shijo-hex/shijo-site.git
cd shijo-site
```

Start a local HTTP server:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

Using an HTTP server is recommended instead of opening `index.html` directly because some browser APIs and relative paths behave differently under `file://`.

---

# ✏️ Editing the Portfolio

Most portfolio content is organized inside the site's JavaScript data structures.

Typical content includes:

- skills
- projects
- timeline
- engineering interests
- terminal content
- profile information

The visual and interaction logic can remain unchanged while content is updated.

---

# 🔬 Why This Repository Exists

This repository is more than the source code for a portfolio.

It is an ongoing experiment in:

```text
Design
   +
Frontend Engineering
   +
Browser APIs
   +
Motion
   +
Performance
   +
UX
```

The payment page extends that experiment into another area:

```text
Web UX
   +
UPI deep linking
   +
QR fallback
   +
Mobile browser behavior
```

The interesting part isn't the number of technologies used.

It's understanding **where each technology is actually useful**.

---

# 🧭 Roadmap

Possible future improvements:

- richer project case studies
- interactive project demos
- improved mobile navigation
- deeper performance profiling
- local QR generation without a CDN dependency
- more robust UPI Intent diagnostics
- improved payment fallback UX
- accessibility audits
- asset optimization
- additional browser compatibility testing

The project will remain intentionally lightweight unless the problem being solved genuinely requires a more complex architecture.

---

# 👨‍💻 About Me

I'm **Shijo Sylan**, a B.Tech Computer Science student and software developer interested in:

- AI / ML
- full-stack engineering
- backend systems
- developer tools
- product engineering
- interactive web experiences

I enjoy taking ideas from:

```text
"Wouldn't it be cool if..."
```

to:

```text
"Here, it actually works."
```

---

# 🔗 Links

### Portfolio

https://shijo.me/

### Source Code

https://github.com/shijo-hex/shijo-site

### GitHub

https://github.com/shijo-hex

### Payment Prototype

https://shijo.me/pay/

---

# 📄 License

This repository is a personal portfolio project.

The source code is publicly available for learning and reference. Personal branding, identity, content, artwork, and portfolio materials are not intended to be reused as-is.

---

<div align="center">

**Built from scratch by Shijo Sylan.**

`HTML` · `CSS` · `JavaScript` · `Three.js` · `GSAP` · `UPI`

**Less framework. More craft.**

</div>
