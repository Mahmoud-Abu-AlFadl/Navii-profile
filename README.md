# Navii — Smart Assistive Glasses Website

AI-powered smart glasses landing page for a university engineering showcase project.

## Project Structure

```
website/
├── frontend/               # Client-side code
│   ├── index.html           # Main HTML page
│   ├── css/
│   │   └── styles.css       # All styles
│   └── js/
│       └── main.js          # All JavaScript (GSAP animations, interactions)
│
├── backend/                 # Server-side code
│   └── server.js            # Node.js static file server
│
├── package.json             # Project config & npm scripts
└── README.md                # This file
```

## Getting Started

### Option 1: Using Node.js backend server

```bash
# From the website/ directory
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Open directly

Open `frontend/index.html` directly in your browser — everything works without a server.

### Custom Port

```bash
npm start -- --port=8080
```

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **JavaScript** — Vanilla JS with GSAP 3.12 for animations
- **Node.js** — Lightweight static file server (zero dependencies)

## External Libraries (CDN)

- [GSAP 3.12.5](https://greensock.com/gsap/) — Animation library
- [ScrollTrigger](https://greensock.com/scrolltrigger/) — Scroll-based animations
- [Inter](https://fonts.google.com/specimen/Inter) — Body font
- [Syne](https://fonts.google.com/specimen/Syne) — Heading font
