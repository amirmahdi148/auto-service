import { useState } from "react";
import {
    Search,
    Filter,
    Star,
    Check,
    X,
    MessageSquare,
    MoreHorizontal
} from "lucide-react";

const MOCK_REVIEWS = [
    { id: "1", customerName: "امیر ملکی", serviceName: "تعویض روغن و فیلتر", rating: 5, comment: "بسیار عالی و سریع انجام شد. پرسنل بسیار خوش‌برخورد بودند.", date: "۲ روز پیش", status: "pending" },
    { id: "2", customerName: "سارا حسینی", serviceName: "سرویس دوره‌ای", rating: 4, comment: "همه چیز خوب بود ولی کمی زمان انتظار طولانی شد.", date: "۱ هفته پیش", status: "approved" },
    { id: "3", customerName: "علی کریمی", serviceName: "تعمیر گیربکس", rating: 5, comment: "مشکل گیربکس ماشین من به طور کامل برطرف شد. ممنون از تیم حرفه‌ای.", date: "۲ هفته پیش", status: "approved" },
    { id: "4", customerName: "محمد رضایی", serviceName: "جلوبندی", rating: 2, comment: "هزینه نسبت به جاهای دیگه خیلی بیشتر بود و کیفیت هم معمولی.", date: "۱ ماه پیش", status: "rejected" },
    { id: "5", customerName: "زهرا احمدی", serviceName: "تعویض لنت ترمز", rating: 5, comment: "با دقت و سرعت بالا انجام شد. حتما دوباره مراجعه می‌کنم.", date: "۲ ماه پیش", status: "pending" },
];

export const ReviewsPage = () => {
    const [search, setSearch] = useState("");

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5" dir="ltr">
                {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        className={`size-4 ${i < rating ? "fill-primary text-primary" : "text-outline-variant"}`} 
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-6">
            {/* ===================== HEADER ===================== */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-on-surface text-headline-md font-black">نظرات</h1>
                        <span className="px-2 py-0.5 rounded-full bg-surface border border-outline-variant text-on-surface-variant text-label-sm font-bold tabular-nums">
                            ۵ مورد
                        </span>
                    </div>
                    <p className="text-on-surface-variant text-body-md">
                        مدیریت نظرات و بازخوردهای مشتریان
                    </p>
                </div>
            </div>

            {/* ===================== TOOLBAR ===================== */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute right-4 top-3.5 size-4 text-on-surface-variant" strokeWidth={1.5} />
                    <input 
                        type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="جستجو در نظرات مشتریان..." 
                        className="w-full h-11 pl-4 pr-11 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface text-label-md"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-surface border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer shrink-0">
                    <Filter className="size-4 text-on-surface-variant" strokeWidth={1.5}/>
                    فیلترها
                </button>
            </div>

            {/* ===================== LIST / CARDS ===================== */}
            <div className="flex flex-col gap-4">
                {MOCK_REVIEWS.map((review) => (
                    <div key={review.id} className="p-4 sm:p-5 rounded-2xl bg-surface border border-outline-variant flex flex-col gap-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-title-md font-bold shrink-0">
                                    {review.customerName.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-on-surface text-label-lg font-bold">{review.customerName}</span>
                                    <div className="flex items-center gap-2 text-on-surface-variant text-label-sm mt-0.5">
                                        <span>{review.serviceName}</span>
                                        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                                        <span>{review.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                {review.status === "pending" && (
                                    <span className="inline-flex px-2.5 py-1 rounded-full text-label-sm font-bold bg-tertiary-fixed text-on-tertiary-fixed">
                                        در انتظار تایید
                                    </span>
                                )}
                                {review.status === "approved" && (
                                    <span className="inline-flex px-2.5 py-1 rounded-full text-label-sm font-bold bg-primary/10 text-primary">
                                        تایید شده
                                    </span>
                                )}
                                {review.status === "rejected" && (
                                    <span className="inline-flex px-2.5 py-1 rounded-full text-label-sm font-bold bg-secondary/10 text-secondary">
                                        رد شده
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            {renderStars(review.rating)}
                            <p className="text-on-surface text-body-md leading-relaxed">
                                {review.comment}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                            <div className="flex items-center gap-2">
                                {review.status === "pending" && (
                                    <>
                                        <button className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-primary text-on-primary font-bold text-label-sm cursor-pointer hover:bg-primary-container transition-colors">
                                            <Check className="size-4" strokeWidth={2}/>
                                            تایید
                                        </button>
                                        <button className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-surface border border-outline-variant text-secondary font-bold text-label-sm cursor-pointer hover:bg-secondary/10 hover:border-secondary/30 transition-colors">
                                            <X className="size-4" strokeWidth={2}/>
                                            رد کردن
                                        </button>
                                    </>
                                )}
                                <button className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-surface border border-outline-variant text-on-surface font-bold text-label-sm cursor-pointer hover:bg-surface-container-high transition-colors">
                                    <MessageSquare className="size-4" strokeWidth={2}/>
                                    پاسخ دادن
                                </button>
                            </div>
                            <button aria-label="گزینه‌ها" className="inline-flex items-center justify-center w-9 h-9 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface cursor-pointer transition-colors">
                                <MoreHorizontal className="size-5" strokeWidth={1.5}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
