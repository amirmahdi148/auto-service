import {useState} from "react";
import {useInView} from "../../utils/useInView";
import {Plus, ArrowLeft} from "lucide-react";

const FAQS = [
    { q: "آیا رزرو نوبت از طریق پلتفرم هزینه‌ای دارد؟", a: "خیر، ثبت‌نام و رزرو نوبت برای مشتریان کاملاً رایگان است. شما فقط هزینه خود خدمت را به مرکز پرداخت می‌کنید." },
    { q: "چگونه از اعتبار مراکز مطمئن شوم؟", a: "تمام مراکز پیش از عضویت بررسی و تأیید می‌شوند و نظرات فقط توسط مشتریان واقعی پس از دریافت خدمت ثبت می‌گردد." },
    { q: "اگر از خدمت رضایت نداشته باشم چه کنم؟", a: "خدمات اتو پلاس با تضمین رضایت ارائه می‌شود. در صورت بروز مشکل، تیم پشتیبانی ۲۴ ساعته ما موضوع را پیگیری می‌کند." },
    { q: "آیا امکان لغو یا تغییر نوبت وجود دارد؟", a: "بله، می‌توانید نوبت خود را تا چند ساعت قبل از زمان مقرر از طریق پنل کاربری لغو یا تغییر دهید." },
];

const SectionHeading = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) => (
    <div className="flex flex-col items-center text-center gap-3">
        <span className="w-fit px-4 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-bold tracking-wide">
            {eyebrow}
        </span>
        <h2 className="text-on-surface text-headline-lg font-black leading-tight max-w-[720px]">
            {title}
        </h2>
        {subtitle && (
            <p className="text-on-surface-variant text-body-lg font-normal leading-normal max-w-[720px]">
                {subtitle}
            </p>
        )}
    </div>
);

export const Faq = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.2);
    const [openFaq, setOpenFaq] = useState<number>(0);

    return (
        <div ref={ref} className="flex flex-col gap-8 px-4 max-w-3xl w-full self-center" id="faq">
            <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <SectionHeading eyebrow="راهنما" title="سوالات متداول" subtitle="پاسخ پرسش‌های پرتکرار را اینجا بیابید."/>
            </div>
            <div className="flex flex-col gap-3">
                {FAQS.map((faq, i) => {
                    const isOpen = openFaq === i;
                    return (
                        <div
                            key={faq.q}
                            className={`bg-surface rounded-2xl border transition-colors duration-300 ${isOpen ? "border-primary/40" : "border-outline-variant"}`}
                        >
                            <button
                                onClick={() => setOpenFaq(isOpen ? -1 : i)}
                                className="flex items-center justify-between w-full text-right gap-4 p-5 cursor-pointer"
                            >
                                <span className="text-on-surface text-title-lg font-bold">{faq.q}</span>
                                <Plus className={`size-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`} strokeWidth={2}/>
                            </button>
                            <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                <div className="overflow-hidden">
                                    <p className="text-on-surface-variant text-body-md px-5 pb-5 leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                <span className="text-body-md">سوال دیگری دارید؟</span>
                <a href="#" className="flex items-center gap-1 text-primary font-bold text-body-md hover:gap-2 transition-all">
                    با پشتیبانی در ارتباط باشید <ArrowLeft className="size-4" strokeWidth={2}/>
                </a>
            </div>
        </div>
    );
};