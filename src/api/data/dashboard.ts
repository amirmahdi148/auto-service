export interface DashboardKpi {
    label: string;
    value: string;
    unit: string;
    trend: "up" | "down";
    change: string;
    sub: string;
}

export const DASHBOARD_KPIS: DashboardKpi[] = [
    { label: "درآمد این ماه", value: "۵۲٬۴۰۰٬۰۰۰", unit: "تومان", trend: "up", change: "٪۱۸", sub: "نسبت به ماه قبل" },
    { label: "رزروهای امروز", value: "۱۲", unit: "نوبت", trend: "up", change: "٪۵", sub: "نسبت به دیروز" },
    { label: "مشتریان جدید", value: "۸", unit: "نفر", trend: "up", change: "٪۳۳", sub: "این هفته" },
    { label: "رضایت مشتریان", value: "۹۴", unit: "٪", trend: "down", change: "٪۲", sub: "کاهش جزئی" },
];

export const DASHBOARD_ACTIVITIES = [
    { text: "نوبت جدید از علی محمدی ثبت شد", time: "۵ دقیقه پیش", type: "booking" },
    { text: "پرداخت نوبت ۱۰۲۹ تأیید شد", time: "۱۵ دقیقه پیش", type: "payment" },
    { text: "مشتری جدید ثبت‌نام کرد: سارا احمدی", time: "۳۰ دقیقه پیش", type: "user" },
    { text: "یادآوری: نوبت ۱۰۲۵ در حال انجام است", time: "۱ ساعت پیش", type: "alert" },
    { text: "نظر جدید از امیر ملکی ثبت شد", time: "۲ ساعت پیش", type: "review" },
];

export const DASHBOARD_POPULAR_SERVICES = [
    { name: "تعویض روغن", count: 42, share: 35 },
    { name: "سرویس دوره‌ای", count: 28, share: 23 },
    { name: "تعویض لنت ترمز", count: 18, share: 15 },
    { name: "تنظیم موتور", count: 12, share: 10 },
    { name: "دیتیلینگ", count: 8, share: 7 },
];

export const USER_KPIS = [
    { title: "خودروهای من", value: "۲", label: "خودرو ثبت شده" },
    { title: "سرویس‌های در پیش", value: "۱", label: "نوبت فعال" },
    { title: "موجودی کیف پول", value: "۲۵۰,۰۰۰", label: "تومان" },
    { title: "اعلان‌ها", value: "۳", label: "عدد جدید" },
];

export const DASHBOARD_REVENUE = {
    total: 52400000,
    change: 18,
    series: [
        { day: "شنبه", value: 40 },
        { day: "یکشنبه", value: 65 },
        { day: "دوشنبه", value: 80 },
        { day: "سه‌شنبه", value: 55 },
        { day: "چهارشنبه", value: 90 },
        { day: "پنجشنبه", value: 70 },
    ],
};

export const DASHBOARD_SERVICES = [
    { id: "srv-1", name: "تعویض روغن موتور و فیلترها", duration: "۴۵ دقیقه", basePrice: 450000, status: "active" as const },
    { id: "srv-2", name: "تنظیم موتور و دیاگ", duration: "۱ ساعت", basePrice: 800000, status: "active" as const },
    { id: "srv-3", name: "تعویض لنت ترمز", duration: "۳۰ دقیقه", basePrice: 350000, status: "active" as const },
    { id: "srv-4", name: "شارژ گاز کولر", duration: "۴۰ دقیقه", basePrice: 600000, status: "inactive" as const },
    { id: "srv-5", name: "سرویس دوره‌ای جامع", duration: "۲ ساعت", basePrice: 1500000, status: "active" as const },
];
