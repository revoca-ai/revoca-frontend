<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your Revoca landing page. Here's a summary of what was done:

## Changes made

- **`instrumentation-client.ts`** — Initializes PostHog using the recommended Next.js 15.3+ approach via the `instrumentation-client` file. Includes session recording, exception capture, pageview/pageleave tracking, and a reverse proxy path (`/ingest`).
- **`next.config.ts`** — PostHog reverse proxy rewrites (`/ingest/*` → PostHog ingestion endpoint) and `skipTrailingSlashRedirect: true` to ensure all events are reliably delivered.
- **`components/PostHogProvider.tsx`** — Removed the duplicate `posthog.init()` call (now handled by `instrumentation-client.ts`). The `<PostHogProvider>` wrapper is preserved for React hooks support.
- **`components/Hero.tsx`** — Event capture for "Book a Call" and "Try the Beta" button clicks.
- **`components/Nav.tsx`** — Event capture for "Book a Call", "Full Vision" link, mobile menu toggle, and mobile "Book a Call" clicks.
- **`components/CTA.tsx`** — Event capture for "Book a Call", "Try the Beta", email link, and vision deck link clicks.
- **`components/BotShowcase.tsx`** — Event capture for Telegram bot link and @RevokaBetaBot button clicks.
- **`.env.local`** — Set `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` with the correct values.

## Events instrumented

| Event | Description | File |
|---|---|---|
| `hero_book_call_clicked` | User clicks "Book a Call" in the Hero section | `components/Hero.tsx` |
| `hero_try_beta_clicked` | User clicks "Try the Beta" in the Hero section | `components/Hero.tsx` |
| `nav_book_call_clicked` | User clicks "Book a Call" in the desktop nav | `components/Nav.tsx` |
| `nav_full_vision_clicked` | User clicks "Full Vision" link in the desktop nav | `components/Nav.tsx` |
| `nav_mobile_menu_toggled` | User opens or closes the mobile hamburger menu | `components/Nav.tsx` |
| `nav_mobile_book_call_clicked` | User clicks "Book a Call" in the mobile nav menu | `components/Nav.tsx` |
| `cta_book_call_clicked` | User clicks "Book a Call" in the CTA section | `components/CTA.tsx` |
| `cta_try_beta_clicked` | User clicks "Try the Beta" in the CTA section | `components/CTA.tsx` |
| `cta_email_clicked` | User clicks the email link in the CTA section | `components/CTA.tsx` |
| `cta_vision_deck_clicked` | User clicks "Read the full vision deck" in the CTA section | `components/CTA.tsx` |
| `bot_showcase_telegram_clicked` | User clicks the Telegram Bot link in the Bot Showcase section | `components/BotShowcase.tsx` |
| `bot_showcase_revoka_bot_clicked` | User clicks the @RevokaBetaBot button in the Bot Showcase section | `components/BotShowcase.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/389479/dashboard/1487573
- **Book-a-Call conversion funnel** (pageview → CTA book call): https://us.posthog.com/project/389479/insights/FT8UgnOe
- **Book a Call clicks (all sources)** (trend by placement): https://us.posthog.com/project/389479/insights/ji88nPgz
- **Beta & Telegram engagement** (trend over time): https://us.posthog.com/project/389479/insights/a06xdGWS
- **Vision deck & content engagement** (bar chart): https://us.posthog.com/project/389479/insights/dj5UjYdx
- **CTA engagement comparison** (all CTAs side-by-side): https://us.posthog.com/project/389479/insights/Kg1wTspS

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
