# ParSec Website - Project Memory

## Project Overview
- **Name**: ParSec (parsec.solutions)
- **Type**: AI Automation Agency website
- **Founder**: Omar Mosallam
- **Target Markets**: Egypt, Saudi Arabia, UAE (MENA region)
- **Tagline**: "We Build, You Grow"

## Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS
- Framer Motion for animations
- Vercel for deployment (serverless functions in `/api`)
- Claude API for AI features (chat, image analysis)

## Brand Colors
- Primary Navy: `#2D4769`
- Purple Accent: `#8B5CF6`
- Green Success: `#10B981`
- Light Gray: `#8EA3B5`
- Border Gray: `#E1E6EB`

## Key Components
- **Hero.tsx**: Main landing section with logo, typewriter, video
- **Terminal.tsx**: Interactive AI chat console (PARSEC_NODE_CAIRO)
- **ServicesGrid.tsx**: Three service pillars (Automate, Brand, Grow)
- **ROICalculator.tsx**: Interactive savings calculator
- **LiveMetrics.tsx**: Animated statistics counter
- **Comparison.tsx**: Before/after comparison cards
- **Playground.tsx**: AI image analysis demo
- **CaseStudies.tsx**: Narrative arc format (Nightmare → Magic → Reality)

## API Endpoints
- `/api/chat` - Claude-powered chat for Terminal
- `/api/analyze-image` - Claude Vision for Playground

## Current Branch
- `feature/enhancement` - Contains all new features

## Important Design Notes
- Mobile-first responsive design
- Logo container must remain square (use `aspect-square shrink-0`)
- Hero section scaled down on mobile (`scale-[0.6] md:scale-100`)
- No emojis unless explicitly requested
- Premium, professional tone

## MENA-Specific Features
- Native Arabic support (Egyptian, Gulf, Levantine dialects)
- WhatsApp-first workflows
- Local data residency
- Vision 2030 alignment

## Case Studies (Real Clients)
1. **Sigma Contractors** - Commercial Fit-out, 80% bidding overhead reduction
2. **Prime Dental** - Healthcare, 24/7 voice agent
3. **Al-Faisal Real Estate** - 3x lead conversion via WhatsApp

## Dev Commands
```bash
npm run dev     # Start dev server (localhost:3000)
npm run build   # Production build
```

## Premium Playground Features (Experiment Lab)
New interactive features added to demonstrate AI automation capabilities:

### Components (components/playground/)
- **AutomationQuiz**: Industry-specific branching quiz with scoring
- **DocProcessorDemo**: Invoice/receipt data extraction demo
- **WhatsAppWidget**: High-fidelity WhatsApp chat simulation
- **AgentConfigurator**: Visual drag-and-drop agent builder
- **WorkflowLibrary**: n8n template downloads with gating
- **IntegrationShowcase**: Expandable integration grid
- **TrustSignals**: Live activity ticker and metrics
- **LanguageToggle**: Arabic/English language switcher

### State Management
- Zustand store: `store/playground-store.ts`
- Quiz questions & data: `lib/playground-data.ts`

### Features
- Bilingual support (Arabic/English)
- Industry-specific content (Real Estate, Healthcare, Construction, E-commerce)
- WhatsApp-first lead capture (MENA market preference)
- Persistent session state via localStorage

## Session Notes
- User prefers autonomous work with minimal interruptions
- Always test frontend and backend before confirming completion
- Commit changes with descriptive messages
