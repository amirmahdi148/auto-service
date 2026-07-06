import {useInView} from "../../utils/useInView";
import {Search, GitCompare, CalendarCheck, Car} from "lucide-react";
import {SectionHeading} from "./SectionHeading";

const STEPS = [
    { Icon: Search, title: "جستجوی خدمت", desc: "نوع خدمت و موقعیت خود را وارد کنید تا نزدیک‌ترین مراکز را ببینید." },
    { Icon: GitCompare, title: "مقایسه و انتخاب", desc: "مراکز را بر اساس نظرات، امتیاز و قیمت کنار هم بگذارید." },
    { Icon: CalendarCheck, title: "رزرو آنلاین", desc: "نوبت خود را در چند ثانیه و بدون تماس تلفنی رزرو کنید." },
    { Icon: Car, title: "دریافت خدمت", desc: "در زمان مقرر به مرکز مراجعه و از خدمت باکیفیت لذت ببرید." },
];

export const HowItWorks = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.3);

    return (
        <div ref={ref} className="flex flex-col gap-12" id="how-it-works">
            <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <SectionHeading eyebrow="ساده و سریع" title="چطور در اتو پلاس نوبت می‌گیریم؟" subtitle="فقط در چهار گام ساده، خدمت موردنظر خودروی خود را رزرو کنید."/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                <div className="hidden lg:block absolute top-12 inset-x-12 border-t-2 border-dashed border-outline-variant"/>

                {STEPS.map((step, i) => (
                    <div
                        key={step.title}
                        className={`relative flex flex-col gap-3 bg-surface rounded-2xl p-6 border border-outline-variant hover:border-primary/30 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                        style={{ transitionDelay: `${i * 150}ms` }}
                    >
                        <span className="absolute -top-3 right-6 w-8 h-8 rounded-full bg-primary text-on-primary text-label-sm font-bold flex items-center justify-center shadow-sm">{i + 1}</span>
                        <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mt-2">
                            <step.Icon className="size-6" strokeWidth={1.5}/>
                        </div>
                        <h3 className="text-on-surface text-title-lg font-bold">{step.title}</h3>
                        <p className="text-on-surface-variant text-body-md">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};