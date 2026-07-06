import {
    Wrench,
    Droplets,
    RotateCw,
    Battery,
    Snowflake,
    Gauge,
    Sparkles,
    Fuel,
    ShieldCheck,
} from "lucide-react";

/* ============================================================================
 * SERVICES DATA MODEL
 * Static catalog for the public services page (no fetch — UI/UX only).
 * Shared shape between ServicesHeader (count) and ServicesGrid (cards).
 * ========================================================================== */

export interface ServiceCategory {
    label: string;
    Icon: typeof Wrench;
}

export interface ServiceItem {
    id: number;
    category: string;
    Icon?: typeof Wrench;
    title: string;
    desc: string;
    duration: string;
    rating: number;
    reviewCount: number;
    fromPrice: number;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
    { label: "همه", Icon: Sparkles },
    { label: "مکانیک و تعمیرات", Icon: Wrench },
    { label: "دیتیلینگ", Icon: Droplets },
    { label: "تایر و جلوبندی", Icon: RotateCw },
    { label: "برق و باتری", Icon: Battery },
    { label: "کولر و تهویه", Icon: Snowflake },
    { label: "عیب‌یابی", Icon: Gauge },
    { label: "سرویس دوره‌ای", Icon: ShieldCheck },
];

export const SERVICES: ServiceItem[] = [
    {
        id: 1,
        category: "مکانیک و تعمیرات",
        Icon: Wrench,
        title: "تعویض روغن موتور و فیلترها",
        desc: "تعویض روغن موتور به همراه فیلتر روغن با محصولات اصل و کارشناس متخصص.",
        duration: "۴۵ دقیقه",
        rating: 4.8,
        reviewCount: 320,
        fromPrice: 450000,
    },
    {
        id: 2,
        category: "مکانیک و تعمیرات",
        Icon: Wrench,
        title: "تنظیم موتور و دیاگ",
        desc: "تنظیم دقیق موتور و عیب‌یابی با دستگاه دیاگ پیشرفته برای پایداری عملکرد.",
        duration: "۱ ساعت",
        rating: 4.7,
        reviewCount: 184,
        fromPrice: 800000,
    },
    {
        id: 3,
        category: "مکانیک و تعمیرات",
        Icon: Wrench,
        title: "تعویض لنت ترمز",
        desc: "تعویض لنت ترمز جلو و عقب با قطعات باکیفیت و تست عملکرد پس از تعویض.",
        duration: "۳۰ دقیقه",
        rating: 4.9,
        reviewCount: 211,
        fromPrice: 350000,
    },
    {
        id: 4,
        category: "دیتیلینگ",
        Icon: Droplets,
        title: "صفرشویی کامل خودرو",
        desc: "احیای رنگ بدنه، پاکسازی عمقی داخل و خارج و براق‌سازی تخصصی خودرو.",
        duration: "۳ ساعت",
        rating: 4.9,
        reviewCount: 156,
        fromPrice: 1200000,
    },
    {
        id: 5,
        category: "دیتیلینگ",
        Icon: Droplets,
        title: "پوشش سرامیک رنگ",
        desc: "اعمال پوشش سرامیک محافظ روی بدنه برای درخشندگی و مقاومت طولانی‌مدت.",
        duration: "۵ ساعت",
        rating: 4.8,
        reviewCount: 92,
        fromPrice: 3500000,
    },
    {
        id: 6,
        category: "تایر و جلوبندی",
        Icon: RotateCw,
        title: "تعویض لاستیک",
        desc: "تعویض لاستیک با برندهای معتبر و بالانس چرخ‌ها پس از نصب.",
        duration: "۴۰ دقیقه",
        rating: 4.6,
        reviewCount: 140,
        fromPrice: 600000,
    },
    {
        id: 7,
        category: "تایر و جلوبندی",
        Icon: RotateCw,
        title: "تنظیم فرمان و جلوبندی",
        desc: "تنظیم دقیق زاویه چرخ‌ها و بازدید کامل سیستم جلوبندی برای رانندگی ایمن.",
        duration: "۱ ساعت",
        rating: 4.7,
        reviewCount: 78,
        fromPrice: 700000,
    },
    {
        id: 8,
        category: "برق و باتری",
        Icon: Battery,
        title: "تعویض باتری خودرو",
        desc: "تعویض باتری با گارانتی و تست سیستم برق خودرو پیش از نصب.",
        duration: "۲۰ دقیقه",
        rating: 4.5,
        reviewCount: 203,
        fromPrice: 900000,
    },
    {
        id: 9,
        category: "کولر و تهویه",
        Icon: Snowflake,
        title: "شارژ گاز کولر",
        desc: "شارژ مجدد گاز کولر و بررسی کامل سیستم تهویه برای سرمایش بهینه.",
        duration: "۴۰ دقیقه",
        rating: 4.6,
        reviewCount: 167,
        fromPrice: 600000,
    },
    {
        id: 10,
        category: "عیب‌یابی",
        Icon: Gauge,
        title: "عیب‌یابی پیشرفته با دیاگ",
        desc: "شناسایی دقیق خطاهای الکترونیکی موتور و سیستم‌های خودرو با دیاگ تخصصی.",
        duration: "۳۰ دقیقه",
        rating: 4.8,
        reviewCount: 98,
        fromPrice: 500000,
    },
    {
        id: 11,
        category: "سرویس دوره‌ای",
        Icon: ShieldCheck,
        title: "سرویس دوره‌ای جامع",
        desc: "بازدید کامل موتور، ترمز، تعلیق و سیالات در یک بسته سرویس یکپارچه.",
        duration: "۲ ساعت",
        rating: 4.9,
        reviewCount: 245,
        fromPrice: 1500000,
    },
    {
        id: 12,
        category: "سرویس دوره‌ای",
        Icon: Fuel,
        title: "تعویض فیلتر هوا و بنزین",
        desc: "تعویض فیلتر هوا و فیلتر بنزین برای مصرف بهینه و عملکرد مطلوب موتور.",
        duration: "۳۰ دقیقه",
        rating: 4.7,
        reviewCount: 132,
        fromPrice: 400000,
    },
];

/* Persian-aware helpers shared with the grid component. */

export function toPersianDigits(n: number): string {
    return n.toLocaleString("fa-IR");
}

export function formatToman(n: number): string {
    return `${n.toLocaleString("fa-IR")} ت`;
}
