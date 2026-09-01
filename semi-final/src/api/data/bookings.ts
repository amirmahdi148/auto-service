/* ============================================================================
 * BOOKINGS MOCK DATA
 * Drives the MSW handler for /api/bookings. Statuses use a discriminated set
 * so the UI can map each to a distinct treatment. Vehicle + service keep the
 * auto-service domain language consistent with the rest of the app.
 * ========================================================================== */

export type BookingStatus = "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";

export interface Booking {
    id: string;
    customer: string;
    phone: string;
    service: string;
    vehicle: string;
    plate: string;
    center: string;
    date: string;       // Persian (Jalali) display date
    dateISO: string;    // ISO date for sorting (YYYY-MM-DD)
    time: string;       // HH:MM
    amount: number;     // tomans
    status: BookingStatus;
}

export const BOOKINGS: Booking[] = [
    { id: "۱۰۲۹", customer: "علی محمدی", phone: "۰۹۱۲۳۴۵۶۷۸۹", service: "تعویض روغن و فیلتر", vehicle: "پژو ۲۰۶", plate: "۱۲-ب-۳۴۵۶۷", center: "تعمیرگاه آریا", date: "۱۰ تیر ۱۴۰۵", dateISO: "2026-07-01", time: "۱۰:۳۰", amount: 850000, status: "pending" },
    { id: "۱۰۲۸", customer: "سارا احمدی", phone: "۰۹۱۲۲۲۲۲۲۲", service: "بازدید کامل ترمز", vehicle: "هایما S7", plate: "۸۸-ج-۱۲۳۴۵", center: "کلینیک درخشش", date: "۸ تیر ۱۴۰۵", dateISO: "2026-06-29", time: "۱۲:۰۰", amount: 1200000, status: "confirmed" },
    { id: "۱۰۲۷", customer: "رضا کریمی", phone: "۰۹۱۳۴۵۶۷۸۹۰", service: "تعویض کامل لاستیک", vehicle: "تویوتا کرولا", plate: "۴۵-د-۶۷۸۹۰", center: "لاستیک پارس", date: "۷ تیر ۱۴۰۵", dateISO: "2026-06-28", time: "۰۹:۰۰", amount: 4500000, status: "confirmed" },
    { id: "۱۰۲۶", customer: "مریم رضایی", phone: "۰۹۱۴۵۶۷۸۹۰۱", service: "عیب‌یابی هوشمند موتور", vehicle: "کیا اسپورتیج", plate: "۶۷-ه-۲۳۴۵۶", center: "تعمیرگاه آریا", date: "۶ تیر ۱۴۰۵", dateISO: "2026-06-27", time: "۱۵:۳۰", amount: 2100000, status: "pending" },
    { id: "۱۰۲۵", customer: "حسین مرادی", phone: "۰۹۱۵۶۷۸۹۰۱۲", service: "دیتیلینگ و پولیش کامل", vehicle: "بنز C200", plate: "۹۰-و-۷۸۹۰۱", center: "کلینیک درخشش", date: "۵ تیر ۱۴۰۵", dateISO: "2026-06-26", time: "۱۱:۰۰", amount: 6800000, status: "in-progress" },
    { id: "۱۰۲۴", customer: "نگار کاظمی", phone: "۰۹۱۶۷۸۹۰۱۲۳", service: "تنظیم موتور و انژکتور", vehicle: "رنو ساندرو", plate: "۳۴-ز-۳۴۵۶۷", center: "مرکز خدمات پارس", date: "۴ تیر ۱۴۰۵", dateISO: "2026-06-25", time: "۱۴:۰۰", amount: 950000, status: "confirmed" },
    { id: "۱۰۲۳", customer: "محمد قاسمی", phone: "۰۹۱۷۸۹۰۱۲۳۴", service: "تعویض روغن و فیلتر", vehicle: "هیوندای النترا", plate: "۲۳-ط-۴۵۶۷۸", center: "تعمیرگاه آریا", date: "۳ تیر ۱۴۰۵", dateISO: "2026-06-24", time: "۱۰:۰۰", amount: 850000, status: "completed" },
    { id: "۱۰۲۲", customer: "فاطمه حسینی", phone: "۰۹۱۸۹۰۱۲۳۴۵", service: "سرامیک و پوشش بدنه", vehicle: "کیا سراتو", plate: "۵۶-ی-۵۶۷۸۹", center: "کلینیک درخشش", date: "۲ تیر ۱۴۰۵", dateISO: "2026-06-23", time: "۱۳:۳۰", amount: 5200000, status: "cancelled" },
    { id: "۱۰۲۱", customer: "امیر تهرانی", phone: "۰۹۱۹۰۱۲۳۴۵۶", service: "بازدید جلوبندی", vehicle: "پژو پارس", plate: "۷۸-ک-۶۷۸۹۰", center: "لاستیک پارس", date: "۱ تیر ۱۴۰۵", dateISO: "2026-06-22", time: "۰۹:۳۰", amount: 700000, status: "completed" },
    { id: "۱۰۲۰", customer: "زهرا اکبری", phone: "۰۹۱۰۱۲۳۴۵۶۷", service: "تعویض لنت ترمز", vehicle: "تویوتا یاریس", plate: "۱۲-ل-۱۲۳۴۵", center: "مرکز خدمات پارس", date: "۳۰ خرداد ۱۴۰۵", dateISO: "2026-06-20", time: "۱۶:۰۰", amount: 650000, status: "confirmed" },
    { id: "۱۰۱۹", customer: "بابک نوری", phone: "۰۹۱۱۲۳۴۵۶۷۸", service: "شارژ کولر و تعویض فیلتر", vehicle: "کیا اسپورتیج", plate: "۹۰-م-۲۳۴۵۶", center: "تعمیرگاه آریا", date: "۲۸ خرداد ۱۴۰۵", dateISO: "2026-06-18", time: "۱۱:۳۰", amount: 580000, status: "completed" },
    { id: "۱۰۱۸", customer: "ساغه کاظمی", phone: "۰۹۱۳۴۵۶۷۸۹۰", service: "تعویض باتری", vehicle: "رنو تلیسیان", plate: "۴۵-ن-۷۸۹۰۱", center: "مرکز خدمات پارس", date: "۲۶ خرداد ۱۴۰۵", dateISO: "2026-06-16", time: "۱۰:۰۰", amount: 1800000, status: "completed" },
    { id: "۱۰۳۰", customer: "کیانوش رستمی", phone: "۰۹۱۲۳۴۵۶۷۸۰", service: "تعویض روغن و فیلتر", vehicle: "پژو ۲۰۷", plate: "۱۵-ب-۷۸۹۰۱", center: "تعمیرگاه آریا", date: "۱۳ تیر ۱۴۰۵", dateISO: "2026-07-04", time: "۰۹:۰۰", amount: 850000, status: "pending" },
    { id: "۱۰۳۱", customer: "نیلوفر صادقی", phone: "۰۹۱۳۴۵۶۷۸۹۱", service: "بازدید کامل ترمز", vehicle: "مزدا ۳", plate: "۳۴-د-۲۳۴۵۶", center: "کلینیک درخشش", date: "۱۵ تیر ۱۴۰۵", dateISO: "2026-07-06", time: "۱۴:۰۰", amount: 1200000, status: "confirmed" },
    { id: "۱۰۳۲", customer: "پویا ناصری", phone: "۰۹۱۴۵۶۷۸۹۰۲", service: "تعویض لاستیک", vehicle: "سوزکی ویتارا", plate: "۶۷-ه-۳۴۵۶۷", center: "لاستیک پارس", date: "۱۸ تیر ۱۴۰۵", dateISO: "2026-07-09", time: "۱۱:۳۰", amount: 3200000, status: "confirmed" },
    { id: "۱۰۳۳", customer: "الهه موسوی", phone: "۰۹۱۵۶۷۸۹۰۱۳", service: "دیتیلینگ و پولیش", vehicle: "بنز CLA", plate: "۹۰-و-۴۵۶۷۸", center: "کلینیک درخشش", date: "۲۰ تیر ۱۴۰۵", dateISO: "2026-07-11", time: "۱۰:۰۰", amount: 5200000, status: "pending" },
    { id: "۱۰۳۴", customer: "ایمان حیدری", phone: "۰۹۱۶۷۸۹۰۱۲۴", service: "عیب‌یابی هوشمند موتور", vehicle: "هیوندای سانتافه", plate: "۱۲-ز-۸۹۰۱۲", center: "تعمیرگاه آریا", date: "۲۵ تیر ۱۴۰۵", dateISO: "2026-07-16", time: "۱۶:۰۰", amount: 2100000, status: "pending" },
];
