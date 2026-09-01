export interface Notification {
    id: string;
    title: string;
    message: string;
    type: "booking" | "support" | "reminder" | "promo";
    isRead: boolean;
    createdAt: string;
}

export const NOTIFICATIONS: Notification[] = [
    { id: "n1", title: "تأیید نوبت", message: "نوبت شما برای تعویض روغن در تاریخ ۱۵ تیر تأیید شد", type: "booking", isRead: false, createdAt: "2026-07-08T08:00:00Z" },
    { id: "n2", title: "یادآوری نوبت", message: "فردا نوبت سرویس دوره‌ای دارید", type: "reminder", isRead: false, createdAt: "2026-07-07T10:00:00Z" },
    { id: "n3", title: "علاقه‌مندی", message: "مرکز خدمات آریا به لیست علاقه‌مندی‌های شما اضافه شد", type: "promo", isRead: true, createdAt: "2026-07-06T12:00:00Z" },
    { id: "n4", title: "پشتیبانی", message: "پاسخ جدید برای تیکت شما ثبت شد", type: "support", isRead: true, createdAt: "2026-07-05T14:00:00Z" },
    { id: "n5", title: "پیشنهاد ویژه", message: "تخفیف ویژه سرویس دوره‌ای تا پایان هفته", type: "promo", isRead: false, createdAt: "2026-07-04T09:00:00Z" },
];
