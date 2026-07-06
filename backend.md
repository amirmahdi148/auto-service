# Backend Guide — Auto Service

How the frontend fetches data, connects to APIs, and what endpoints the backend needs to provide.

---

## HTTP Layer

**File:** `src/utils/HttpService.ts`

A thin axios wrapper that all API calls flow through.

- **Base URL:** `VITE_API_URL` env var (defaults to `""` — same origin)
- **JWT:** controlled by `VITE_JWT` env var (`"true"` enables Bearer token from `localStorage("access_token")`)
- **Methods:** `get`, `post`, `put`, `patch`, `delete` — all generic `<T>` returning `Promise<T>`
- **Query params:** auto-strips `undefined` values before sending
- **Current config:** `VITE_JWT=false` — no auth headers sent

---

## Development Mocking (MSW)

In dev mode, **MSW** intercepts all `/api/*` requests in the browser via a service worker.

- Bootstrapped in `src/main.tsx` (dynamic import, graceful fallback if MSW fails)
- Worker setup: `src/api/browser.ts`
- Handlers: `src/api/handlers.ts`
- Seed data: `src/api/data/` (blogs, bookings, services)

When connecting a real backend, MSW should be disabled (or limited to tests). All endpoints below are where MSW currently stands in.

---

## Data Fetching Pattern

The app uses **TanStack React Query v5** (`@tanstack/react-query`) for all server-state:

- `useQuery` — reads (GET requests)
- `useMutation` — writes (POST/PUT/PATCH/DELETE)
- `QueryClientProvider` wraps the entire app in `main.tsx`
- Auth uses `staleTime: 5 * 60 * 1000` (5 min cache); most other queries use defaults

---

## Auth Flow

1. `AuthProvider` (wraps dashboard routes) calls `GET /api/auth/me` on mount
2. Exposes `{ user, isLoading, isError, role }` via `useAuth()` hook
3. `RequireRole` component checks `role` and redirects:
   - Loading → `FullPageLoader`
   - Unauthenticated → `/login`
   - Wrong role → `/dashboard/overview`
4. `Login` page calls `POST /api/login` — on success navigates to `/dashboard`

---

## Required API Endpoints

### Currently consumed by the frontend

| # | Method | Path | Called From | Query Params | Request Body | Response Shape |
|---|--------|------|-------------|--------------|--------------|----------------|
| 1 | `GET` | `/api/auth/me` | `AuthContext.tsx` | — | — | `{ status: string, role: "user"\|"specialist", name: string, username: string, phone: string, avatar: string }` |
| 2 | `POST` | `/api/login` | `Login.tsx` | — | `{ email: string, password: string }` | `{ success: boolean, message: string }` |
| 3 | `GET` | `/api/blogs` | `Blogs.tsx` | `page, limit, category, search` | — | `{ data: ApiPost[], meta: { page, limit, totalPages, totalItems } }` |
| 4 | `GET` | `/api/blogs/:slug` | `SingleBlog.tsx` | — | — | `ApiPostDetail` (includes `content: ContentBlock[]`) |
| 5 | `GET` | `/api/bookings` | `BookingsPage.tsx`, `UserUpcomingBookings.tsx` | `page, limit, status, search, sortBy, sortOrder` | — | `{ data: Booking[], meta: { page, limit, totalPages, totalItems } }` |
| 6 | `POST` | `/api/bookings` | *(NewBookingModal — ready for integration)* | — | booking object | `{ success: boolean, id: string, ...fields }` |
| 7 | `GET` | `/api/services` | `Services.tsx` | `category, search` | — | `{ data: ServiceItem[], categories: ServiceCategory[], meta: { total } }` |
| 8 | `GET` | `/api/top-centers` | `TopCenters.tsx` (OverviewPage) | — | — | `{ name: string, rating: string, bookings: number, share: number }[]` |

### Data types for the above responses

```typescript
// Auth
type UserRole = "user" | "specialist";
interface AuthUser {
  status: string;
  role: UserRole;
  name: string;
  username: string;
  phone: string;
  avatar: string;
}

// Blog list item
interface ApiPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;         // Persian date string
  readTime: string;
  featured?: boolean;
  slug?: string;
}

// Blog detail (adds content)
interface ApiPostDetail extends ApiPost {
  content: ContentBlock[];
}
type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "callout"; title: string; text: string };

// Booking
type BookingStatus = "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
interface Booking {
  id: string;
  customer: string;
  phone: string;
  service: string;
  vehicle: string;
  plate: string;
  center: string;
  date: string;         // Persian display date
  dateISO: string;      // ISO 8601 for sorting
  time: string;         // HH:MM
  amount: number;       // tomans
  status: BookingStatus;
}

// Service
interface ServiceItem {
  id: number;
  category: string;
  title: string;
  desc: string;
  duration: string;
  rating: number;
  reviewCount: number;
  fromPrice: number;     // tomans
}
interface ServiceCategory {
  label: string;
}

// Top center
interface TopCenter {
  name: string;
  rating: string;        // Persian digit string (e.g. "۴.۹")
  bookings: number;
  share: number;
}
```

---

## APIs Still Needed (currently local state only)

These dashboard pages use hardcoded/local state data. They need backend endpoints to function fully.

---

### Vehicles

| Method | Path | Role | Purpose |
|--------|------|------|---------|
| `GET` | `/api/vehicles` | user | List user's vehicles |
| `POST` | `/api/vehicles` | user | Add a vehicle |
| `PUT` | `/api/vehicles/:id` | user | Update a vehicle |
| `DELETE` | `/api/vehicles/:id` | user | Remove a vehicle |

**Types:**
```typescript
interface Vehicle {
  id: number;
  name: string;            // e.g. "پژو ۲۰۶"
  plate: string;           // e.g. "۱۲ ب ۳۴۵ ایران ۶۷"
  type: string;            // e.g. "سواری" | "شاسی‌بلند" | "وانت"
  year: string;            // e.g. "۱۴۰۲"
  lastService: string;     // Persian relative, e.g. "۲ ماه پیش"
  status: "ok" | "needs-service";
}
// GET /api/vehicles → Vehicle[]
// POST /api/vehicles body: { name, plate, type, year } → Vehicle
// PUT /api/vehicles/:id body: { name, plate, type, year } → Vehicle
// DELETE /api/vehicles/:id → { success: boolean }
```

---

### Favorites

| Method | Path | Role | Purpose |
|--------|------|------|---------|
| `GET` | `/api/favorites` | user | List favorite centers |
| `POST` | `/api/favorites` | user | Add a center to favorites |
| `DELETE` | `/api/favorites/:id` | user | Remove from favorites |

**Types:**
```typescript
interface FavoriteCenter {
  id: number;
  name: string;            // e.g. "مرکز خدمات آریا"
  address: string;
  rating: number;          // 0–5
  reviews: number;         // review count
  phone: string;
  isOpen: boolean;
}
// GET /api/favorites → FavoriteCenter[]
// POST /api/favorites body: { centerId: number } → FavoriteCenter
// DELETE /api/favorites/:id → { success: boolean }
```

---

### Support Tickets

| Method | Path | Role | Purpose |
|--------|------|------|---------|
| `GET` | `/api/support/tickets` | user | List support tickets |
| `POST` | `/api/support/tickets` | user | Create a new ticket |
| `PUT` | `/api/support/tickets/:id` | user | Update ticket title |
| `POST` | `/api/support/tickets/:id/messages` | user | Add a message to a ticket |

**Types:**
```typescript
interface TicketMessage {
  id: string;
  from: "user" | "support";
  text: string;
  time: string;            // Persian relative or HH:MM
}

interface Ticket {
  id: string;              // e.g. "T-1001"
  title: string;
  status: "open" | "closed";
  date: string;            // Persian relative, e.g. "امروز، ۱۰:۳۰"
  lastMessage: string;
  messages: TicketMessage[];
}
// GET /api/support/tickets → Ticket[]
// GET /api/support/tickets/:id → Ticket (full detail)
// POST /api/support/tickets body: { title: string, message: string } → Ticket
// PUT /api/support/tickets/:id body: { title: string } → Ticket
// POST /api/support/tickets/:id/messages body: { text: string } → TicketMessage
```

---

### Customers (Specialist)

| Method | Path | Role | Purpose |
|--------|------|------|---------|
| `GET` | `/api/customers` | specialist | List customers |
| `GET` | `/api/customers/:id` | specialist | Customer detail |

**Types:**
```typescript
interface Customer {
  id: string;
  name: string;
  phone: string;
  vehicles: number;         // count
  totalVisits: number;
  lastVisit: string;        // Persian relative, e.g. "۲ روز پیش"
  status: "active" | "inactive";
}
// GET /api/customers → Customer[]
//   Query params: search (name/phone), status, page, limit
// GET /api/customers/:id → Customer (full detail with vehicle list, visit history)
```

---

### Dashboard Services (Specialist manages their own services)

| Method | Path | Role | Purpose |
|--------|------|------|---------|
| `GET` | `/api/dashboard/services` | specialist | List managed services |
| `POST` | `/api/dashboard/services` | specialist | Add a service |
| `PUT` | `/api/dashboard/services/:id` | specialist | Update a service |
| `DELETE` | `/api/dashboard/services/:id` | specialist | Remove a service |

**Types:**
```typescript
interface DashboardService {
  id: string;
  name: string;             // e.g. "تعویض روغن موتور و فیلترها"
  duration: string;         // e.g. "۴۵ دقیقه"
  basePrice: number;        // tomans
  status: "active" | "inactive";
}
// GET /api/dashboard/services → DashboardService[]
//   Query params: search (name)
// POST /api/dashboard/services body: { name, duration, basePrice, status } → DashboardService
// PUT /api/dashboard/services/:id body: { name, duration, basePrice, status } → DashboardService
// DELETE /api/dashboard/services/:id → { success: boolean }
```

---

### Reviews (Specialist)

| Method | Path | Role | Purpose |
|--------|------|------|---------|
| `GET` | `/api/reviews` | specialist | List reviews |
| `PUT` | `/api/reviews/:id/status` | specialist | Approve/reject review |

**Types:**
```typescript
interface Review {
  id: string;
  customerName: string;
  serviceName: string;
  rating: number;           // 1–5
  comment: string;
  date: string;             // Persian relative
  status: "pending" | "approved" | "rejected";
}
// GET /api/reviews → Review[]
//   Query params: status, search (customer/service name), page, limit
// PUT /api/reviews/:id/status body: { status: "approved" | "rejected" } → Review
```

---

### Specialist Dashboard — Overview Widgets

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/dashboard/revenue` | Revenue chart data |
| `GET` | `/api/dashboard/kpis` | KPI cards |
| `GET` | `/api/dashboard/activity` | Recent activity feed |
| `GET` | `/api/dashboard/popular-services` | Popular services ranking |

**Types:**
```typescript
// GET /api/dashboard/revenue
//   Query params: period ("week" | "month" | "year")
//   Response:
interface RevenueResponse {
  total: number;            // e.g. 52400000 (tomans)
  change: number;           // percentage, e.g. 18
  series: { day: string; value: number }[];  // value = percentage of peak
}

// GET /api/dashboard/kpis → Kpi[]
interface Kpi {
  label: string;            // e.g. "درآمد این ماه"
  value: string;            // formatted, e.g. "۵۲٬۴۰۰٬۰۰۰"
  unit: string;             // e.g. "تومان"
  trend: "up" | "down";
  change: string;           // e.g. "٪۱۸"
  sub: string;              // e.g. "نسبت به ماه قبل"
}

// GET /api/dashboard/activity → ActivityItem[]
interface ActivityItem {
  text: string;
  time: string;             // Persian relative, e.g. "۵ دقیقه پیش"
  type: "booking" | "user" | "alert" | "payment" | "review";
}

// GET /api/dashboard/popular-services → PopularService[]
interface PopularService {
  name: string;
  count: number;
  share: number;            // percentage 0–100
}
```

---

### User Dashboard — Overview Widgets

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/dashboard/user-kpis` | User KPI cards |

**Types:**
```typescript
// GET /api/dashboard/user-kpis → UserKpi[]
interface UserKpi {
  title: string;            // e.g. "خودروهای من"
  value: string;            // e.g. "۲"
  label: string;            // e.g. "خودرو ثبت شده"
}
```

---

### Notifications

| Method | Path | Role | Purpose |
|--------|------|------|---------|
| `GET` | `/api/notifications` | both | List user notifications |
| `PUT` | `/api/notifications/:id/read` | both | Mark notification as read |

**Types:**
```typescript
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "booking" | "support" | "reminder" | "promo";
  isRead: boolean;
  createdAt: string;        // ISO date
}
// GET /api/notifications → Notification[]
//   Query params: unreadOnly (boolean)
// PUT /api/notifications/:id/read → { success: boolean }
```

---

### Profile Settings

| Method | Path | Role | Purpose |
|--------|------|------|---------|
| `PUT` | `/api/auth/me` | both | Update profile |
| `PUT` | `/api/auth/password` | both | Change password |
| `PUT` | `/api/auth/center` | specialist | Update service center info |

**Types:**
```typescript
// PUT /api/auth/me body:
{
  name?: string;
  phone?: string;
  email?: string;
  avatar?: File | string;   // base64 or multipart upload
}
// Response: AuthUser

// PUT /api/auth/password body:
{
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
// Response: { success: boolean, message: string }

// PUT /api/auth/center (specialist only) body:
{
  name?: string;
  address?: string;
  phone?: string;
  workingHours?: string;
}
// Response: { success: boolean } + updated center data
```

---

### Partners

| Method | Path | Role | Purpose |
|--------|------|------|---------|
| `GET` | `/api/partners` | public | Partner centers list |

**Types:**
```typescript
// GET /api/partners → Partner[]
interface Partner {
  id: number;
  title: string;
  rating: number;           // 0–5
  description: string;
  tags: string[];           // e.g. ["مکانیک", "دیاگ"]
  imageUrl: string;
}
```

---

## Notes for Backend Implementation

- **RTL/Persian:** All user-facing text is in Persian. Dates are Jalali (Persian calendar). Prices in tomans.
- **Pagination:** All list endpoints use `{ data: T[], meta: { page, limit, totalPages, totalItems } }` shape.
- **Sorting:** Bookings endpoint supports `sortBy` (date/amount/status/customer) and `sortOrder` (asc/desc).
- **Auth:** The frontend sends JWT via `Authorization: Bearer <token>` when `VITE_JWT=true`. The `/api/auth/me` endpoint should return 401 if token is invalid/expired.
- **Error convention:** Errors return `{ message: string }` with appropriate HTTP status codes.
- **CORS:** If the API is on a different origin, CORS headers must allow the Vite dev origin.
- **MSW can be disabled** by removing the MSW bootstrap in `main.tsx` and removing `public/mockServiceWorker.js`.
