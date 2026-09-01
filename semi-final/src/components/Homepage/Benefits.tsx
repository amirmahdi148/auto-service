import {useInView} from "../../utils/useInView";
import {BadgeCheck, MessageSquareQuote, Zap, Headphones, CreditCard, ShieldCheck} from "lucide-react";
import {SectionHeading} from "./SectionHeading";

const BENEFITS = [
    { Icon: BadgeCheck, title: "متخصصان تأییدشده", desc: "هر مرکز پس از بررسی مدارک و مهارت، توسط تیم ما تأیید می‌شود." },
    { Icon: MessageSquareQuote, title: "نظرات واقعی", desc: "فقط مشتریانی که خدمت دریافت کرده‌اند می‌توانند نظر ثبت کنند." },
    { Icon: Zap, title: "رزرو سریع", desc: "بدون معطلی و تماس‌های بی‌پایان، در چند دقیقه نوبت بگیرید." },
    { Icon: Headphones, title: "پشتیبانی ۲۴/۷", desc: "تیم پشتیبانی ما هر ساعت از شبانه‌روز کنار شماست." },
    { Icon: CreditCard, title: "قیمت شفاف", desc: "قیمت‌ها از پیش مشخص است؛ هیچ هزینه پنهانی وجود ندارد." },
    { Icon: ShieldCheck, title: "ضمانت کیفیت", desc: "خدمات با تضمین رضایت ارائه می‌شود؛ در غیر این صورت پیگیر هستیم." },
];

export const Benefits = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.3);

    return (
        <div ref={ref} className="flex flex-col gap-12 py-8 bg-surface-container-low rounded-[3rem]" id="benefits">
            <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <SectionHeading eyebrow="مزایای ما" title="چرا اتو پلاس؟" subtitle="تمام آنچه برای یک تجربه بی‌دردسر خدمات خودرو لازم دارید، در یک‌جا."/>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                {BENEFITS.map((benefit, i) => (
                    <div
                        key={benefit.title}
                        className={`group flex flex-col gap-3 bg-surface rounded-2xl p-6 border border-outline-variant hover:border-primary/30 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                        style={{ transitionDelay: `${i * 100}ms` }}
                    >
                        <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                            <benefit.Icon className="size-6" strokeWidth={1.5}/>
                        </div>
                        <h3 className="text-on-surface text-title-lg font-bold">{benefit.title}</h3>
                        <p className="text-on-surface-variant text-body-md">{benefit.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};