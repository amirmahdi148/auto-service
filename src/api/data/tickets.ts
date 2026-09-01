export interface TicketMessage {
    id: string;
    from: "user" | "support";
    text: string;
    time: string;
}

export interface Ticket {
    id: string;
    title: string;
    status: "open" | "closed";
    date: string;
    lastMessage: string;
    messages: TicketMessage[];
}

export const TICKETS: Ticket[] = [
    {
        id: "T-1001",
        title: "مشکل در ثبت نوبت",
        status: "open",
        date: "امروز، ۱۰:۳۰",
        lastMessage: "متاسفانه هنگام پرداخت با خطا مواجه شدم.",
        messages: [
            { id: "m1", from: "user", text: "سلام، هنگام ثبت نوبت با خطای پرداخت مواجه شدم.", time: "۱۰:۳۰" },
            { id: "m2", from: "support", text: "سلام کاربر گرامی، لطفاً شماره پیگیری پرداخت را ارسال کنید تا بررسی کنیم.", time: "۱۰:۴۵" },
            { id: "m3", from: "user", text: "متاسفانه هنگام پرداخت با خطا مواجه شدم.", time: "۱۱:۰۰" },
        ],
    },
    {
        id: "T-1002",
        title: "سوال درباره سرویس دوره‌ای",
        status: "closed",
        date: "۲ روز پیش",
        lastMessage: "بله، فیلتر هوا نیز شامل سرویس می‌شود.",
        messages: [
            { id: "m1", from: "user", text: "سرویس دوره‌ای شامل تعویض فیلتر هوا هست؟", time: "۰۹:۱۲" },
            { id: "m2", from: "support", text: "بله، فیلتر هوا نیز شامل سرویس می‌شود.", time: "۰۹:۲۰" },
        ],
    },
    {
        id: "T-1003",
        title: "لغو نوبت",
        status: "closed",
        date: "۱ هفته پیش",
        lastMessage: "نوبت شما با موفقیت لغو شد.",
        messages: [
            { id: "m1", from: "user", text: "می‌خواهم نوبت فردا را لغو کنم.", time: "۱۴:۰۰" },
            { id: "m2", from: "support", text: "نوبت شما با موفقیت لغو شد.", time: "۱۴:۱۰" },
        ],
    },
];
