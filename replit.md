# Riyadh Elementary School Platform

## Overview

This is a comprehensive school management portal for Al-Riyadh Elementary School (مدرسة الرياض الابتدائية). The platform serves as a unified gateway to multiple school administrative systems, providing a central dashboard with KPI tracking and navigation to external subsystems covering financial management, exams, student affairs, technical operations, and educational activities.

The application is built with a React frontend and Express backend, using TypeScript throughout. It follows a hub-and-spoke architecture where this main portal connects to 16+ external subsystem applications hosted on separate subdomains.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with shadcn/ui component library
- **Build Tool**: Vite with custom plugins for meta images and Replit integration
- **Language Support**: Right-to-left (RTL) Arabic interface with Cairo font

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: HTTP server with development hot-reload via Vite middleware
- **Build**: esbuild for production bundling with selective dependency bundling for faster cold starts
- **Static Serving**: Built frontend served from `dist/public` in production

### Authentication
- Simple client-side authentication with localStorage
- Hardcoded credentials for admin access (username: "admin", password: "Riyadh@2854")
- Protected routes redirect unauthenticated users to login page

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` with Zod validation via drizzle-zod
- **Current Storage**: In-memory storage implementation (`MemStorage` class)
- **Database Ready**: Drizzle config expects `DATABASE_URL` environment variable for PostgreSQL connection

### Hub Architecture
The dashboard organizes systems into three main categories:
1. **School Affairs** (الشؤون المدرسية) - Financial, tasks, learning resources, building maintenance
2. **Educational Affairs** (الشؤون التعليمية) - Exams hub, technical work tracking
3. **Student Affairs** (شؤون الطلاب) - Activities, counseling, health supervision, bus violations

### KPI Dashboard
- Real-time aggregation of statistics from external subsystems
- Fetches `/api/stats` endpoint from each external system with 5-second timeout
- Displays completion rates, task counts, and system online status

## External Dependencies

### External Subsystems (16 applications)
All hosted on `*.riyadhplatform.tech` subdomains:
- Financial system, Task management, Learning resources, Building maintenance
- Exam question delivery, Exam follow-up, Results analysis
- School timetables, Portfolio management, Follow-up records
- Written work supervision, Technical visits
- Student activities, Student counseling, Health supervision, Bus violations

### Third-Party Services
- **Google Fonts**: Cairo (Arabic) and Inter font families
- **Replit Plugins**: Cartographer, dev banner, runtime error overlay (development only)

### Key npm Dependencies
- UI: Radix UI primitives, Framer Motion, Lucide icons, cmdk
- Forms: React Hook Form with Zod resolver
- Data: TanStack React Query, date-fns
- Database: Drizzle ORM, pg (PostgreSQL client), connect-pg-simple for sessions

## Recent Changes (Feb 2026)

### Comprehensive UI/UX Redesign
- **Login Page**: Redesigned with gradient background, animated elements, show/hide password toggle, loading state
- **Dashboard**: Added search bar (desktop + mobile), greeting with Hijri date, quick access grid for all 17 systems, mobile hamburger menu
- **KPI Dashboard**: Added connectivity progress bar, improved status indicators, cleaner metric display
- **System Cards**: Redesigned with color-mapped styles, smooth hover effects, better icon containers
- **Hub Pages**: Created shared `HubLayout` component with breadcrumb navigation, consistent header/footer, home button
- **404 Page**: Redesigned with Arabic text and animated elements
- **Performance**: Implemented React.lazy() code splitting for all pages, Suspense with loading fallback
- **Meta Tags**: Updated OG/Twitter cards with proper Arabic descriptions, added theme-color
- **Responsive**: Improved mobile menu, search, and KPI display for all screen sizes

### Key Components
- `client/src/components/hub-layout.tsx` - Shared layout for all hub/sub-pages with breadcrumbs
- `client/src/components/system-card.tsx` - Redesigned card with color mapping
- `client/src/components/kpi-dashboard.tsx` - Live stats from 8 external systems