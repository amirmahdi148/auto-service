export type VehicleStatus = "ok" | "needs-service";

export interface Vehicle {
    id: number;
    name: string;
    plate: string;
    type: string;
    year: string;
    lastService: string;
    status: VehicleStatus;
}

export const VEHICLES: Vehicle[] = [
    { id: 1, name: "پژو ۲۰۶", plate: "۱۲ ب ۳۴۵ ایران ۶۷", type: "سواری", year: "۱۳۹۸", lastService: "۲ ماه پیش", status: "ok" },
    { id: 2, name: "هایما S7", plate: "۹۸ د ۷۶۵ ایران ۱۱", type: "شاسی‌بلند", year: "۱۴۰۱", lastService: "۷ ماه پیش", status: "needs-service" },
    { id: 3, name: "تارا اتوماتیک", plate: "۴۵ ن ۱۲۳ ایران ۳۳", type: "سواری", year: "۱۴۰۲", lastService: "۱ ماه پیش", status: "ok" },
];

export const SERVICE_HISTORIES: Record<number, { date: string; service: string; cost: string }[]> = {
    1: [
        { date: "۱۴۰۳/۰۳/۱۵", service: "تعویض روغن", cost: "۸۰۰,۰۰۰" },
        { date: "۱۴۰۳/۰۱/۲۰", service: "سرویس دوره‌ای", cost: "۱,۵۰۰,۰۰۰" },
    ],
    2: [
        { date: "۱۴۰۳/۰۲/۱۰", service: "تعویض لنت ترمز", cost: "۶۵۰,۰۰۰" },
        { date: "۱۴۰۲/۱۲/۰۵", service: "تنظیم موتور", cost: "۱,۲۰۰,۰۰۰" },
    ],
    3: [
        { date: "۱۴۰۳/۰۴/۰۱", service: "تعویض روغن", cost: "۸۰۰,۰۰۰" },
        { date: "۱۴۰۳/۰۲/۱۵", service: "بازدید دوره‌ای", cost: "۵۰۰,۰۰۰" },
    ],
};
