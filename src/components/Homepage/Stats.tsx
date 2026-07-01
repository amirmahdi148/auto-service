import {useInView} from "../../utils/useInView";
import {Users, Wrench, Star, MapPin} from "lucide-react";

const STATS = [
    { Icon: Users, value: "+۵۰٬۰۰۰", label: "مشتری راضی" },
    { Icon: Wrench, value: "+۱٬۲۰۰", label: "مرکز همکار" },
    { Icon: Star, value: "۴.۸", label: "امتیاز مشتریان" },
    { Icon: MapPin, value: "+۳۰", label: "شهر پوشش‌دار" },
];

export const Stats = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.3);

    return (
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 -mt-8">
            {STATS.map((stat, i) => (
                <div
                    key={stat.label}
                    className={`flex flex-col items-center text-center gap-1 bg-surface rounded-2xl p-6 border border-outline-variant transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                >
                    <div className="w-11 h-11 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-1">
                        <stat.Icon className="size-5" strokeWidth={1.5}/>
                    </div>
                    <span className="text-on-surface text-headline-md font-black tabular-nums">{stat.value}</span>
                    <span className="text-on-surface-variant text-label-lg font-medium">{stat.label}</span>
                </div>
            ))}
        </div>
    );
};