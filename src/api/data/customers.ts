export interface Customer {
    id: string;
    name: string;
    phone: string;
    vehicles: number;
    totalVisits: number;
    lastVisit: string;
    status: "active" | "inactive";
}

export const CUSTOMERS: Customer[] = [
    { id: "1", name: "امیر ملکی", phone: "۰۹۱۲۳۴۵۶۷۸۹", vehicles: 2, totalVisits: 5, lastVisit: "۲ روز پیش", status: "active" },
    { id: "2", name: "سارا حسینی", phone: "۰۹۳۵۱۲۳۴۵۶۷", vehicles: 1, totalVisits: 1, lastVisit: "۱ ماه پیش", status: "active" },
    { id: "3", name: "علی کریمی", phone: "۰۹۱۵۹۸۷۶۵۴۳", vehicles: 3, totalVisits: 12, lastVisit: "۵ روز پیش", status: "active" },
    { id: "4", name: "محمد رضایی", phone: "۰۹۰۲۴۵۶۷۸۹۱", vehicles: 1, totalVisits: 0, lastVisit: "ثبت‌نام جدید", status: "inactive" },
    { id: "5", name: "زهرا احمدی", phone: "۰۹۱۹۱۱۱۲۲۳۳", vehicles: 2, totalVisits: 3, lastVisit: "۲ ماه پیش", status: "active" },
];
