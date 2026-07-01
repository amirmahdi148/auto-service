import {useInView} from "../../utils/useInView";
import {Award, Wrench, HeartHandshake, ShieldCheck} from "lucide-react";

const BIG_STATS = [
    { Icon: Award, value: "+۱۷", label: "سال اصالت" },
    { Icon: Wrench, value: "+۴۵۰", label: "تکنیسین مجرب" },
    { Icon: HeartHandshake, value: "+۵۰٬۰۰۰", label: "مشتری وفادار" },
    { Icon: ShieldCheck, value: "٪۹۸", label: "نرخ رضایت" },
];

export const StatsBand = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.2);

    return (
        <section ref={ref} className="px-4">
            <div className="bg-primary rounded-[3rem] p-8 md:p-14 relative overflow-hidden">
                <div className="absolute -bottom-1/3 -right-1/4 w-1/2 h-1/2 rounded-full bg-on-primary/5 blur-3xl"/>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {BIG_STATS.map((stat, i) => (
                        <div
                            key={stat.label}
                            className={`flex flex-col items-center text-center gap-2 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                            style={{ transitionDelay: `${i * 120}ms` }}
                        >
                            <div className="w-12 h-12 rounded-full bg-on-primary/10 border border-on-primary/15 text-on-primary flex items-center justify-center mb-1">
                                <stat.Icon className="size-6" strokeWidth={1.5}/>
                            </div>
                            <span className="text-on-primary text-headline-lg font-black tabular-nums">{stat.value}</span>
                            <span className="text-primary-fixed text-label-lg font-medium">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};