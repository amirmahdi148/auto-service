import {useState, useEffect, useRef, useMemo} from "react";
import {useSearchParams} from "react-router";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    CalendarDays,
    Search,
    Plus,
    Download,
    Clock,
    ChevronLeft,
    ChevronRight,
    X,
    Loader2,
    CalendarPlus,
    CheckCircle2,
    AlertCircle,
    Loader,
    XCircle,
    CalendarClock,
    MoreHorizontal,
    Car,
    MapPin,
} from "lucide-react";
import {HttpService} from "../../utils/HttpService.ts";
import {useAuth} from "../../contexts/useAuth.ts";
import {ModalWrapper} from "../../components/shared/ModalWrapper.tsx";
import type {BookingStatus} from "../../api/data/bookings.ts";

/* ============================================================================
 * DASHBOARD — BOOKINGS PAGE  (/dashboard/bookings)
 *
 * Fetches the bookings list with status filter + search + pagination from the
 * MSW-served /api/bookings endpoint. Data-dense, Persian/RTL, Heritage Tech:
 *   - Deep Blue foundation, Red reserved for canceled/urgent accents
 *   - Tonal layers + 1px low-contrast outlines (no heavy shadows)
 *   - Responsive: table on desktop, stacked cards on mobile
 * ========================================================================== */

/* ---------- API shapes ---------- */

interface Booking {
    id: string;
    customer: string;
    phone: string;
    service: string;
    vehicle: string;
    plate: string;
    center: string;
    date: string;
    time: string;
    amount: number;
    status: BookingStatus;
}

interface BookingsResponse {
    data: Booking[];
    meta: {
        page: number;
        limit: number;
        totalPages: number;
        totalItems: number;
    };
}

/* ---------- Status → label/icon/color mapping ---------- */

const STATUS_META: Record<BookingStatus, { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
    "pending":     { label: "در انتظار",   cls: "bg-secondary/10 text-secondary",            Icon: AlertCircle },
    "confirmed":   { label: "تأیید شده",   cls: "bg-primary/10 text-primary",                Icon: CheckCircle2 },
    "in-progress": { label: "در حال انجام", cls: "bg-tertiary-fixed-dim/30 text-on-tertiary-fixed-variant", Icon: Loader },
    "completed":   { label: "تکمیل‌شده",   cls: "bg-primary/10 text-primary",                Icon: CheckCircle2 },
    "cancelled":   { label: "لغوشده",     cls: "bg-error/10 text-error",                    Icon: XCircle },
};

// Filter chips shown above the table. `count` is filled from the totals fetch.
const STATUS_FILTERS: { id: "all" | BookingStatus; label: string }[] = [
    { id: "all", label: "همه" },
    { id: "pending", label: "در انتظار" },
    { id: "confirmed", label: "تأیید شده" },
    { id: "in-progress", label: "در حال انجام" },
    { id: "completed", label: "تکمیل‌شده" },
    { id: "cancelled", label: "لغوشده" },
];

/* ---------- Helpers ---------- */

// Format an amount in tomans with Persian digits + grouping.
const fmtToman = (n: number) => `${n.toLocaleString("fa-IR")} ت`;
const toFa = (n: number) => n.toLocaleString("fa-IR");

/* ---------- Skeleton + empty state ---------- */

const RowSkeleton = () => (
    <div className="flex items-center gap-4 p-4">
        <div className="w-10 h-10 rounded-full bg-surface-container-high animate-pulse"/>
        <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded-full bg-surface-container-high animate-pulse"/>
            <div className="h-3 w-1/4 rounded-full bg-surface-container-high animate-pulse"/>
        </div>
        <div className="h-6 w-20 rounded-full bg-surface-container-high animate-pulse"/>
    </div>
);

/* ---------- Page ---------- */

import {NewBookingModal} from "../../components/Dashboard/NewBookingModal.tsx";

type SortField = "date" | "amount" | "status" | "customer";
type SortOrder = "asc" | "desc";

const SORT_OPTIONS: { field: SortField; label: string }[] = [
    { field: "date", label: "تاریخ" },
    { field: "amount", label: "مبلغ" },
    { field: "status", label: "وضعیت" },
];

export const BookingsPage = () => {
    const { role } = useAuth();
    const isUser = role === "user";
    const [searchParams] = useSearchParams();
    const initialStatus = (searchParams.get("status") as BookingStatus) || "all";
    const [status, setStatus] = useState<"all" | BookingStatus>(
        STATUS_FILTERS.some((f) => f.id === initialStatus) ? initialStatus : "all"
    );
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState<SortField>("date");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Debounce search input to avoid a request per keystroke.
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(t);
    }, [search]);

    // Primary list query — re-runs on status / search / page / sort change.
    const { data, isFetching } = useQuery({
        queryKey: ["bookings", { status, search: debouncedSearch, page, sortBy, sortOrder }],
        queryFn: () => {
            const params: Record<string, string | number | undefined> = { page, limit: 8, sortBy, sortOrder };
            if (status !== "all") params.status = status;
            if (debouncedSearch) params.search = debouncedSearch;
            return HttpService.get<BookingsResponse>("/api/bookings", { params });
        },
        placeholderData: (prev) => prev,
    });

    const bookings = data?.data ?? [];
    const totalPages = data?.meta.totalPages ?? 1;
    const totalItems = data?.meta.totalItems ?? 0;
    const isLoading = isFetching && !data;

    const queryClient = useQueryClient();

    const cancelMutation = useMutation({
        mutationFn: (id: string) => HttpService.patch(`/api/bookings/${id}/cancel`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
    });

    const rescheduleMutation = useMutation({
        mutationFn: ({ id, date, time }: { id: string; date: string; time: string }) =>
            HttpService.patch(`/api/bookings/${id}/reschedule`, { data: { date, time } }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
    });

    const statusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: BookingStatus }) =>
            HttpService.patch(`/api/bookings/${id}/status`, { body: { status } }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
    });

    const [detailBooking, setDetailBooking] = useState<Booking | null>(null);
    const [rescheduleBooking, setRescheduleBooking] = useState<Booking | null>(null);
    const [cancelConfirm, setCancelConfirm] = useState<string | null>(null);
    const [rescheduleDate, setRescheduleDate] = useState("");
    const [rescheduleTime, setRescheduleTime] = useState("");

    const summaryCards = useMemo(() => {
        const all = bookings;
        return {
            total: all.length,
            pending: all.filter((b) => b.status === "pending").length,
            inProgress: all.filter((b) => b.status === "in-progress").length,
            completed: all.filter((b) => b.status === "completed").length,
        };
    }, [bookings]);

    const handleExportCSV = () => {
        const headers = ["مشتری", "خدمت", "خودرو", "پلاک", "مرکز", "تاریخ", "زمان", "مبلغ", "وضعیت"];
        const rows = bookings.map((b) => [
            b.customer, b.service, b.vehicle, b.plate, b.center, b.date, b.time, b.amount, STATUS_META[b.status].label,
        ]);
        const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
        const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleStatusChange = (s: "all" | BookingStatus) => {
        setStatus(s);
        setPage(1);
    };
    const handleSearchChange = (v: string) => {
        setSearch(v);
        setPage(1);
    };

    return (
        <div className="flex flex-col gap-6">

            {/* ===================== HEADER ===================== */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-on-surface text-headline-md font-black">رزروها</h1>
                        <span className="px-2 py-0.5 rounded-full bg-surface border border-outline-variant text-on-surface-variant text-label-sm font-bold tabular-nums">
                            {toFa(totalItems)} مورد
                        </span>
                    </div>
                    <p className="text-on-surface-variant text-body-md">
                        {isUser ? "مشاهده و پیگیری نوبت‌های رزرو شده شما" : "مدیریت و پیگیری نوبت‌ها و رزروهای خدمات"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Secondary export action */}
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 h-11 px-4 rounded-full bg-surface border border-outline-variant text-on-surface-variant hover:border-primary/30 hover:text-primary font-bold text-label-lg cursor-pointer transition-colors"
                    >
                        <Download className="size-4" strokeWidth={1.5}/>
                        <span className="hidden sm:inline">خروجی</span>
                    </button>
                    {/* Primary CTA */}
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary-container transition-colors"
                    >
                        <Plus className="size-4" strokeWidth={2}/>
                        <span className="hidden sm:inline">رزرو جدید</span>
                        <span className="sm:hidden">جدید</span>
                    </button>
                </div>
            </div>

            {/* ===================== SUMMARY CARDS =====================
                Quick at-a-glance counts for the day. The pending card uses the
                Red accent since it signals items needing action. */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { Icon: CalendarDays, label: "کل امروز", value: toFa(summaryCards.total), cls: "bg-primary/10 text-primary" },
                    { Icon: CalendarClock, label: "در انتظار", value: toFa(summaryCards.pending), cls: "bg-secondary/10 text-secondary" },
                    { Icon: Loader, label: "در حال انجام", value: toFa(summaryCards.inProgress), cls: "bg-tertiary-fixed-dim/30 text-on-tertiary-fixed-variant" },
                    { Icon: CheckCircle2, label: "تکمیل‌شده", value: toFa(summaryCards.completed), cls: "bg-primary/10 text-primary" },
                ].map((c) => (
                    <div key={c.label} className="flex items-center gap-3 rounded-2xl bg-surface border border-outline-variant p-4">
                        <div className={`flex items-center justify-center w-11 h-11 rounded-full ${c.cls}`}>
                            <c.Icon className="size-5" strokeWidth={1.5}/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-on-surface text-headline-md font-black tabular-nums leading-none">{c.value}</span>
                            <span className="text-on-surface-variant text-label-sm">{c.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ===================== TOOLBAR: search + status filters ===================== */}
            <div className="flex flex-col gap-4 rounded-2xl bg-surface border border-outline-variant p-4">
                {/* Search field */}
                <div className="flex items-center gap-2 h-11 px-4 rounded-full bg-surface-container-low border border-outline-variant focus-within:border-primary/40 transition-colors">
                    <Search className="size-4 text-on-surface-variant shrink-0" strokeWidth={1.5}/>
                    <input
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="جستجو بر اساس نام، خدمت، خودرو، شماره رزرو..."
                        className="flex-1 bg-transparent outline-none text-on-surface placeholder:text-on-surface-variant text-label-lg"
                    />
                    {search && (
                        <button onClick={() => handleSearchChange("")} aria-label="پاک کردن" className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                            <X className="size-4" strokeWidth={2}/>
                        </button>
                    )}
                </div>

                {/* Sort + Status filter chips — horizontally scrollable on mobile */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {/* Sort dropdown */}
                    <div className="flex items-center gap-1 shrink-0">
                        {SORT_OPTIONS.map((opt) => {
                            const active = sortBy === opt.field;
                            return (
                                <button
                                    key={opt.field}
                                    onClick={() => {
                                        if (active) {
                                            setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
                                        } else {
                                            setSortBy(opt.field);
                                            setSortOrder("asc");
                                        }
                                        setPage(1);
                                    }}
                                    className={`flex items-center gap-1 h-9 px-3 rounded-full text-label-sm font-bold whitespace-nowrap cursor-pointer transition-colors ${
                                        active
                                            ? "bg-primary text-on-primary"
                                            : "bg-surface-container-low text-on-surface-variant border border-outline-variant hover:border-primary/30 hover:text-on-surface"
                                    }`}
                                >
                                    {opt.label}
                                    {active && (
                                        <span className="text-label-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="w-px h-6 bg-outline-variant/50 shrink-0" />

                    {STATUS_FILTERS.map((f) => {
                        const active = status === f.id;
                        return (
                            <button
                                key={f.id}
                                onClick={() => handleStatusChange(f.id)}
                                className={`flex items-center gap-1.5 h-9 px-4 rounded-full text-label-lg font-bold whitespace-nowrap cursor-pointer transition-colors ${
                                    active
                                        ? "bg-primary text-on-primary"
                                        : "bg-surface-container-low text-on-surface-variant border border-outline-variant hover:border-primary/30 hover:text-on-surface"
                                }`}
                            >
                                {f.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ===================== TABLE / LIST ===================== */}
            <div className="rounded-2xl bg-surface border border-outline-variant overflow-hidden">

                {/* Result count + live fetching indicator */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-outline-variant">
                    <span className="text-on-surface-variant text-label-sm">
                        {isLoading ? "در حال بارگذاری..." : `${toFa(bookings.length)} از ${toFa(totalItems)} رزرو`}
                    </span>
                    {isFetching && !isLoading && <Loader2 className="size-4 text-primary animate-spin" strokeWidth={1.5}/>}
                </div>

                {isLoading ? (
                    /* Initial load skeleton */
                    <div className="flex flex-col divide-y divide-outline-variant">
                        {Array.from({length: 6}).map((_, i) => <RowSkeleton key={i}/>)}
                    </div>
                ) : bookings.length > 0 ? (
                    <>
                        {/* Desktop table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-right border-collapse">
                                <thead>
                                <tr className="text-on-surface-variant text-label-sm bg-surface-container-low">
                                    {!isUser && <th className="font-bold px-5 py-3">مشتری</th>}
                                    <th className="font-bold px-5 py-3">خدمت / خودرو</th>
                                    <th className="font-bold px-5 py-3">مرکز</th>
                                    <th className="font-bold px-5 py-3">تاریخ و زمان</th>
                                    <th className="font-bold px-5 py-3">مبلغ</th>
                                    <th className="font-bold px-5 py-3">وضعیت</th>
                                    <th className="font-bold px-5 py-3"></th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant">
                                {bookings.map((b) => {
                                    const meta = STATUS_META[b.status];
                                    return (
                                        <tr key={b.id} className="hover:bg-surface-container-low transition-colors">
                                            {!isUser && (
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-sm font-bold shrink-0">
                                                            {b.customer.charAt(0)}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-on-surface text-label-lg font-bold">{b.customer}</span>
                                                            <span className="text-on-surface-variant text-label-sm" dir="ltr">{b.phone}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            )}
                                            <td className="px-5 py-3">
                                                <div className="flex flex-col">
                                                    <span className="text-on-surface text-label-lg">{b.service}</span>
                                                    <span className="text-on-surface-variant text-label-sm">{b.vehicle} • {b.plate}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 text-on-surface-variant text-label-lg whitespace-nowrap">{b.center}</td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-on-surface text-label-lg">{b.date}</span>
                                                    <span className="text-on-surface-variant text-label-sm flex items-center gap-1">
                                                            <Clock className="size-3" strokeWidth={1.5}/> {b.time}
                                                        </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 text-on-surface text-label-lg font-bold whitespace-nowrap">{fmtToman(b.amount)}</td>
                                            <td className="px-5 py-3">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-bold ${meta.cls}`}>
                                                        <meta.Icon className="size-3.5" strokeWidth={2}/>
                                                        {meta.label}
                                                    </span>
                                            </td>
                                            <td className="px-5 py-3 relative">
                                                <button
                                                    onClick={() => setActiveMenu(activeMenu === b.id ? null : b.id)}
                                                    aria-label="گزینه‌ها"
                                                    className="flex items-center justify-center w-8 h-8 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface cursor-pointer"
                                                >
                                                    <MoreHorizontal className="size-5" strokeWidth={1.5}/>
                                                </button>
                                                {activeMenu === b.id && (
                                                    <div ref={menuRef} className="absolute left-0 top-full mt-1 z-20 min-w-40 bg-surface border border-outline-variant rounded-xl shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                                                        <button onClick={() => { setDetailBooking(b); setActiveMenu(null); }} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer">
                                                            مشاهده جزئیات
                                                        </button>
                                                        <button onClick={() => { setRescheduleBooking(b); setRescheduleDate(""); setRescheduleTime(""); setActiveMenu(null); }} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer">
                                                            تغییر زمان
                                                        </button>

                                                        {/* Specialist Lifecycle Actions */}
                                                        {!isUser && b.status === "pending" && (
                                                            <button onClick={() => { statusMutation.mutate({ id: b.id, status: "confirmed" }); setActiveMenu(null); }} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-primary hover:bg-primary/5 transition-colors cursor-pointer">
                                                                تأیید نوبت
                                                            </button>
                                                        )}
                                                        {!isUser && b.status === "confirmed" && (
                                                            <button onClick={() => { statusMutation.mutate({ id: b.id, status: "in-progress" }); setActiveMenu(null); }} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-tertiary hover:bg-tertiary/5 transition-colors cursor-pointer">
                                                                شروع خدمت
                                                            </button>
                                                        )}
                                                        {!isUser && b.status === "in-progress" && (
                                                            <button onClick={() => { statusMutation.mutate({ id: b.id, status: "completed" }); setActiveMenu(null); }} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-primary hover:bg-primary/5 transition-colors cursor-pointer">
                                                                اتمام خدمت
                                                            </button>
                                                        )}

                                                        {b.status === "pending" && (
                                                            <>
                                                                <div className="h-px bg-outline-variant/50 my-1 mx-1" />
                                                                <button onClick={() => { setCancelConfirm(b.id); setActiveMenu(null); }} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-error hover:bg-error/5 transition-colors cursor-pointer">
                                                                    لغو نوبت
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards (stacked) */}
                        <div className="flex flex-col md:hidden divide-y divide-outline-variant">
                            {bookings.map((b) => {
                                const meta = STATUS_META[b.status];
                                return (
                                    <div key={b.id} className="p-4 flex flex-col gap-3">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-lg font-bold shrink-0">
                                                    {isUser ? <CalendarClock className="size-5"/> : b.customer.charAt(0)}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-on-surface text-label-lg font-bold truncate">
                                                        {isUser ? b.service : b.customer}
                                                    </span>
                                                    <span className="text-on-surface-variant text-label-sm">#{b.id}</span>
                                                </div>
                                            </div>
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-bold shrink-0 ${meta.cls}`}>
                                                <meta.Icon className="size-3.5" strokeWidth={2}/>{meta.label}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-label-sm">
                                            <span className="flex items-center gap-1.5 text-on-surface"><Car className="size-4 text-on-surface-variant" strokeWidth={1.5}/>{b.vehicle}</span>
                                            <span className="flex items-center gap-1.5 text-on-surface"><MapPin className="size-4 text-on-surface-variant" strokeWidth={1.5}/>{b.center}</span>
                                            <span className="flex items-center gap-1.5 text-on-surface"><CalendarDays className="size-4 text-on-surface-variant" strokeWidth={1.5}/>{b.date}</span>
                                            <span className="flex items-center gap-1.5 text-on-surface"><Clock className="size-4 text-on-surface-variant" strokeWidth={1.5}/>{b.time}</span>
                                        </div>
                                        <div className="flex items-center justify-between pt-2 border-t border-outline-variant/60">
                                            <span className="text-on-surface-variant text-label-sm">{b.service}</span>
                                            <span className="text-on-surface text-label-lg font-bold">{fmtToman(b.amount)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-1.5 p-4 border-t border-outline-variant">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page <= 1}
                                    aria-label="قبلی"
                                    className="flex items-center gap-1 h-10 px-4 rounded-full bg-surface text-on-surface-variant border border-outline-variant hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer text-label-sm font-bold"
                                >
                                    <ChevronRight className="size-4" strokeWidth={2}/>
                                    <span className="hidden sm:inline">قبلی</span>
                                </button>
                                {Array.from({length: totalPages}).map((_, i) => {
                                    const p = i + 1;
                                    return (
                                        <button
                                            key={p}
                                            onClick={() => setPage(p)}
                                            className={`w-10 h-10 rounded-full text-label-lg font-bold transition-all cursor-pointer ${
                                                p === page
                                                    ? "bg-primary text-on-primary"
                                                    : "bg-surface text-on-surface-variant border border-outline-variant hover:border-primary/40 hover:text-primary"
                                            }`}
                                        >
                                            {toFa(p)}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page >= totalPages}
                                    aria-label="بعدی"
                                    className="flex items-center gap-1 h-10 px-4 rounded-full bg-surface text-on-surface-variant border border-outline-variant hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer text-label-sm font-bold"
                                >
                                    <span className="hidden sm:inline">بعدی</span>
                                    <ChevronLeft className="size-4" strokeWidth={2}/>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    /* Empty state — no bookings match the filter/search */
                    <div className="flex flex-col items-center gap-4 py-16 px-4 text-center">
                        <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center">
                            <Search className="size-8 text-on-surface-variant" strokeWidth={1.5}/>
                        </div>
                        <h3 className="text-on-surface text-title-lg font-bold">رزروی یافت نشد</h3>
                        <p className="text-on-surface-variant text-body-md max-w-sm">هیچ رزرو‌ای با این فیلتر یا عبارت جستجو وجود ندارد. فیلتر را تغییر دهید یا رزرو جدیدی ثبت کنید.</p>
                        <button
                            onClick={() => { setStatus("all"); setSearch(""); setIsModalOpen(true); }}
                            className="flex items-center gap-2 mt-1 px-5 h-10 rounded-full bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary-container transition-colors"
                        >
                            <CalendarPlus className="size-4" strokeWidth={1.5}/>
                            رزرو جدید
                        </button>
                    </div>
                )}
            </div>

            <NewBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Detail Modal */}
            <ModalWrapper isOpen={detailBooking !== null} close={() => setDetailBooking(null)} maxWidth="max-w-md">
                {detailBooking && (
                    <div className="p-6 flex flex-col gap-5">
                        <h3 className="text-title-lg font-bold text-on-surface border-b border-outline-variant/50 pb-3">جزئیات رزرو</h3>
                        <div className="grid grid-cols-2 gap-4 text-label-md">
                            <div className="flex flex-col gap-1"><span className="text-on-surface-variant">خدمت</span><span className="text-on-surface font-bold">{detailBooking.service}</span></div>
                            <div className="flex flex-col gap-1"><span className="text-on-surface-variant">خودرو</span><span className="text-on-surface font-bold">{detailBooking.vehicle} • {detailBooking.plate}</span></div>
                            <div className="flex flex-col gap-1"><span className="text-on-surface-variant">مرکز</span><span className="text-on-surface font-bold">{detailBooking.center}</span></div>
                            <div className="flex flex-col gap-1"><span className="text-on-surface-variant">تاریخ</span><span className="text-on-surface font-bold">{detailBooking.date}</span></div>
                            <div className="flex flex-col gap-1"><span className="text-on-surface-variant">زمان</span><span className="text-on-surface font-bold">{detailBooking.time}</span></div>
                            <div className="flex flex-col gap-1"><span className="text-on-surface-variant">مبلغ</span><span className="text-on-surface font-bold">{fmtToman(detailBooking.amount)}</span></div>
                            <div className="flex flex-col gap-1"><span className="text-on-surface-variant">وضعیت</span><span className="text-on-surface font-bold">{STATUS_META[detailBooking.status].label}</span></div>
                            <div className="flex flex-col gap-1"><span className="text-on-surface-variant">شناسه</span><span className="text-on-surface font-bold">#{detailBooking.id}</span></div>
                        </div>
                        {!isUser && (
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant mt-2">
                                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-lg font-bold">{detailBooking.customer.charAt(0)}</div>
                                <div className="flex flex-col"><span className="text-label-md font-bold text-on-surface">{detailBooking.customer}</span><span className="text-label-sm text-on-surface-variant" dir="ltr">{detailBooking.phone}</span></div>
                            </div>
                        )}
                    </div>
                )}
            </ModalWrapper>

            {/* Reschedule Modal */}
            <ModalWrapper isOpen={rescheduleBooking !== null} close={() => setRescheduleBooking(null)} maxWidth="max-w-sm">
                {rescheduleBooking && (
                    <div className="p-6 flex flex-col gap-5">
                        <h3 className="text-title-lg font-bold text-on-surface border-b border-outline-variant/50 pb-3">تغییر زمان نوبت</h3>
                        <p className="text-label-md text-on-surface-variant">نوبت: {rescheduleBooking.service} در {rescheduleBooking.center}</p>
                        <div className="flex flex-col gap-2">
                            <label className="text-label-sm font-bold text-on-surface-variant">تاریخ جدید</label>
                            <input type="text" value={rescheduleDate} onChange={(e) => setRescheduleDate(e.target.value)} placeholder="مثال: ۱۴۰۳/۰۵/۱۵" className="h-11 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary outline-none text-on-surface text-label-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-label-sm font-bold text-on-surface-variant">ساعت جدید</label>
                            <input type="text" value={rescheduleTime} onChange={(e) => setRescheduleTime(e.target.value)} placeholder="مثال: ۱۰:۰۰" className="h-11 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary outline-none text-on-surface text-label-md" />
                        </div>
                        <button
                            onClick={() => {
                                if (!rescheduleBooking || !rescheduleDate.trim() || !rescheduleTime.trim()) return;
                                rescheduleMutation.mutate({ id: rescheduleBooking.id, date: rescheduleDate.trim(), time: rescheduleTime.trim() });
                                setRescheduleBooking(null);
                            }}
                            disabled={!rescheduleDate.trim() || !rescheduleTime.trim() || rescheduleMutation.isPending}
                            className="h-11 rounded-xl bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                        >
                            {rescheduleMutation.isPending ? (
                                <Loader2 className="size-4 animate-spin inline" strokeWidth={2}/>
                            ) : null}
                            ثبت تغییر زمان
                        </button>
                    </div>
                )}
            </ModalWrapper>

            {/* Cancel Confirmation */}
            <ModalWrapper isOpen={cancelConfirm !== null} close={() => setCancelConfirm(null)} maxWidth="max-w-sm">
                <div className="p-6 flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center shrink-0">
                            <AlertCircle className="size-6" strokeWidth={1.5}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-title-lg font-bold text-on-surface">لغو نوبت</h3>
                            <p className="text-label-md text-on-surface-variant">آیا از لغو این نوبت اطمینان دارید؟ این عمل قابل بازگشت نیست.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setCancelConfirm(null)} className="flex-1 h-11 rounded-xl border border-outline-variant text-on-surface font-bold text-label-lg cursor-pointer hover:bg-surface-container-low transition-colors">
                            انصراف
                        </button>
                        <button onClick={() => { if (cancelConfirm) { cancelMutation.mutate(cancelConfirm); } setCancelConfirm(null); }} disabled={cancelMutation.isPending} className="flex-1 h-11 rounded-xl bg-error text-on-error font-bold text-label-lg cursor-pointer hover:bg-error/90 disabled:opacity-50 transition-colors">
                            {cancelMutation.isPending ? <Loader2 className="size-4 animate-spin inline" strokeWidth={2}/> : null}
                            تأیید لغو
                        </button>
                    </div>
                </div>
            </ModalWrapper>
        </div>
    );
};

