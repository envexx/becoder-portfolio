# Portfolio Hero Design

## Goal

Build the first section of a personal portfolio landing page as a close reinterpretation of the supplied agency reference. The result must feel bold, editorial, clean, and premium while remaining personal, responsive, accessible, and ready for deployment to Vercel.

## Technical foundation

- Next.js App Router with TypeScript
- Tailwind CSS for layout and visual tokens
- Motion for React (`motion/react`) for controlled entrance and interaction motion
- Prisma installed and initialized as the future data layer; the static hero does not query a database
- Lucide React for interface icons
- `next/font` and `next/image` for optimized typography and hero media

## Visual direction

The hero is a rounded, near-viewport canvas surrounded by a warm off-white page gutter. Its dominant surface is a saturated vermilion-to-orange field with restrained texture and large translucent typographic forms in the background. White editorial typography, soft hairline borders, dark pill buttons, and a central monochrome portrait reproduce the energy and hierarchy of the reference without copying its brand.

### Design tokens

- Canvas: `#F3F0E8`
- Hero base: `#F0380B`
- Hero highlight: `#FF4A13`
- Hero shadow/depth: `#C72606`
- Primary ink: `#FAF8F2`
- Dark action: `#17191A`
- Muted light ink: `rgba(255,255,255,.72)`
- Radius: 24px desktop, 18px tablet, 0-16px mobile depending on viewport
- Layout grid: 12 columns desktop, 8 tablet, 4 mobile
- Typography: a characterful neo-grotesk display face paired with a restrained sans body face

The generated global design-system recommendations are advisory. This page specification overrides their navy/gold palette and centered single-column pattern because the approved reference requires a warm, asymmetric, image-led composition.

## Information architecture

1. `Navbar`: personal monogram, current availability, section links, primary contact CTA.
2. `HeroCopy`: eyebrow label, large portfolio statement, compact supporting copy, primary and secondary actions.
3. `HeroPortrait`: replaceable portrait asset and small floating discipline/tool badges.
4. `HeroMetric`: short proof statement and one prominent configurable metric.
5. `TechStrip`: selected technologies or collaborators plus a scroll cue.
6. `PortfolioHero`: owns the layout and coordinates entrance animation.

All visible copy and links live in one typed configuration object so the placeholder content can be replaced without changing component structure.

## Responsive behavior

### Desktop (1024px and above)

Use the approved overlapping three-zone composition: copy on the left, portrait centered and extending to the bottom edge, proof/metric on the right. Navigation stays fully visible. The bottom technology strip aligns to the panel grid.

### Tablet (768-1023px)

Retain a two-column feeling. The portrait moves slightly right and becomes less dominant; the metric sits below the proof statement. Navigation remains available but spacing compresses.

### Mobile (below 768px)

Remove overlap and use a deliberate vertical narrative: compact navbar, copy, CTAs, portrait, then proof/metric and technology strip. Primary actions remain at least 44px tall. Nothing depends on hover, all content remains visible, and the page must not scroll horizontally at 375px.

## Motion

- One orchestrated initial reveal using parent/child variants and short stagger intervals.
- Text and navigation enter with opacity plus a small upward translation.
- The portrait enters from below with a slightly longer, non-bouncy spring.
- Floating badges use a subtle, low-amplitude ambient translation.
- Buttons use 100-150ms hover/focus/tap feedback without layout shift.
- Animate only transform and opacity.
- Respect `prefers-reduced-motion` both in CSS and Motion logic; ambient looping stops entirely.

## Accessibility and interaction

- Semantic links and buttons only; no clickable `div` elements.
- Visible `:focus-visible` ring with sufficient contrast.
- Minimum 44px touch targets on mobile and sensible keyboard tab order.
- Descriptive portrait alt text; decorative background lettering and motion are hidden from assistive technology.
- Normal text must meet WCAG AA contrast.
- Mobile navigation is explicit and keyboard-operable; its actions are not hidden behind hover.

## Portrait replacement contract

The initial build uses a neutral local placeholder so development can proceed before the final photo arrives. The replacement asset should preferably be a high-resolution transparent WebP or PNG portrait with head-and-torso framing. Replacing the configured image path must not require layout changes. `object-position` remains configurable for final art direction.

## Validation

- ESLint, TypeScript, and production build pass.
- Visual review at 375px, 768px, 1024px, and 1440px.
- No horizontal overflow.
- Keyboard navigation and visible focus states verified.
- Reduced-motion behavior verified.
- Above-the-fold portrait uses stable dimensions and is prioritized for LCP.
- Final design audit checks motion gaps, semantics, contrast, responsive behavior, and excessive paint/layout animation.

## Current scope

This milestone creates the project foundation and the hero only. Prisma is prepared for later portfolio content, contact requests, or CMS-like data, but no schema beyond the minimal initialization is required in this milestone.
