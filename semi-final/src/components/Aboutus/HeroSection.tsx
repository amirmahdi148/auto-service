import {useInView} from "../../utils/useInView";
import {Sparkles, Play} from "lucide-react";

const HERO_STATS = [
    { value: "+۱۷", label: "سال تجربه" },
    { value: "+۴۵۰", label: "متخصص" },
    { value: "٪۹۸", label: "رضایت مشتری" },
];

export const HeroSection = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.2);

    return (
        <section ref={ref} className="px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-surface-container-low rounded-[3rem] p-8 md:p-14 relative overflow-hidden">
                <div className="absolute -top-1/3 -left-1/4 w-1/2 h-1/2 rounded-full bg-primary/5 blur-3xl"/>

                <div className={`flex flex-col gap-5 relative z-10 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <span className="w-fit flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-bold tracking-wide">
                        <Sparkles className="size-4"/> بازارگاه تخصصی خدمات خودرو
                    </span>
                    <h1 className="text-on-surface text-display-lg-mobile @[768px]:text-display-lg font-black leading-tight">
                        بهترین مراکز خدمات خودرو، <span className="text-secondary">در یک نگاه</span>
                    </h1>
                    <p className="text-on-surface-variant text-body-lg font-normal leading-relaxed max-w-xl">
                        اتو پلاس شما را به بهترین تعمیرگاه‌ها و مراکز خدمات خودرو متصل می‌کند. مقایسه کنید، نظرات را بخوانید و نوبت خود را آنلاین رزرو کنید — همه در یک پلتفرم.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2">
                        <button className="flex items-center gap-2 h-12 px-7 rounded-full bg-primary text-on-primary font-bold cursor-pointer hover:bg-primary-container hover:text-on-primary-container transition-colors">
                            جستجوی خدمات
                        </button>
                        <button className="flex items-center gap-2 h-12 px-6 rounded-full bg-surface border border-outline-variant text-on-surface font-bold cursor-pointer hover:border-primary/30 transition-colors">
                            <Play className="size-4 fill-current" strokeWidth={1.5}/>
                            درباره ما
                        </button>
                    </div>
                </div>

                <div className={`flex justify-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="bg-surface rounded-[2rem] p-8 border border-outline-variant w-full max-w-sm flex flex-col gap-6">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            {HERO_STATS.map((s, i) => (
                                <div key={s.label} className="flex flex-col gap-1" style={{ transitionDelay: `${i * 120}ms` }}>
                                    <span className="text-primary text-headline-md font-black tabular-nums">{s.value}</span>
                                    <span className="text-on-surface-variant text-label-sm">{s.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="h-px bg-outline-variant/60"/>
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-3 rtl:space-x-reverse">
                                {["ر", "س", "ک"].map((c) => (
                                    <div key={c} className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container border-2 border-surface flex items-center justify-center text-label-sm font-bold">
                                        {c}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-on-surface text-label-lg font-bold">به خانواده ما بپیوندید</span>
                                <span className="text-on-surface-variant text-label-sm">+۵۰٬۰۰۰ مشتری راضی</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};