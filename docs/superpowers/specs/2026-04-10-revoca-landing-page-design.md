# Revoca AI Landing Page — Design Spec

## Context

Revoca AI is a context layer for enterprises. It ingests knowledge from GitHub, Docs, Discord, Telegram, and Slack, builds per-employee decision traces and context graphs, then responds as team members in company chats when they're away. The backend (in `/home/alpha/Desktop/lfg/spreek`) is a Python/FastAPI RAG pipeline with persona extraction, hybrid search, and multi-platform bot integrations.

This landing page is the first public-facing surface for the product. Goal: communicate the value prop clearly, look credible and techy, and funnel visitors to a Cal.com booking link. It must deploy to Vercel without a GitHub repo.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (fade-up on scroll, typing effect, pipeline sequence)
- **Fonts:** Inter (body), JetBrains Mono (labels, code, monospace accents)
- **Deployment:** Vercel CLI (`vercel --yes`), no GitHub repo required

## Visual Design

**Theme:** Black + white + grey. No accent colors. Monochrome only.

- Background: `#050505`
- Primary text: `#f0f0f0` (headings), `#ccc` (subheadings), `#666` (body), `#444` (muted)
- Borders: `#161616` base, `#2a2a2a` on hover
- Cards/surfaces: `#0a0a0a`
- No emojis anywhere. Monospace bracket labels like `[ ONBOARD ]` instead.

**Typography:**
- Headings: Inter 800, tight letter-spacing (-2px on hero)
- Section numbers: JetBrains Mono 14px, `#444`
- Body: Inter 400, 13-15px, `#666`
- Code/labels: JetBrains Mono

**Reference:** Inspired by [sin3point14.github.io](https://sin3point14.github.io/) — centered content, numbered sections, fixed side elements, dark background with subtle light accents.

## Layout

All content centered at `max-width: 720px`. Generous whitespace. Fixed side elements create a viewport-wide frame.

**Responsive:** On screens < 768px, pillars stack to single column, pipeline steps stack vertically, bot section stacks (info above mock), border frame side elements and vertical lines hide, nav collapses to hamburger menu. Content padding adjusts to 20px.

## Animated Border Frame

Fixed to viewport, purely decorative:

1. **Vertical lines** on left (40px) and right (40px) edges — `#1a1a1a` base with animated glowing dots (25% white, box-shadow halo) traveling top-to-bottom on a 5s loop, staggered between left/right
2. **Horizontal lines** top and bottom — sliding gradient (`transparent → #1a1a1a → #444 → #1a1a1a → transparent`) on a 6s loop
3. **Corner accents** — lit L-shapes at all 4 corners (#333), 80px arms
4. **Fixed side elements:**
   - Left: GitHub + Twitter/X icons with vertical line to bottom edge
   - Right: `hello@revoca.ai` in vertical text with vertical line to bottom edge

## Page Sections

### Nav (fixed, top)
- Left: `revoca.ai` logo in JetBrains Mono
- Right: `01. About`, `02. How it works`, `03. Integrations`, `[Book a Call]` button
- `rgba(5,5,5,0.85)` background with `backdrop-filter: blur(16px)`
- Bottom border: `#151515`

### Section 0: Hero (100vh)
- Label: `// the context layer for enterprises` in monospace, `#444`
- H1: "Your devs go offline." in `#f0f0f0`
- H2: "Revoca keeps them present." in `#222` (dim, contrast effect)
- Body: "A living context graph of your team's decisions, reasoning, and expertise. When someone's away, Revoca responds in their voice, backed by real decision traces."
- CTA: `[Book a Call →]` — border button, links to `https://cal.com/revoca-ai`
- Subtle radial glow behind hero text

### Section 01: What Revoca Does
3-column grid of cards:

| Card | Label | Title | Description |
|------|-------|-------|-------------|
| 1 | `[ ONBOARD ]` | Dev Onboarding | New devs ramp up in days, not months. Surfaces past decisions, architectural context, and tribal knowledge. |
| 2 | `[ SUPPORT ]` | 24/7 Customer Support | Team's expertise available around the clock. Bot responds in members' voice, backed by decision history. |
| 3 | `[ CONTEXT ]` | Never Out of Office | Context graph of each employee's decisions and reasoning. Team never loses momentum. |

Cards: `#0a0a0a` background, `#161616` border, hover lifts to `#2a2a2a` border with subtle glow.

### Section 02: How It Works
Horizontal 3-step pipeline:

```
[connect] --->  [ingest] --->  [respond]
```

- **connect:** "Link your GitHub, Docs, Discord, Slack, Telegram"
- **ingest:** "Build decision traces and context graphs per member"
- **respond:** "AI replies as your team in company chats, 24/7"

Animation: sequential light-up of each step with arrow pulse.

### Section 03: Meet the Bots
- Handle: `@revoca-ai` in monospace badge
- Status badges:
  - Telegram Bot: `LIVE` (green badge `#4a8a4a` text, `#0a1a0a` bg, subtle glow)
  - Discord Bot: `COMING SOON` (yellow badge `#8a8a4a` text, `#141408` bg)
- Feature list with `▹` bullets:
  - Persona-based replies in each member's voice
  - Backed by real decision traces, not hallucinations
  - Clearly disclosed as AI, transparent by design
  - Per-channel routing to different team members
- Mock Discord chat box:
  ```
  # engineering
  dev_jane: @revoca-ai why did we choose PostgreSQL over MongoDB for the auth service?
  revoca-ai: We went with Postgres because we needed ACID transactions for the session store. Alex discussed this in the arch review on March 2nd...
  AI reply, voice: alex_lead
  ```
  Animation: typing effect on the bot response.

### Section 04: Integrations
5 connector icons in a row, centered:

| Connector | Icon |
|-----------|------|
| GitHub | GitHub SVG |
| Docs | Document SVG |
| Discord | Discord SVG |
| Telegram | Telegram SVG |
| Slack | Slack SVG |

Icons: 52x52px boxes, `#0a0a0a` bg, `#161616` border, SVG fill `#555` (hover: `#999`, border glow).

### Section 05: Get In Touch (final CTA)
- H2: "Get In Touch"
- Body: "See how Revoca can turn your team's scattered knowledge into a living, always-on context layer."
- CTA: `[Book a Call →]` — links to `https://cal.com/revoca-ai`

### Footer
- "Built by Revoca AI" in JetBrains Mono, `#2a2a2a`
- Top border: `#111`

## Animations (Framer Motion)

| Element | Animation | Trigger |
|---------|-----------|---------|
| Each section | Fade-up + 20px Y-translate | Scroll into viewport (IntersectionObserver) |
| Hero text | Staggered fade-in (label → h1 → h2 → p → cta) | Page load |
| Pipeline steps | Sequential light-up, left to right | Scroll into viewport |
| Bot mock response | Typing effect, characters appear one by one | Scroll into viewport |
| Border frame dots | Continuous top-to-bottom travel | Always running |
| Connector icons | Subtle scale + glow on hover | Hover |
| CTA buttons | Border glow + box-shadow on hover | Hover |

All animations: CSS transitions for hovers, Framer Motion for scroll-triggered. No heavy libraries.

## Vercel Deployment (No GitHub Repo)

Steps to deploy:
1. Install Vercel CLI: `npm i -g vercel`
2. From project root: `vercel --yes`
3. Follow prompts (login, project name)
4. For production: `vercel --prod`

No GitHub repo needed. Vercel CLI deploys directly from local files.

## File Structure

```
landing-page/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page, assembles all sections
│   └── globals.css         # Tailwind base + custom animations
├── components/
│   ├── Nav.tsx             # Fixed nav bar
│   ├── Hero.tsx            # Hero section
│   ├── Pillars.tsx         # 3-column feature cards
│   ├── Pipeline.tsx        # How it works pipeline
│   ├── BotShowcase.tsx     # Bot section with mock chat
│   ├── Connectors.tsx      # Integration icons
│   ├── CTA.tsx             # Final call-to-action
│   ├── Footer.tsx          # Footer
│   ├── BorderFrame.tsx     # Animated border + corner accents
│   ├── SideElements.tsx    # Fixed left/right side elements
│   └── FadeIn.tsx          # Reusable Framer Motion wrapper
├── public/
│   └── (favicon, og-image if needed)
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Key Links

- Cal.com booking: `https://cal.com/revoca-ai`
- Discord bot handle: `@revoca-ai`
- Telegram bot: live
- Discord bot: coming soon

## Verification

1. `npm run dev` — site loads at localhost:3000
2. All 6 sections render correctly
3. Animations play on scroll (fade-up) and on load (hero stagger)
4. Bot mock typing animation works
5. Border frame dots animate continuously
6. "Book a Call" buttons link to `https://cal.com/revoca-ai`
7. Nav links scroll to correct sections
8. Responsive: content stacks on mobile, border frame hides on small screens
9. `vercel --yes` deploys successfully
10. Lighthouse performance score > 90
