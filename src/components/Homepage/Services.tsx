import {Wrench, Droplets, RotateCw} from "lucide-react"
import {useInView} from "../../utils/useInView";

const cards = [
    {
        Icon: Wrench,
        title: "مکانیک و تعمیرات",
        desc: "دسترسی به تعمیرگاه‌های مجاز و متخصصین عیب‌یابی با تجهیزات پیشرفته.",
    },
    {
        Icon: Droplets,
        title: "مراکز دیتیلینگ",
        desc: "مقایسه و رزرو برترین مراکز احیای رنگ، سرامیک و صفرشویی تخصصی.",
    },
    {
        Icon: RotateCw,
        title: "خدمات تایر و جلوبندی",
        desc: "یافتن نزدیک‌ترین و معتبرترین مراکز برای تعویض لاستیک و تنظیم فرمان.",
    },
]

export const Services = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.4)

    return (
        <div ref={ref} className="flex flex-col gap-12 px-4 py-16 @container smooth-curve-top bg-surface-container-low rounded-[3rem] mb-16" id="services">
            <div className={`flex flex-col items-center text-center gap-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <h2 className="text-on-surface text-headline-lg font-black leading-tight max-w-[720px]">
                    تنوع بی‌نظیر خدمات
                </h2>
                <p className="text-on-surface-variant text-body-lg font-normal leading-normal max-w-[720px]">از سرویس‌های دوره‌ای تا دیتیلینگ تخصصی؛ هر آنچه خودروی شما نیاز دارد را در پلتفرم ما بیابید.</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
                {cards.map((card, i) => (
                    <div
                        key={card.title}
                        className={`group flex flex-col gap-4 bg-surface rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-surface-variant hover:border-primary/30 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                        style={{ transitionDelay: `${i * 150}ms` }}
                    >
                        <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <card.Icon className="size-7" strokeWidth={1.5}/>
                        </div>
                        <h3 className="text-on-surface text-title-lg font-bold">{card.title}</h3>
                        <p className="text-on-surface-variant text-body-md">{card.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}