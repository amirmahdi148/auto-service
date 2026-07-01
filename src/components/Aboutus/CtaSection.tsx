import {useInView} from "../../utils/useInView";
import {Quote, Sparkles, ChevronLeft} from "lucide-react";

export const CtaSection = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.2);

    return (
        <section ref={ref} className="px-4">
            <div className={`bg-surface-container-low rounded-[3rem] p-8 md:p-16 flex flex-col items-center text-center gap-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <Quote className="size-10 text-primary/20" strokeWidth={1.5}/>
                <p className="text-on-surface text-headline-lg @[480px]:text-headline-lg font-black leading-tight max-w-3xl">
                    «بهترین خدمات خودرو، شفاف‌ترین قیمت‌ها، در یک پلتفرم.»
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                    <a className="flex items-center gap-2 h-12 px-7 rounded-full bg-primary text-on-primary font-bold cursor-pointer hover:bg-primary-container hover:text-on-primary-container transition-colors" href="#">
                        <span>ثبت‌نام در پلتفرم</span>
                        <Sparkles className="size-4" strokeWidth={1.5}/>
                    </a>
                    <a className="flex items-center gap-2 h-12 px-6 rounded-full bg-surface border border-outline-variant text-on-surface font-bold cursor-pointer hover:border-primary/30 transition-colors" href="#">
                        تماس با ما
                        <ChevronLeft className="size-4" strokeWidth={2}/>
                    </a>
                </div>
            </div>
        </section>
    );
};