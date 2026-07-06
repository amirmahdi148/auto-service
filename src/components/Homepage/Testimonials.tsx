import {useInView} from "../../utils/useInView";
import {Quote, Star} from "lucide-react";
import {SectionHeading} from "./SectionHeading";

interface Testimonial {
    name: string;
    role: string;
    quote: string;
    rating: number;
    center?: string;
}

const TESTIMONIALS: Testimonial[] = [
    {name: "سارا محمدی", role: "صاحب پژو ۲۰۶", quote: "برای اولین بار بدون نگرانی، تعمیرگاه مطمئنی پیدا کردم. فرایند رزرو فوق‌العاده ساده بود.", rating: 5, center: "تعمیرگاه آریا"},
    {name: "رضا کریمی", role: "راننده اسنپ", quote: "به‌خاطر کارم به سرعت برای ماشینم نیاز داشتم. اتو پلاس سریع‌ترین راه برای پیدا کردن مرکز بود.", rating: 5, center: "کلینیک درخشش"},
    {name: "مریم احمدی", role: "صاحب هایما", quote: "نظرات واقعی مشتریان خیلی کمکم کرد تا درست انتخاب کنم. کیفیت کار عالی بود.", rating: 4, center: "مرکز خدمات پارس"},
];

export const Testimonials = () => {
    const {ref, inView} = useInView<HTMLDivElement>(0.3);

    return (
        <div ref={ref} className="flex flex-col gap-12" id="reviews">
            <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <SectionHeading
                    eyebrow="نظرات مشتریان"
                    title="تجربه‌ای که مشتریان ما روایت می‌کنند"
                    subtitle="هزاران راننده به اتو پلاس اعتماد کرده‌اند. این بخشی از داستان آن‌هاست."
                />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                {TESTIMONIALS.map((t, i) => (
                    <div
                        key={t.name}
                        className={`relative flex flex-col gap-4 bg-surface rounded-2xl p-6 border border-outline-variant transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                        style={{transitionDelay: `${i * 150}ms`}}
                    >
                        {/* Background quote icon */}
                        <Quote className="size-8 text-primary/20 absolute top-6 end-6" strokeWidth={1.5}/>

                        {/* Stars */}
                        <div className="flex gap-1 text-tertiary-fixed-dim">
                            {Array.from({length: 5}).map((_, s) => (
                                <Star key={s} className={`size-4 ${s < t.rating ? "fill-current" : "opacity-30"}`} strokeWidth={1.5}/>
                            ))}
                        </div>

                        {/* Quote */}
                        <p className="text-on-surface text-body-md leading-relaxed">«{t.quote}»</p>

                        {/* Avatar + Name + Role + Center */}
                        <div className="flex items-center gap-3 mt-2">
                            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-lg font-bold shrink-0">
                                {t.name.charAt(0)}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-on-surface text-label-lg font-bold">{t.name}</span>
                                <span className="text-on-surface-variant text-label-sm">{t.role}</span>
                                {t.center && (
                                    <span className="text-label-sm text-primary font-medium truncate">{t.center}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
