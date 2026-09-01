import {useInView} from "../../utils/useInView";
import {Microscope, Cog, ShieldCheck, Clock} from "lucide-react";

const APPROACH = [
    { Icon: Microscope, title: "شفافیت کامل", desc: "قیمت‌ها و نظرات واقعی مشتریان پیش از انتخاب، هیچ هزینه پنهانی وجود ندارد." },
    { Icon: Cog, title: "مراکز تأییدشده", desc: "همه مراکز قبل از عضویت بررسی و تأیید می‌شوند تا کیفیت تضمین شود." },
    { Icon: ShieldCheck, title: "رزرو آنلاین", desc: "بدون تماس تلفنی و معطلی، در چند ثانیه نوبت خود را رزرو کنید." },
    { Icon: Clock, title: "پشتیبانی ۲۴/۷", desc: "تیم پشتیبانی ما هر ساعت از شبانه‌روز آماده پاسخگویی به سوالات شماست." },
];

const SectionHeading = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) => (
    <div className="flex flex-col items-center text-center gap-3">
        <span className="w-fit px-4 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-bold tracking-wide">{eyebrow}</span>
        <h2 className="text-on-surface text-headline-lg font-black leading-tight max-w-[720px]">{title}</h2>
        {subtitle && <p className="text-on-surface-variant text-body-lg font-normal leading-normal max-w-[720px]">{subtitle}</p>}
    </div>
);

export const ApproachSection = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.2);

    return (
        <section ref={ref} className="px-4">
            <div className="flex flex-col gap-12 py-16 bg-surface-container-low rounded-[3rem] p-6 md:p-12">
                <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <SectionHeading eyebrow="روش ما" title="چرا اتو پلاس؟" subtitle="هر آنچه برای یک تجربه مطمئن و آسان خدمات خودرو نیاز دارید."/>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
                    {APPROACH.map((item, i) => (
                        <div
                            key={item.title}
                            className={`flex flex-col gap-3 bg-surface rounded-2xl p-6 border border-outline-variant hover:border-primary/30 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                            style={{ transitionDelay: `${i * 120}ms` }}
                        >
                            <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-1">
                                <item.Icon className="size-6" strokeWidth={1.5}/>
                            </div>
                            <h3 className="text-on-surface text-title-lg font-bold">{item.title}</h3>
                            <p className="text-on-surface-variant text-body-md">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};