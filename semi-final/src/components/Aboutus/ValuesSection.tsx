import {useInView} from "../../utils/useInView";
import {Target, Eye, Gem, Handshake} from "lucide-react";

const VALUES = [
    { Icon: Target, title: "مأموریت", desc: "تبدیل هر مراجعه به تجربه‌ای بی‌دردسر، شفاف و قابل اعتماد برای صاحبان خودرو." },
    { Icon: Eye, title: "چشم‌انداز", desc: "تبدیل‌شدن به مرجع شماره یک خدمات خودرو در منطقه، با استانداردهای جهانی." },
    { Icon: Gem, title: "کیفیت بی‌گذشت", desc: "ما به هیچ‌وجه بر سر کیفیت کوتاه نمی‌آییم؛ هر جزئیات مهم است." },
    { Icon: Handshake, title: "اعتماد متقابل", desc: "شفافیت کامل در قیمت و گزارش‌ها، پایه‌گذار رابطه‌ای ماندگار با شما." },
];

const SectionHeading = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) => (
    <div className="flex flex-col items-center text-center gap-3">
        <span className="w-fit px-4 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-bold tracking-wide">{eyebrow}</span>
        <h2 className="text-on-surface text-headline-lg font-black leading-tight max-w-[720px]">{title}</h2>
        {subtitle && <p className="text-on-surface-variant text-body-lg font-normal leading-normal max-w-[720px]">{subtitle}</p>}
    </div>
);

export const ValuesSection = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.2);

    return (
        <section ref={ref} className="px-4">
            <div className="flex flex-col gap-12 py-16 bg-surface-container-low rounded-[3rem] p-6 md:p-12">
                <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <SectionHeading eyebrow="ارزش‌های ما" title="آنچه ما را تعریف می‌کند" subtitle="اصولی که در هر تصمیم و هر خدمت، ما را راهنمایی می‌کنند."/>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
                    {VALUES.map((value, i) => (
                        <div
                            key={value.title}
                            className={`group flex flex-col gap-3 bg-surface rounded-2xl p-6 border border-outline-variant hover:border-primary/30 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                            style={{ transitionDelay: `${i * 120}ms` }}
                        >
                            <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                <value.Icon className="size-6" strokeWidth={1.5}/>
                            </div>
                            <h3 className="text-on-surface text-title-lg font-bold">{value.title}</h3>
                            <p className="text-on-surface-variant text-body-md">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};