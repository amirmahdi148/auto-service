import {useState} from "react";
import {
    CalendarPlus,
    TrendingUp,
    Wallet,
    CalendarCheck,
    Users,
    Wrench,
    ArrowUpLeft,
    ArrowDownLeft,
    Bell,
    Search,
    Star,
    Car,
    Clock,
    CheckCircle2,
    AlertCircle,
    UserPlus,
    FileText,
    Settings,
    Download,
    ChevronLeft,
    Activity,
    CircleDollarSign,
    Sparkles,
} from "lucide-react";

/* ============================================================================
 * DASHBOARD — OVERVIEW PAGE
 * Admin home for managing the اتو پلاس auto-service business. Child of
 * DashboardLayout (renders inside <Outlet/>). Data-dense, Persian/RTL,
 * follows DESIGN.md "Heritage Tech":
 *   - Deep Blue (#1A3B5C / primary) foundation
 *   - Red (#E63946 / secondary) reserved for urgent/critical accents only
 *   - Tonal layers + 1px low-contrast outlines (no heavy shadows by default)
 *   - Vazirmatn, RTL flow, localized Persian digits
 *   - Lucide-react icons only, soft rounded corners
 * ========================================================================== */

/* ---------- Mock data (module scope — no re-alloc per render) ---------- */

// Headline KPIs. `trend` drives the up/down indicator color + icon.
const KPIS = [
    { Icon: CircleDollarSign, label: "درآمد این ماه", value: "۵۲٬۴۰۰٬۰۰۰", unit: "تومان", trend: "up", change: "٪۱۸", sub: "نسبت به ماه قبل" },
    { Icon: CalendarCheck, label: "رزروهای کل", value: "۱۲۸", unit: "نوبت", trend: "up", change: "٪۱۲", sub: "نسبت به ماه قبل" },
    { Icon: Users, label: "مشتریان فعال", value: "۱٬۴۲۰", unit: "نفر", trend: "up", change: "٪۸", sub: "نسبت به ماه قبل" },
    { Icon: Wrench, label: "خدمات در حال انجام", value: "۸", unit: "خدمت", trend: "down", change: "٪۳", sub: "نسبت به ماه قبل" },
];

// Weekly revenue for the CSS bar chart. `height` is a 0–100 percentage.
const REVENUE_SERIES = [
    { day: "شنبه", height: 45 },
    { day: "یکشنبه", height: 72 },
    { day: "دوشنبه", height: 58 },
    { day: "سه‌شنبه", height: 88 },
    { day: "چهارشنبه", height: 64 },
    { day: "پنجشنبه", height: 95 },
    { day: "جمعه", height: 38 },
];

// Recent bookings table rows.
const RECENT_BOOKINGS = [
    { id: "۱۰۲۴", customer: "علی محمدی", service: "تعویض روغن", vehicle: "پژو ۲۰۶", date: "۱ تیر ۱۴۰۵", amount: "۸۵۰٬۰۰۰", status: "completed" as const },
    { id: "۱۰۲۳", customer: "سارا احمدی", service: "بازدید ترمز", vehicle: "هایما S7", date: "۱ تیر ۱۴۰۵", amount: "۱٬۲۰۰٬۰۰۰", status: "in-progress" as const },
    { id: "۱۰۲۲", customer: "رضا کریمی", service: "تعویض لاستیک", vehicle: "تویوتا کرولا", date: "۳۰ خرداد ۱۴۰۵", amount: "۴٬۵۰۰٬۰۰۰", status: "pending" as const },
    { id: "۱۰۲۱", customer: "مریم رضایی", service: "عیب‌یابی موتور", vehicle: "کیا اسپورتیج", date: "۳۰ خرداد ۱۴۰۵", amount: "۲٬۱۰۰٬۰۰۰", status: "completed" as const },
    { id: "۱۰۲۰", customer: "حسین مرادی", service: "دیتیلینگ کامل", vehicle: "بنز C200", date: "۲۹ خرداد ۱۴۰۵", amount: "۶٬۸۰۰٬۰۰۰", status: "in-progress" as const },
];

// Most-requested services with share percentage (drives the progress bars).
const POPULAR_SERVICES = [
    { name: "تعویض روغن و فیلتر", count: 342, share: 92, Icon: Wrench },
    { name: "بازدید دوره‌ای", count: 218, share: 74, Icon: Activity },
    { name: "تعویض لاستیک", count: 156, share: 58, Icon: Car },
    { name: "عیب‌یابی هوشمند", count: 98, share: 41, Icon: Search },
    { name: "دیتیلینگ و رنگ", count: 64, share: 28, Icon: Sparkles },
];

// Live activity feed entries.
const ACTIVITY = [
    { Icon: CheckCircle2, color: "primary", text: "رزرو #۱۰۲۴ با موفقیت تکمیل شد", time: "۵ دقیقه پیش" },
    { Icon: UserPlus, color: "primary", text: "مشتری جدید ثبت‌نام کرد: نگار کاظمی", time: "۲۰ دقیقه پیش" },
    { Icon: AlertCircle, color: "secondary", text: "نوبت #۱۰۲۲ نیاز به تأیید دارد", time: "۱ ساعت پیش" },
    { Icon: Wallet, color: "primary", text: "پرداخت ۶٬۸۰۰٬۰۰۰ تومان ثبت شد", time: "۲ ساعت پیش" },
    { Icon: Star, color: "primary", text: "نظر ۵ ستاره جدید برای مرکز آریا", time: "۳ ساعت پیش" },
];

// Quick-action tiles.
const QUICK_ACTIONS = [
    { Icon: CalendarPlus, label: "رزرو نوبت جدید", color: "primary" },
    { Icon: Users, label: "مدیریت مشتریان", color: "primary" },
    { Icon: FileText, label: "گزارش‌ها", color: "primary" },
    { Icon: Wrench, label: "خدمات", color: "primary" },
    { Icon: Settings, label: "تنظیمات", color: "primary" },
    { Icon: Download, label: "خروجی اطلاعات", color: "primary" },
];

// Top-performing service centers.
const TOP_CENTERS = [
    { name: "تعمیرگاه آریا", rating: "۴.۹", bookings: 86, share: 96 },
    { name: "مرکز خدمات پارس", rating: "۴.۷", bookings: 72, share: 80 },
    { name: "اتوسرویس شرق", rating: "۴.۸", bookings: 58, share: 65 },
];

/* ---------- Helpers ---------- */

const STATUS_META = {
    "completed": { label: "تکمیل‌شده", cls: "bg-primary/10 text-primary" },
    "in-progress": { label: "در حال انجام", cls: "bg-tertiary-container/30 text-on-tertiary-fixed-variant" },
    "pending": { label: "در انتظار", cls: "bg-secondary/10 text-secondary" },
};

/* ---------- Page ---------- */

export const OverviewPage = () => {
    const [period, setPeriod] = useState<"week" | "month" | "year">("week");

    return (
        <div className="flex flex-col gap-6">

            {/* ===================== PAGE HEADER =====================
                Greeting + contextual date + a prominent primary CTA.
                On wide screens a search + notifications row sits on the left. */}
            <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-on-surface text-headline-md font-black">داشبورد مدیریت</h1>
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm font-bold">
                            <Sparkles className="size-3"/> اتو پلاس
                        </span>
                    </div>
                    <p className="text-on-surface-variant text-body-md">یکشنبه، ۱ تیر ۱۴۰۵ — خلاصه عملکرد کسب‌وکار شما</p>
                </div>

                <div className="flex items-center gap-2">
                    {/* Search (decorative affordance) */}
                    <div className="hidden sm:flex items-center gap-2 h-11 px-4 rounded-full bg-surface border border-outline-variant">
                        <Search className="size-4 text-on-surface-variant" strokeWidth={1.5}/>
                        <input placeholder="جستجو..." className="bg-transparent outline-none text-on-surface placeholder:text-on-surface-variant text-label-lg w-32"/>
                    </div>
                    {/* Notifications with unread dot */}
                    <button aria-label="اعلان‌ها" className="relative flex items-center justify-center w-11 h-11 rounded-full bg-surface border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors cursor-pointer">
                        <Bell className="size-5" strokeWidth={1.5}/>
                        <span className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-secondary"/>
                    </button>
                    {/* Primary CTA */}
                    <button className="flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary-container transition-colors">
                        <CalendarPlus className="size-4" strokeWidth={1.5}/>
                        <span className="hidden sm:inline">رزرو نوبت جدید</span>
                        <span className="sm:hidden">رزرو</span>
                    </button>
                </div>
            </header>

            {/* ===================== KPI CARDS =====================
                Four headline metrics with trend indicators. Tonal surface +
                1px outline per DESIGN.md (no default shadows). */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {KPIS.map((kpi) => {
                    const TrendIcon = kpi.trend === "up" ? ArrowUpLeft : ArrowDownLeft;
                    return (
                        <div key={kpi.label} className="flex flex-col gap-3 rounded-2xl bg-surface border border-outline-variant p-5 hover:border-primary/30 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                                    <kpi.Icon className="size-5" strokeWidth={1.5}/>
                                </div>
                                {/* Trend badge — Red only when negative (down) */}
                                <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-label-sm font-bold ${
                                    kpi.trend === "up" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                                }`}>
                                    <TrendIcon className="size-3.5" strokeWidth={2}/>
                                    {kpi.change}
                                </span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-on-surface text-display-lg-mobile font-black tabular-nums leading-none">{kpi.value}</span>
                                <span className="text-on-surface-variant text-label-sm">{kpi.unit}</span>
                            </div>
                            <span className="text-on-surface-variant text-label-sm">{kpi.label}</span>
                        </div>
                    );
                })}
            </div>

            {/* ===================== MAIN GRID: CHART + ACTIVITY ===================== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* --- Revenue chart (spans 2 cols) --- */}
                <div className="lg:col-span-2 rounded-2xl bg-surface border border-outline-variant p-6">
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                        <div className="flex flex-col gap-0.5">
                            <h2 className="text-on-surface text-title-lg font-bold">روند درآمد</h2>
                            <div className="flex items-baseline gap-2">
                                <span className="text-on-surface text-headline-md font-black tabular-nums">۵۲٬۴۰۰٬۰۰۰</span>
                                <span className="text-on-surface-variant text-label-lg">تومان</span>
                                <span className="flex items-center gap-0.5 text-primary text-label-sm font-bold">
                                    <TrendingUp className="size-3.5" strokeWidth={2}/> ٪۱۸
                                </span>
                            </div>
                        </div>
                        {/* Period toggle — single-select */}
                        <div className="flex items-center gap-1 p-1 rounded-full bg-surface-container-high">
                            {([
                                { id: "week", label: "هفته" },
                                { id: "month", label: "ماه" },
                                { id: "year", label: "سال" },
                            ] as const).map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => setPeriod(opt.id)}
                                    className={`h-8 px-4 rounded-full text-label-sm font-bold transition-colors cursor-pointer ${
                                        period === opt.id ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CSS bar chart — bar heights driven by REVENUE_SERIES.
                        The tallest bar is highlighted in primary; others use a tint. */}
                    <div className="flex items-end justify-between gap-3 h-48">
                        {REVENUE_SERIES.map((bar) => {
                            const isPeak = bar.height === Math.max(...REVENUE_SERIES.map(b => b.height));
                            return (
                                <div key={bar.day} className="flex flex-col items-center gap-2 flex-1 h-full justify-end group">
                                    <div className="relative w-full flex justify-center h-full items-end">
                                        {/* Tooltip on hover */}
                                        <span className={`absolute -top-6 px-2 py-0.5 rounded-full text-label-xs font-bold whitespace-nowrap transition-opacity ${isPeak ? "opacity-100 bg-primary text-on-primary" : "opacity-0 group-hover:opacity-100 bg-on-surface text-surface"}`}>
                                            {bar.height}٪
                                        </span>
                                        <div
                                            className={`w-full max-w-[2.5rem] rounded-t-lg rounded-b-sm transition-all duration-500 ${
                                                isPeak ? "bg-primary" : "bg-primary/25 group-hover:bg-primary/40"
                                            }`}
                                            style={{ height: `${bar.height}%` }}
                                        />
                                    </div>
                                    <span className="text-on-surface-variant text-label-xs font-medium">{bar.day}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* --- Live activity feed --- */}
                <div className="rounded-2xl bg-surface border border-outline-variant p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-on-surface text-title-lg font-bold">فعالیت‌های اخیر</h2>
                        <button className="text-primary text-label-sm font-bold cursor-pointer hover:underline flex items-center gap-0.5">
                            همه <ChevronLeft className="size-3.5" strokeWidth={2}/>
                        </button>
                    </div>
                    <ul className="flex flex-col gap-1">
                        {ACTIVITY.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 relative pb-4 last:pb-0">
                                {/* Vertical connector line (except after last) */}
                                {i < ACTIVITY.length - 1 && (
                                    <span className="absolute right-[18px] top-9 bottom-0 w-px bg-outline-variant"/>
                                )}
                                <div className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-full shrink-0 ring-4 ring-surface ${
                                    item.color === "secondary" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
                                }`}>
                                    <item.Icon className="size-4" strokeWidth={1.5}/>
                                </div>
                                <div className="flex flex-col gap-0.5 pt-1.5">
                                    <span className="text-on-surface text-label-lg leading-snug">{item.text}</span>
                                    <span className="text-on-surface-variant text-label-sm flex items-center gap-1">
                                        <Clock className="size-3" strokeWidth={1.5}/> {item.time}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ===================== BOOKINGS TABLE + SIDE COLUMN ===================== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* --- Recent bookings (spans 2 cols) --- */}
                <div className="lg:col-span-2 rounded-2xl bg-surface border border-outline-variant p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-on-surface text-title-lg font-bold">رزروهای اخیر</h2>
                        <button className="text-primary text-label-sm font-bold cursor-pointer hover:underline flex items-center gap-0.5">
                            مشاهده همه <ChevronLeft className="size-3.5" strokeWidth={2}/>
                        </button>
                    </div>

                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="text-on-surface-variant text-label-sm">
                                    <th className="font-bold pb-3">مشتری</th>
                                    <th className="font-bold pb-3">خدمت</th>
                                    <th className="font-bold pb-3">تاریخ</th>
                                    <th className="font-bold pb-3">مبلغ</th>
                                    <th className="font-bold pb-3">وضعیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                {RECENT_BOOKINGS.map((b) => (
                                    <tr key={b.id} className="border-t border-outline-variant hover:bg-surface-container-low transition-colors">
                                        <td className="py-3 pl-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-sm font-bold shrink-0">
                                                    {b.customer.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-on-surface text-label-lg font-bold">{b.customer}</span>
                                                    <span className="text-on-surface-variant text-label-sm">{b.vehicle}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 pl-2 text-on-surface-variant text-label-lg">{b.service}</td>
                                        <td className="py-3 pl-2 text-on-surface-variant text-label-lg whitespace-nowrap">{b.date}</td>
                                        <td className="py-3 pl-2 text-on-surface text-label-lg font-bold whitespace-nowrap">{b.amount} ت</td>
                                        <td className="py-3">
                                            <span className={`px-2.5 py-1 rounded-full text-label-sm font-bold ${STATUS_META[b.status].cls}`}>
                                                {STATUS_META[b.status].label}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards (stacked) */}
                    <div className="flex flex-col gap-3 md:hidden">
                        {RECENT_BOOKINGS.map((b) => (
                            <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low">
                                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-lg font-bold shrink-0">
                                    {b.customer.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-on-surface text-label-lg font-bold truncate">{b.customer}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-label-xs font-bold shrink-0 ${STATUS_META[b.status].cls}`}>
                                            {STATUS_META[b.status].label}
                                        </span>
                                    </div>
                                    <span className="text-on-surface-variant text-label-sm truncate">{b.service} — {b.vehicle}</span>
                                    <div className="flex items-center justify-between gap-2 mt-0.5">
                                        <span className="text-on-surface-variant text-label-sm">{b.date}</span>
                                        <span className="text-on-surface text-label-sm font-bold">{b.amount} ت</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Side column: popular services + top centers --- */}
                <div className="flex flex-col gap-4">

                    {/* Popular services with progress bars */}
                    <div className="rounded-2xl bg-surface border border-outline-variant p-6">
                        <h2 className="text-on-surface text-title-lg font-bold mb-5">خدمات پرطرفدار</h2>
                        <ul className="flex flex-col gap-4">
                            {POPULAR_SERVICES.map((s) => (
                                <li key={s.name} className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-on-surface text-label-lg font-medium">
                                            <s.Icon className="size-4 text-primary" strokeWidth={1.5}/>
                                            {s.name}
                                        </span>
                                        <span className="text-on-surface-variant text-label-sm tabular-nums">{s.count}</span>
                                    </div>
                                    {/* Progress bar — fills right-to-left per DESIGN.md RTL */}
                                    <div className="h-2 rounded-full bg-surface-container-high overflow-hidden">
                                        <div className="h-full rounded-full bg-primary" style={{ width: `${s.share}%` }}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Top centers */}
                    <div className="rounded-2xl bg-surface border border-outline-variant p-6">
                        <h2 className="text-on-surface text-title-lg font-bold mb-5">برترین مراکز</h2>
                        <ul className="flex flex-col gap-3">
                            {TOP_CENTERS.map((c, i) => (
                                <li key={c.name} className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-label-sm font-bold shrink-0">{toPersian(i + 1)}</span>
                                    <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                                        <span className="text-on-surface text-label-lg font-bold truncate">{c.name}</span>
                                        <span className="flex items-center gap-1 text-on-surface-variant text-label-sm">
                                            <Star className="size-3 fill-current text-tertiary-fixed-dim"/>{c.rating} • {c.bookings} رزرو
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* ===================== QUICK ACTIONS ===================== */}
            <div className="rounded-2xl bg-surface border border-outline-variant p-6">
                <h2 className="text-on-surface text-title-lg font-bold mb-5">دسترسی سریع</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {QUICK_ACTIONS.map((action) => (
                        <button
                            key={action.label}
                            className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-surface-container-low hover:bg-primary-container border border-transparent hover:border-primary/20 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface text-primary group-hover:bg-surface group-hover:text-on-primary-container transition-colors">
                                <action.Icon className="size-5" strokeWidth={1.5}/>
                            </div>
                            <span className="text-on-surface-variant group-hover:text-on-primary-container text-label-sm font-bold text-center transition-colors">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ===================== ALERTS / ATTENTION =====================
                A band highlighting items needing action. Red accent reserved
                for the count badge (urgent) per DESIGN.md. */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-primary text-on-primary p-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-on-primary/10 shrink-0">
                        <AlertCircle className="size-6" strokeWidth={1.5}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-on-primary text-title-lg font-bold">موارد نیازمند توجه شما</h3>
                        <p className="text-primary-fixed text-label-lg">۳ رزرو در انتظار تأیید و ۲ پیام پشتیبانی جدید</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 h-11 px-6 rounded-full bg-secondary text-on-secondary font-bold text-label-lg cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap">
                    بررسی موارد
                    <ChevronLeft className="size-4" strokeWidth={2}/>
                </button>
            </div>
        </div>
    );
};

/* Persian-localized digit helper. */
function toPersian(n: number): string {
    return n.toLocaleString("fa-IR");
}
