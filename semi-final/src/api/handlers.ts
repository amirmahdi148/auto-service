import { http, HttpResponse } from "msw"
import type {Partner} from "../types/handler.ts";
import {POSTS} from "./data/blogs.ts";
import {BOOKINGS} from "./data/bookings.ts";
import {SERVICES} from "./data/services.ts";
import {VEHICLES, SERVICE_HISTORIES} from "./data/vehicles.ts";
import {FAVORITES} from "./data/favorites.ts";
import {TICKETS} from "./data/tickets.ts";
import {NOTIFICATIONS} from "./data/notifications.ts";
import {CUSTOMERS} from "./data/customers.ts";
import {REVIEWS} from "./data/reviews.ts";
import {
    DASHBOARD_KPIS,
    DASHBOARD_REVENUE,
    DASHBOARD_ACTIVITIES,
    DASHBOARD_POPULAR_SERVICES,
    USER_KPIS,
    DASHBOARD_SERVICES,
} from "./data/dashboard.ts";
const partners: Partner[] = [
    {
        id: 1,
        title: "مدرن اتو سرویس",
        rating: 4.8,
        description: "متخصص در خودروهای وارداتی و آلمانی.",
        tags: ["مکانیک", "دیاگ"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCedPDehRGHTmXIwuMVdOu7RwdSyF46eBRmeo1ueka_dswJfAUfYiwmznqqV1FcQ0xSg9xNwCLpSHhRHoQsQdyDIW6uZBvrhAdwmXF7yHPvsy8xZ_2fnTqniuBwg-MaDeLL5ZS9UdJabCcu_gcv3Ac1s1FJd74O-Nt-K9noazHJVI0HCERmiQAZmbmBTJyx63NjxbVSv732A4FMjcVxVW3CoJ5c1m6o_i12xJOGterVg0GGqPJ4dBeOCJwuqSQMmlabGNYE4cSQtzu7",
    },
    {
        id: 2,
        title: "کلینیک تخصصی درخشش",
        rating: 4.9,
        description: "برترین مرکز نانو سرامیک و کاور بدنه.",
        tags: ["دیتیلینگ", "سرامیک"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFaNMo12CiwB02Fvc1BROSCjIok9kP9NmUz3AzWfk_pgCBua-MOlAlFs_GFi7pwE5UM6mHp0jvO5itwthMbIXlGkSXWRtN6tGGgjy0UWV0av28z0aylSiDxJ77aA32-z6odJ_y7dKdVXntqW6A5OkSV4cZPa7jB0QRlMoKizYe7hEzPMOrm6-RFS9IzqxMthtxFFwibYka3AjOqiTcLG69s-4CwQrVIeK3NVf1gw7IK6HwE0m6cH4leU92tlZRHaerw-yLpWqZ6Dhk",
    },
    {
        id: 3,
        title: "لاستیک و جلوبندی پارس",
        rating: 4.7,
        description: "خدمات سریع لاستیک، بالانس و تنظیم فرمان 3D.",
        tags: ["تایر", "جلوبندی"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz6jfxXicNbEUvmW6wSmAOMcVsSOFrqSReBZa4WgfPNFWCZrJ9kM3mpX9SWnaaPKzLwvWOEXBsmdvwMkKWJYbWW5oitml63JbvPhFGS3HOh0pn5ILm15cEmNd-8v_xkXYw7n4T2yt5gw00deoi-XfwFRJOl34hWaC4bss6FFH-Xv6sFnd70_VqAZ_rkRLMEG70Zeb_vsnN1A-fNsNgl3394Pbj3fOr-PBQi3hGMm16revDoJlmpSxyFDzozdB8rdd6rZW4FlmnI9_i",
    },
]



/* Mutable stores (managed by handlers) */
let vehiclesStore = [...VEHICLES];
let favoritesStore = [...FAVORITES];
let ticketsStore = [...TICKETS];
let ticketMsgCounter = TICKETS.reduce((max, t) => Math.max(max, t.messages.length), 0);
let notifsStore = [...NOTIFICATIONS];
let profileStore = { name: "am1r", phone: "۰۹۱۲۳۴۵۶۷۸۹", email: "user@example.com", avatar: "basicURL" };
let centerStore = { name: "مرکز خدمات تخصصی اتو پلاس", address: "تهران، خیابان ولیعصر، پلاک ۱۲۳", phone: "۰۲۱-۸۸۸۸۸۸۸۸", workingHours: "شنبه تا پنجشنبه - ۸ صبح تا ۸ شب" };
let bookingsStore = [...BOOKINGS];
let dashServicesStore = [...DASHBOARD_SERVICES];
let reviewsStore = [...REVIEWS];
let customersStore = [...CUSTOMERS];

export const handlers = [
    http.get("/api/health", () => {
        return HttpResponse.json({ status: "ok", timestamp: Date.now() })
    }),

    http.get("/api/partners" , () => {
        return HttpResponse.json(partners)
    }),
    http.get("/api/blogs", ({ request }) => {
        const url = new URL(request.url);
        const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10) || 1);
        const limit = Math.max(1, Math.min(50, parseInt(url.searchParams.get("limit") ?? "10", 10) || 10));
        const category = url.searchParams.get("category");
        const search = url.searchParams.get("search");

        let filtered = POSTS;
        if (category) {
            filtered = POSTS.filter((p) => p.category === category);
        }
        if (search) {
            const q = search.toLowerCase();
            filtered = filtered.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
        }

        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / limit);
        const start = (page - 1) * limit;
        const paginated = filtered.slice(start, start + limit);
        const data = paginated.map((p) => ({
            id: p.id,
            category: p.category,
            title: p.title,
            excerpt: p.excerpt,
            author: p.author,
            date: p.date,
            readTime: p.readTime,
            featured: p.featured,
            slug: p.slug,
        }));

        return HttpResponse.json({ data, meta: { page, limit, totalPages, totalItems } });
    }),

    // Single article by slug. Returns the full post incl. structured `content`.
    http.get("/api/blogs/:slug", ({ params }) => {
        const slug = params.slug as string;
        const post = POSTS.find((p) => p.slug === slug);

        if (!post) {
            return HttpResponse.json({ message: "مقاله یافت نشد" }, { status: 404 });
        }

        return HttpResponse.json({
            id: post.id,
            category: post.category,
            title: post.title,
            excerpt: post.excerpt,
            author: post.author,
            date: post.date,
            readTime: post.readTime,
            slug: post.slug,
            featured: post.featured,
            content: post.content ?? [],
        });
    }),

    // Bookings list — supports status filter, search, sort and pagination.
    http.get("/api/bookings", ({ request }) => {
        const url = new URL(request.url);
        const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10) || 1);
        const limit = Math.max(1, Math.min(50, parseInt(url.searchParams.get("limit") ?? "8", 10) || 8));
        const status = url.searchParams.get("status");   // "all" | BookingStatus
        const search = url.searchParams.get("search");
        const sortBy = url.searchParams.get("sortBy") || "date";
        const sortOrder = url.searchParams.get("sortOrder") || "asc";

        let filtered = BOOKINGS;
        if (status && status !== "all") {
            filtered = BOOKINGS.filter((b) => b.status === status);
        }
        if (search) {
            const q = search.trim();
            filtered = filtered.filter(
                (b) =>
                    b.customer.includes(q) ||
                    b.service.includes(q) ||
                    b.vehicle.includes(q) ||
                    b.id.includes(q) ||
                    b.plate.includes(q),
            );
        }

        const sorted = [...filtered].sort((a, b) => {
            // eslint-disable-next-line no-useless-assignment
            let cmp = 0;
            switch (sortBy) {
                case "amount":
                    cmp = a.amount - b.amount;
                    break;
                case "status":
                    cmp = a.status.localeCompare(b.status);
                    break;
                case "customer":
                    cmp = a.customer.localeCompare(b.customer);
                    break;
                default:
                    cmp = a.dateISO.localeCompare(b.dateISO);
            }
            return sortOrder === "desc" ? -cmp : cmp;
        });

        const totalItems = sorted.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / limit));
        const start = (page - 1) * limit;
        const paginated = sorted.slice(start, start + limit);

        return HttpResponse.json({ data: paginated, meta: { page, limit, totalPages, totalItems } });
    }),

    http.get("/api/top-centers", () => {
        return HttpResponse.json([
            { name: "تعمیرگاه آریا", rating: "۴.۹", bookings: 86, share: 96 },
            { name: "مرکز خدمات پارس", rating: "۴.۷", bookings: 72, share: 80 },
            { name: "اتوسرویس شرق", rating: "۴.۸", bookings: 58, share: 65 },
            { name: "کلینیک تخصصی درخشش", rating: "۴.۹", bookings: 43, share: 51 },
            { name: "لاستیک و جلوبندی پارس", rating: "۴.۷", bookings: 37, share: 44 },
        ]);
    }),

    http.get("/api/services", ({ request }) => {
        const url = new URL(request.url);
        const category = url.searchParams.get("category");
        const search = url.searchParams.get("search");

        let filtered = SERVICES;
        if (category && category !== "همه") {
            filtered = SERVICES.filter((s) => s.category === category);
        }
        if (search) {
            const q = search.trim();
            filtered = filtered.filter(
                (s) => s.title.includes(q) || s.desc.includes(q) || s.category.includes(q),
            );
        }

        const data = filtered.map((s) => ({
            id: s.id,
            category: s.category,
            title: s.title,
            desc: s.desc,
            duration: s.duration,
            rating: s.rating,
            reviewCount: s.reviewCount,
            fromPrice: s.fromPrice,
        }));

        return HttpResponse.json({
            data,
            meta: { total: data.length },
        });
    }),

    http.get("/api/auth/check", () => {
        const user = {
            status: "ok",
            role: "user" as const,
            name: "am1r",
            username: "Am1r",
            phone: "09123456789",
            avatar: "basicURL",
        };
        return HttpResponse.json({ authenticated: true, user });
    }),

    http.post("/api/bookings", async ({ request }) => {
        const body = (await request.json()) as Record<string, unknown>;
        return HttpResponse.json({
            success: true,
            id: `B-${Date.now()}`,
            ...body,
        }, { status: 201 });
    }),

    http.post("/api/login", async ({ request }) => {
        const body = (await request.json()) as { email?: string; password?: string };
        const { email, password } = body ?? {};

        if (email === "example@gmail.com" && password === "12345678") {
            return HttpResponse.json({ success: true, message: "ورود موفق" });
        }

        return HttpResponse.json(
            { success: false, message: "ایمیل یا رمز عبور نادرست است" },
            { status: 401 }
        );
    }),

    http.get("/api/auth/me", () => {
        return HttpResponse.json({
            status: "ok",
            role: "specialist",
            name: "am1r",
            username: "Am1r",
            phone: "09123456789",
            avatar: "basicURL",
            email: "user@example.com",
        });
    }),

    /* ===== VEHICLES ===== */
    http.get("/api/vehicles", () => {
        return HttpResponse.json(vehiclesStore);
    }),
    http.post("/api/vehicles", async ({ request }) => {
        const body = (await request.json()) as Partial<typeof VEHICLES[0]>;
        const newVehicle = {
            id: Date.now(),
            name: body.name || "",
            plate: body.plate || "",
            type: body.type || "سواری",
            year: body.year || "",
            lastService: "جدید",
            status: "ok" as const,
        };
        vehiclesStore = [newVehicle, ...vehiclesStore];
        return HttpResponse.json(newVehicle, { status: 201 });
    }),
    http.put("/api/vehicles/:id", async ({ params, request }) => {
        const id = Number(params.id);
        const body = (await request.json()) as Partial<typeof VEHICLES[0]>;
        vehiclesStore = vehiclesStore.map((v) => v.id === id ? { ...v, ...body } : v);
        const updated = vehiclesStore.find((v) => v.id === id);
        return HttpResponse.json(updated || { success: false }, { status: updated ? 200 : 404 });
    }),
    http.delete("/api/vehicles/:id", ({ params }) => {
        const id = Number(params.id);
        vehiclesStore = vehiclesStore.filter((v) => v.id !== id);
        return HttpResponse.json({ success: true });
    }),
    http.get("/api/vehicles/:id/history", ({ params }) => {
        const id = Number(params.id);
        return HttpResponse.json(SERVICE_HISTORIES[id] || []);
    }),

    /* ===== FAVORITES ===== */
    
    http.get("/api/favorites", () => {
        return HttpResponse.json(favoritesStore);
    }),
    http.post("/api/favorites", async ({ request }) => {
        const body = (await request.json()) as { centerId?: number };
        const newFav = { id: Date.now(), name: "مرکز جدید", address: "آدرس", rating: 4.5, reviews: 0, phone: "۰۲۱-۰۰۰۰۰۰۰۰", isOpen: true, ...body };
        favoritesStore = [newFav, ...favoritesStore];
        return HttpResponse.json(newFav, { status: 201 });
    }),
    http.delete("/api/favorites/:id", ({ params }) => {
        const id = Number(params.id);
        favoritesStore = favoritesStore.filter((f) => f.id !== id);
        return HttpResponse.json({ success: true });
    }),

    /* ===== SUPPORT TICKETS ===== */
    http.get("/api/support/tickets", () => {
        return HttpResponse.json(ticketsStore);
    }),
    http.get("/api/support/tickets/:id", ({ params }) => {
        const ticket = ticketsStore.find((t) => t.id === params.id);
        return HttpResponse.json(ticket || { message: "تیکت یافت نشد" }, { status: ticket ? 200 : 404 });
    }),
    http.post("/api/support/tickets", async ({ request }) => {
        const body = (await request.json()) as { title?: string; message?: string };
        const newTicket = {
            id: `T-${Date.now()}`,
            title: body.title || "بدون عنوان",
            status: "open" as const,
            date: "اکنون",
            lastMessage: body.message?.trim() ? body.message : "در انتظار بررسی",
            messages: body.message?.trim()
                ? [{ id: `m-${Date.now()}`, from: "user" as const, text: body.message!, time: "اکنون" }]
                : [],
        };
        ticketsStore = [newTicket, ...ticketsStore];
        return HttpResponse.json(newTicket, { status: 201 });
    }),
    http.put("/api/support/tickets/:id", async ({ params, request }) => {
        const body = (await request.json()) as { title?: string };
        ticketsStore = ticketsStore.map((t) => t.id === params.id ? { ...t, ...body } : t);
        return HttpResponse.json({ success: true });
    }),
    http.post("/api/support/tickets/:id/messages", async ({ params, request }) => {
        const body = (await request.json()) as { text?: string };
        const ticket = ticketsStore.find((t) => t.id === params.id);
        if (!ticket || ticket.status !== "open") {
            return HttpResponse.json({ message: "تیکت یافت نشد یا بسته شده" }, { status: 400 });
        }
        ticketMsgCounter++;
        const newMsg = { id: `m-${Date.now()}-${ticketMsgCounter}`, from: "user" as const, text: body.text || "", time: "اکنون" };
        ticketsStore = ticketsStore.map((t) => t.id === params.id ? { ...t, messages: [...t.messages, newMsg], lastMessage: body.text || "", date: "اکنون" } : t);
        return HttpResponse.json(newMsg, { status: 201 });
    }),

    /* ===== NOTIFICATIONS ===== */
    http.get("/api/notifications", () => {
        return HttpResponse.json(notifsStore);
    }),
    http.put("/api/notifications/:id/read", ({ params }) => {
        notifsStore = notifsStore.map((n) => n.id === params.id ? { ...n, isRead: true } : n);
        return HttpResponse.json({ success: true });
    }),

    /* ===== PROFILE ===== */
    http.put("/api/auth/me", async ({ request }) => {
        const body = (await request.json()) as Partial<typeof profileStore>;
        profileStore = { ...profileStore, ...body };
        return HttpResponse.json({ success: true, ...profileStore });
    }),
    http.put("/api/auth/password", async ({ request }) => {
        const body = (await request.json()) as { currentPassword?: string; newPassword?: string; confirmPassword?: string };
        if (!body.currentPassword || !body.newPassword || body.newPassword !== body.confirmPassword) {
            return HttpResponse.json({ success: false, message: "اطلاعات نامعتبر" }, { status: 400 });
        }
        if (body.newPassword.length < 6) {
            return HttpResponse.json({ success: false, message: "رمز عبور حداقل ۶ کاراکتر" }, { status: 400 });
        }
        return HttpResponse.json({ success: true, message: "رمز عبور با موفقیت تغییر کرد" });
    }),
    http.put("/api/auth/center", async ({ request }) => {
        const body = (await request.json()) as Partial<typeof centerStore>;
        centerStore = { ...centerStore, ...body };
        return HttpResponse.json({ success: true, ...centerStore });
    }),

    /* ===== BOOKING ACTIONS ===== */
    http.patch("/api/bookings/:id/cancel", ({ params }) => {
        bookingsStore = bookingsStore.map((b) => b.id === params.id ? { ...b, status: "cancelled" as const } : b);
        return HttpResponse.json({ success: true });
    }),
    http.patch("/api/bookings/:id/reschedule", async ({ params, request }) => {
        const body = (await request.json()) as { date?: string; time?: string };
        bookingsStore = bookingsStore.map((b) => b.id === params.id ? { ...b, date: body.date || b.date, time: body.time || b.time } : b);
        return HttpResponse.json({ success: true });
    }),
    http.patch("/api/bookings/:id/status", async ({ params, request }) => {
        const payload = (await request.json()) as any;
        const status = payload?.status || payload?.body?.status || payload?.data?.status;
        if (status) {
            bookingsStore = bookingsStore.map((b) => b.id === params.id ? { ...b, status } : b);
        }
        return HttpResponse.json({ success: true });
    }),
    http.get("/api/bookings/export", ({ request }) => {
        const url = new URL(request.url);
        const format = url.searchParams.get("format") || "csv";
        if (format === "csv") {
            const headers = ["مشتری", "خدمت", "خودرو", "پلاک", "مرکز", "تاریخ", "زمان", "مبلغ", "وضعیت"];
            const rows = bookingsStore.map((b) => [b.customer, b.service, b.vehicle, b.plate, b.center, b.date, b.time, String(b.amount), b.status]);
            const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
            return new HttpResponse("\uFEFF" + csv, { headers: { "Content-Type": "text/csv;charset=utf-8" } });
        }
        return HttpResponse.json({ data: bookingsStore });
    }),

    /* ===== CUSTOMERS (SPECIALIST) ===== */
    http.get("/api/customers", ({ request }) => {
        const url = new URL(request.url);
        const search = url.searchParams.get("search") || "";
        let result = customersStore;
        if (search) result = result.filter((c) => c.name.includes(search) || c.phone.includes(search));
        return HttpResponse.json(result);
    }),
    http.post("/api/customers", async ({ request }) => {
        const payload = (await request.json()) as any;
        const body = payload?.body || payload?.data || payload;
        const newCustomer = {
            id: String(Date.now()),
            name: body.name || "مشتری جدید",
            phone: body.phone || "---",
            vehicles: Number(body.vehicles) || 1,
            totalVisits: Number(body.totalVisits) || 0,
            lastVisit: body.lastVisit || "ثبت‌نام جدید",
            status: body.status || "active",
        };
        customersStore = [newCustomer, ...customersStore];
        return HttpResponse.json(newCustomer, { status: 201 });
    }),
    http.put("/api/customers/:id", async ({ params, request }) => {
        const payload = (await request.json()) as any;
        const body = payload?.body || payload?.data || payload;
        customersStore = customersStore.map((c) => c.id === params.id ? { ...c, ...body } : c);
        return HttpResponse.json({ success: true });
    }),
    http.delete("/api/customers/:id", ({ params }) => {
        customersStore = customersStore.filter((c) => c.id !== params.id);
        return HttpResponse.json({ success: true });
    }),

    /* ===== DASHBOARD SERVICES (SPECIALIST) ===== */
    http.get("/api/dashboard/services", () => {
        return HttpResponse.json(dashServicesStore);
    }),
    http.post("/api/dashboard/services", async ({ request }) => {
        const body = (await request.json()) as Partial<typeof DASHBOARD_SERVICES[0]>;
        const newSrv = { id: `srv-${Date.now()}`, name: body.name || "", duration: body.duration || "", basePrice: body.basePrice || 0, status: "active" as const };
        dashServicesStore = [newSrv, ...dashServicesStore];
        return HttpResponse.json(newSrv, { status: 201 });
    }),
    http.put("/api/dashboard/services/:id", async ({ params, request }) => {
        const body = (await request.json()) as Partial<typeof DASHBOARD_SERVICES[0]>;
        dashServicesStore = dashServicesStore.map((s) => s.id === params.id ? { ...s, ...body } : s);
        return HttpResponse.json({ success: true });
    }),
    http.delete("/api/dashboard/services/:id", ({ params }) => {
        dashServicesStore = dashServicesStore.filter((s) => s.id !== params.id);
        return HttpResponse.json({ success: true });
    }),

    /* ===== REVIEWS (SPECIALIST) ===== */
    http.get("/api/reviews", () => {
        return HttpResponse.json(reviewsStore);
    }),
    http.put("/api/reviews/:id/status", async ({ params, request }) => {
        const payload = (await request.json()) as any;
        const status = payload?.status || payload?.body?.status || payload?.data?.status;
        reviewsStore = reviewsStore.map((r) => r.id === params.id ? { ...r, status: status || r.status } : r);
        return HttpResponse.json({ success: true });
    }),
    http.post("/api/reviews/:id/reply", async ({ params, request }) => {
        const payload = (await request.json()) as any;
        const reply = payload?.reply || payload?.body?.reply || payload?.data?.reply || "";
        reviewsStore = reviewsStore.map((r) => r.id === params.id ? { ...r, reply } : r);
        return HttpResponse.json({ success: true });
    }),
    http.delete("/api/reviews/:id", ({ params }) => {
        reviewsStore = reviewsStore.filter((r) => r.id !== params.id);
        return HttpResponse.json({ success: true });
    }),

    /* ===== DASHBOARD WIDGETS ===== */
    http.get("/api/dashboard/kpis", () => HttpResponse.json(DASHBOARD_KPIS)),
    http.get("/api/dashboard/revenue", ({ request }) => {
        const url = new URL(request.url);
        const period = url.searchParams.get("period") || "week";
        let series = DASHBOARD_REVENUE.series;
        let total = DASHBOARD_REVENUE.total;
        let change = DASHBOARD_REVENUE.change;

        if (period === "month") {
            total = 210500000;
            change = 24;
            series = [
                { day: "هفته اول", value: 35 },
                { day: "هفته دوم", value: 60 },
                { day: "هفته سوم", value: 85 },
                { day: "هفته چهارم", value: 95 },
            ];
        } else if (period === "year") {
            total = 2450000000;
            change = 32;
            series = [
                { day: "فروردین", value: 45 },
                { day: "اردیبهشت", value: 55 },
                { day: "خرداد", value: 70 },
                { day: "تیر", value: 85 },
                { day: "مرداد", value: 60 },
                { day: "شهریور", value: 75 },
                { day: "مهر", value: 80 },
                { day: "آبان", value: 65 },
                { day: "آذر", value: 90 },
                { day: "دی", value: 85 },
                { day: "بهمن", value: 95 },
                { day: "اسفند", value: 100 },
            ];
        }

        return HttpResponse.json({ total, change, series, period });
    }),
    http.get("/api/dashboard/activity", () => HttpResponse.json(DASHBOARD_ACTIVITIES)),
    http.get("/api/dashboard/popular-services", () => HttpResponse.json(DASHBOARD_POPULAR_SERVICES)),
    http.get("/api/dashboard/user-kpis", () => HttpResponse.json(USER_KPIS)),
]
