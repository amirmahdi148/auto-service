# اتوسرویس — Auto Service Marketplace

A Persian-first, RTL auto service marketplace. Users browse services, read blogs, book appointments; specialists manage customers, services, and reviews.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **UI** | React 19 + TypeScript ~6.0 |
| **Build** | Vite 8 |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Routing** | React Router v8 (`react-router`) |
| **Server State** | TanStack React Query v5 |
| **HTTP Client** | Axios |
| **API Mocking** | MSW v2 (Mock Service Worker) |
| **Icons** | Lucide React |
| **Lint** | ESLint + `typescript-eslint` |
| **Typography** | Vazirmatn (Google Fonts) |

---

## Project Structure

```
src/
├── api/                      # MSW mock handlers + seed data
│   ├── browser.ts            # Service worker setup
│   ├── handlers.ts           # All mock endpoint handlers
│   └── data/                 # Mock data (blogs, bookings, services)
├── components/               # Reusable UI components
│   ├── Aboutus/              # About page sections
│   ├── BlogArticle/          # Single article blocks (content renderer, TOC, share)
│   ├── Blogs/                # Blog list (grid, featured, header)
│   ├── Dashboard/            # Dashboard widgets (KPI, charts, tables, modals)
│   ├── Homepage/             # Landing sections (hero, services, testimonials, etc.)
│   ├── Services/             # Public service catalog (grid, header)
│   └── shared/               # Header, Footer, PublicLayout, ModalWrapper
├── contexts/                 # React context providers
│   ├── AuthContext.tsx        # Fetches user via GET /api/auth/me
│   └── useAuth.ts            # AuthContext value type + hook
├── hooks/                    # Custom hooks (useInView)
├── pages/                    # Route-level page components
│   ├── Dashboard/            # Protected pages (overview, bookings, vehicles, etc.)
│   ├── Aboutuspage.tsx
│   ├── Blogs.tsx
│   ├── Homepage.tsx
│   ├── Login.tsx
│   ├── Services.tsx
│   └── SingleBlog.tsx
├── types/                    # TypeScript interfaces
│   ├── auth.ts               # AuthUser, UserRole
│   ├── handler.ts            # Partner
│   └── Homepage/health.ts    # Health
├── utils/
│   ├── HttpService.ts        # Axios wrapper (GET/POST/PUT/PATCH/DELETE)
│   └── useInView.ts
├── App.tsx                   # Root route definitions
├── index.css                 # Tailwind + global styles
└── main.tsx                  # Entry: QueryClientProvider, BrowserRouter, MSW bootstrap
```

---

## Routes

### Public (`<PublicLayout>` — Header + Outlet + Footer)

| Path | Page |
|------|------|
| `/` | Homepage |
| `/aboutus` | About Us |
| `/blogs` | Blog list |
| `/blog/:slug` | Single article |
| `/services` | Service catalog |
| `/login` | Login |

### Dashboard (`<AuthProvider>` + `<DashboardLayout>` — Sidebar + Outlet)

| Path | Role | Page |
|------|------|------|
| `/dashboard` | — | Redirects to `/overview` |
| `/dashboard/overview` | both | KPI, charts, recent activity |
| `/dashboard/bookings` | both | Booking table with filters |
| `/dashboard/settings` | both | Profile settings |
| `/dashboard/vehicles` | user | My vehicles |
| `/dashboard/favorites` | user | Favorite centers |
| `/dashboard/support` | user | Support tickets |
| `/dashboard/customers` | specialist | Customer list |
| `/dashboard/services` | specialist | Manage services |
| `/dashboard/reviews` | specialist | Manage reviews |

---

## Auth

Two roles: `user` (customer) and `specialist` (service provider).

- `AuthContext` calls `GET /api/auth/me` on mount via React Query (5 min stale time, no retry)
- `RequireRole` component guards dashboard routes; redirects to `/login` if unauthorized
- JWT is optional — toggled via `VITE_JWT` env variable; token stored in `localStorage`
- Login page calls `POST /api/login`

---

## API Mocking

In development, MSW intercepts all `/api/*` requests. The worker is bootstrapped in `main.tsx` from `src/api/browser.ts`. Handlers and seed data live in `src/api/`. See `backend.md` for the full endpoint reference.

---

## Design

- **RTL** — Persian-first layout with `dir="rtl"` on `<html>`
- **Colors** — Deep Blue (#1A3B5C) primary, Red (#E63946) accent, cool grey neutrals
- **Typography** — Vazirmatn exclusively (weights 400–800)
- **Grid** — Fluid 12-column (desktop), 4-column (mobile), 4px baseline spacing
- **Shapes** — Soft 4px–12px corner radii
- See `DESIGN.md` for full design system spec
