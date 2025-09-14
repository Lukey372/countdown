# $TILT → $RADR Migration Countdown

A blazing-fast, visually striking landing page that counts down to the $TILT → $RADR migration window.

## Features

- **Precise Timezone Handling**: Uses Luxon for accurate ET timezone calculations with DST support
- **Three States**: Pre-open, Open, and Closed with automatic state transitions
- **Responsive Design**: Optimized for both full-screen streaming and mobile devices
- **Performance**: CSS-only animations, lean JavaScript timers, static export ready
- **Accessibility**: ARIA live regions, semantic HTML, reduced motion support

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Radr color palette
- **Timezone**: Luxon for precise time calculations
- **Deployment**: Static export ready for any hosting platform

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (creates static export)
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the countdown page.

## Migration Window

- **Opens**: September 23, 2025 at 12:00 PM ET
- **Closes**: September 30, 2025 at 12:00 PM ET
- **Duration**: Exactly 1 week

## Design System

### Colors
- **Radr Orange**: #FF6A00
- **Jet Black**: #0B0B0B  
- **Charcoal**: #171717
- **Slate Grey**: #9CA3AF
- **Soft Grey**: #2A2A2A

### Typography
- **Font**: Inter with system fallbacks
- **Style**: Sleek, high-contrast, minimal

## Deployment

This project is configured for static export and can be deployed to:

- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

The build output will be in the `out/` directory after running `npm run build`.

## Performance

- Lighthouse Score: 95+ on desktop
- No layout shift on countdown updates
- GPU-accelerated animations
- Optimized for streaming environments

## License

© 2025 Radr. All rights reserved.
