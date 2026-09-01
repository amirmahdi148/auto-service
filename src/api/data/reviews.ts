export interface Review {
    id: string;
    customerName: string;
    serviceName: string;
    rating: number;
    comment: string;
    date: string;
    status: "pending" | "approved" | "rejected";
    reply?: string;
}

export const REVIEWS: Review[] = [
    { id: "1", customerName: "امیر ملکی", serviceName: "تعویض روغن و فیلتر", rating: 5, comment: "بسیار عالی و سریع انجام شد. پرسنل بسیار خوش‌برخورد بودند.", date: "۲ روز پیش", status: "pending" },
    { id: "2", customerName: "سارا حسینی", serviceName: "سرویس دوره‌ای", rating: 4, comment: "همه چیز خوب بود ولی کمی زمان انتظار طولانی شد.", date: "۱ هفته پیش", status: "approved" },
    { id: "3", customerName: "علی کریمی", serviceName: "تعمیر گیربکس", rating: 5, comment: "مشکل گیربکس ماشین من به طور کامل برطرف شد. ممنون از تیم حرفه‌ای.", date: "۲ هفته پیش", status: "approved" },
    { id: "4", customerName: "محمد رضایی", serviceName: "جلوبندی", rating: 2, comment: "هزینه نسبت به جاهای دیگه خیلی بیشتر بود و کیفیت هم معمولی.", date: "۱ ماه پیش", status: "rejected" },
    { id: "5", customerName: "زهرا احمدی", serviceName: "تعویض لنت ترمز", rating: 5, comment: "با دقت و سرعت بالا انجام شد. حتما دوباره مراجعه می‌کنم.", date: "۲ ماه پیش", status: "pending" },
];
