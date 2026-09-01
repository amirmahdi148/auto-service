import {useInView} from "../../utils/useInView";

const MILESTONES = [
    { year: "۱۳۹۸", title: "تولد یک ایده", desc: "شکل‌گیری ایده ایجاد یک بازارگاه شفاف و آنلاین برای خدمات خودرو." },
    { year: "۱۳۹۹", title: "راه‌اندازی پلتفرم", desc: "رونمایی از نسخه اولیه پلتفرم با ۵۰ مرکز همکار در تهران." },
    { year: "۱۴۰۱", title: "گسترش ملی", desc: "افزایش شبکه به بیش از ۳۰۰ مرکز در ۲۰ شهر و ثبت‌نام ۲۰٬۰۰۰ کاربر." },
    { year: "۱۴۰۴", title: "پیشرو بازار", desc: "بیش از ۱٬۲۰۰ مرکز همکار و ۵۰٬۰۰۰ مشتری وفادار در سراسر کشور." },
];

const SectionHeading = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
    <div className="flex flex-col items-center text-center gap-3">
        <span className="w-fit px-4 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-bold tracking-wide">{eyebrow}</span>
        <h2 className="text-on-surface text-headline-lg font-black leading-tight max-w-[720px]">{title}</h2>
    </div>
);

export const JourneySection = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.15);

    return (
        <section ref={ref} className="px-4 max-w-container-max-width mx-auto w-full">
            <div className={`mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <SectionHeading eyebrow="مسیر ما" title="از یک ایده تا بزرگ‌ترین بازارگاه خودرو"/>
            </div>

            <div className="relative">
                <div className="absolute top-0 bottom-0 right-8 md:right-1/2 md:translate-x-1/2 w-0.5 bg-outline-variant"/>

                <div className="flex flex-col gap-10">
                    {MILESTONES.map((m, i) => {
                        const isLeft = i % 2 === 1;
                        return (
                            <div
                                key={m.year}
                                className={`relative flex items-center gap-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                                style={{ transitionDelay: `${i * 150}ms` }}
                            >
                                <div className="absolute right-8 md:right-1/2 translate-x-1/2 z-10">
                                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-surface"/>
                                </div>

                                <div className={`w-full md:w-1/2 mr-16 md:mr-0 ${isLeft ? "md:order-2 md:pl-14" : "md:order-1 md:pr-14 md:text-right"}`}>
                                    <div className="bg-surface rounded-2xl p-6 border border-outline-variant hover:border-primary/30 transition-colors">
                                        <span className="text-secondary font-black text-headline-md block mb-2 tabular-nums">{m.year}</span>
                                        <h3 className="text-on-surface text-title-lg font-bold mb-2">{m.title}</h3>
                                        <p className="text-on-surface-variant text-body-md">{m.desc}</p>
                                    </div>
                                </div>
                                <div className={`hidden md:block md:w-1/2 ${isLeft ? "md:order-1" : "md:order-2"}`}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};