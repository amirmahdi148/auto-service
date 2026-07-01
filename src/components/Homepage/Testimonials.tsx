import {useInView} from "../../utils/useInView";
import {Quote, Star} from "lucide-react";

const TESTIMONIALS = [
    { name: "سارا محمدی", role: "صاحب پژو ۲۰۶", quote: "برای اولین بار بدون نگرانی، تعمیرگاه مطمئنی پیدا کردم. فرایند رزرو فوق‌العاده ساده بود.", rating: 5 },
    { name: "رضا کریمی", role: "راننده اسنپ", quote: "به‌خاطر کارم به سرعت برای ماشینم نیاز داشتم. اتو پلاس سریع‌ترین راه برای پیدا کردن مرکز بود.", rating: 5 },
    { name: "مریم احمدی", role: "صاحب هایما", quote: "نظرات واقعی مشتریان خیلی کمکم کرد تا درست انتخاب کنم. کیفیت کار عالی بود.", rating: 4 },
];

const SectionHeading = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) => (
    <div className="flex flex-col items-center text-center gap-3">
        <span className="w-fit px-4 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-bold tracking-wide">
            {eyebrow}
        </span>
        <h2 className="text-on-surface text-headline-lg font-black leading-tight max-w-[720px]">
            {title}
        </h2>
        {subtitle && (
            <p className="text-on-surface-variant text-body-lg font-normal leading-normal max-w-[720px]">
                {subtitle}
            </p>
        )}
    </div>
);

export const Testimonials = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.3);

    return (
        <div ref={ref} className="flex flex-col gap-12 px-4" id="reviews">
            <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <SectionHeading eyebrow="نظرات مشتریان" title="تجربه‌ای که مشتریان ما روایت می‌کنند" subtitle="هزاران راننده به اتو پلاس اعتماد کرده‌اند. این بخشی از داستان آن‌هاست."/>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                {TESTIMONIALS.map((t, i) => (
                    <div
                        key={t.name}
                        className={`relative flex flex-col gap-4 bg-surface rounded-2xl p-6 border border-outline-variant transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                        style={{ transitionDelay: `${i * 150}ms` }}
                    >
                        <Quote className="size-8 text-primary/20 absolute top-6 right-6" strokeWidth={1.5}/>
                        <div className="flex gap-1 text-tertiary-fixed-dim">
                            {Array.from({ length: 5 }).map((_, s) => (
                                <Star key={s} className={`size-4 ${s < t.rating ? "fill-current" : "opacity-30"}`} strokeWidth={1.5}/>
                            ))}
                        </div>
                        <p className="text-on-surface text-body-md leading-relaxed">«{t.quote}»</p>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-lg font-bold">
                                {t.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-on-surface text-label-lg font-bold">{t.name}</span>
                                <span className="text-on-surface-variant text-label-sm">{t.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};