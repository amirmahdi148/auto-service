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
    time: string;       // HH:MM
    amount: number;     // tomans
    status: BookingStatus;
}

export const BOOKINGS: Booking[] = [
    { id: "۱۰۲۴", customer: "علی محمدی", phone: "۰۹۱۲۳۴۵۶۷۸۹", service: "تعویض روغن و فیلتر", vehicle: "پژو ۲۰۶", plate: "۱۲-ب-۳۴۵۶۷", center: "تعمیرگاه آریا", date: "۱ تیر ۱۴۰۵", time: "۱۰:۳۰", amount: 850000, status: "completed" },
    { id: "۱۰۲۳", customer: "سارا احمدی", phone: "۰۹۱۲۲۲۲۲۲۲", service: "بازدید کامل ترمز", vehicle: "هایما S7", plate: "۸۸-ج-۱۲۳۴۵", center: "کلینیک درخشش", date: "۱ تیر ۱۴۰۵", time: "۱۲:۰۰", amount: 1200000, status: "in-progress" },
    { id: "۱۰۲۲", customer: "رضا کریمی", phone: "۰۹۱۳۴۵۶۷۸۹۰", service: "تعویض کامل لاستیک", vehicle: "تویوتا کرولا", plate: "۴۵-د-۶۷۸۹۰", center: "لاستیک پارس", date: "۳۰ خرداد ۱۴۰۵", time: "۰۹:۰۰", amount: 4500000, status: "pending" },
    { id: "۱۰۲۱", customer: "مریم رضایی", phone: "۰۹۱۴۵۶۷۸۹۰۱", service: "عیب‌یابی هوشمند موتور", vehicle: "کیا اسپورتیج", plate: "۶۷-ه-۲۳۴۵۶", center: "تعمیرگاه آریا", date: "۳۰ خرداد ۱۴۰۵", time: "۱۵:۳۰", amount: 2100000, status: "completed" },
    { id: "۱۰۲۰", customer: "حسین مرادی", phone: "۰۹۱۵۶۷۸۹۰۱۲", service: "دیتیلینگ و پولیش کامل", vehicle: "بنز C200", plate: "۹۰-و-۷۸۹۰۱", center: "کلینیک درخشش", date: "۲۹ خرداد ۱۴۰۵", time: "۱۱:۰۰", amount: 6800000, status: "in-progress" },
    { id: "۱۰۱۹", customer: "نگار کاظمی", phone: "۰۹۱۶۷۸۹۰۱۲۳", service: "تنظیم موتور و انژکتور", vehicle: "رنو ساندرو", plate: "۳۴-ز-۳۴۵۶۷", center: "مرکز خدمات پارس", date: "۲۹ خرداد ۱۴۰۵", time: "۱۴:۰۰", amount: 950000, status: "confirmed" },
    { id: "۱۰۱۸", customer: "محمد قاسمی", phone: "۰۹۱۷۸۹۰۱۲۳۴", service: "تعویض روغن و فیلتر", vehicle: "هیوندای النترا", plate: "۲۳-ط-۴۵۶۷۸", center: "تعمیرگاه آریا", date: "۲۸ خرداد ۱۴۰۵", time: "۱۰:۰۰", amount: 850000, status: "completed" },
    { id: "۱۰۱۷", customer: "فاطمه حسینی", phone: "۰۹۱۸۹۰۱۲۳۴۵", service: "سرامیک و پوشش بدنه", vehicle: "کیا سراتو", plate: "۵۶-ی-۵۶۷۸۹", center: "کلینیک درخشش", date: "۲۸ خرداد ۱۴۰۵", time: "۱۳:۳۰", amount: 5200000, status: "cancelled" },
    { id: "۱۰۱۶", customer: "امیر تهرانی", phone: "۰۹۱۹۰۱۲۳۴۵۶", service: "بازدید جلوبندی", vehicle: "پژو پارس", plate: "۷۸-ک-۶۷۸۹۰", center: "لاستیک پارس", date: "۲۷ خرداد ۱۴۰۵", time: "۰۹:۳۰", amount: 700000, status: "completed" },
    { id: "۱۰۱۵", customer: "زهرا اکبری", phone: "۰۹۱۰۱۲۳۴۵۶۷", service: "تعویض لنت ترمز", vehicle: "تویوتا یاریس", plate: "۱۲-ل-۱۲۳۴۵", center: "مرکز خدمات پارس", date: "۲۷ خرداد ۱۴۰۵", time: "۱۶:۰۰", amount: 650000, status: "confirmed" },
    { id: "۱۰۱۴", customer: "بابک نوری", phone: "۰۹۱۱۲۳۴۵۶۷۸", service: "شارژ کولر و تعویض فیلتر", vehicle: "کیا اسپورتیج", plate: "۹۰-م-۲۳۴۵۶", center: "تعمیرگاه آریا", date: "۲۶ خرداد ۱۴۰۵", time: "۱۱:۳۰", amount: 580000, status: "pending" },
    { id: "۱۰۱۳", customer: "ساغه کاظمی", phone: "۰۹۱۳۴۵۶۷۸۹۰", service: "تعویض باتری", vehicle: "رنو تلیسیان", plate: "۴۵-ن-۷۸۹۰۱", center: "مرکز خدمات پارس", date: "۲۶ خرداد ۱۴۰۵", time: "۱۰:۰۰", amount: 1800000, status: "completed" },
];
