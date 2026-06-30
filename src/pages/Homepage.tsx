import {useState} from "react";
import {Hero} from "../components/Homepage/Hero.tsx";
import {Services} from "../components/Homepage/Services.tsx";
import {Partners} from "../components/Homepage/Partners.tsx";
import {CtaSection} from "../components/Homepage/CtaSection.tsx";
import {useInView} from "../utils/useInView";
import {
    Users,
    Wrench,
    Star,
    MapPin,
    Search,
    GitCompare,
    CalendarCheck,
    Car,
    BadgeCheck,
    MessageSquareQuote,
    Zap,
    Headphones,
    CreditCard,
    ShieldCheck,
    Quote,
    Plus,
    ChevronLeft,
    Smartphone,
    Clock,
    Sparkles,
    Gauge,
    Award,
    ArrowLeft,
} from "lucide-react";

/* ============================================================================
 * HOMEPAGE CONTENT MODEL
 * All copy/data lives at module scope so it isn't re-allocated on each render.
 * Persian copy, RTL flow, Vazirmatn — see DESIGN.md "Heritage Tech".
 * ========================================================================== */

// (1) Headline trust numbers — placed right under the hero for instant proof.
const STATS = [
    { Icon: Users, value: "+۵۰٬۰۰۰", label: "مشتری راضی" },
    { Icon: Wrench, value: "+۱٬۲۰۰", label: "مرکز همکار" },
    { Icon: Star, value: "۴.۸", label: "امتیاز مشتریان" },
    { Icon: MapPin, value: "+۳۰", label: "شهر پوشش‌دار" },
];

// (2) Car brands the network services — a silent "we cover your car" signal.
const BRANDS = ["BMW", "Mercedes-Benz", "Toyota", "Hyundai", "Kia", "Peugeot", "Renault"];

// (3) The 4-step journey from search to a finished service.
const STEPS = [
    { Icon: Search, title: "جستجوی خدمت", desc: "نوع خدمت و موقعیت خود را وارد کنید تا نزدیک‌ترین مراکز را ببینید." },
    { Icon: GitCompare, title: "مقایسه و انتخاب", desc: "مراکز را بر اساس نظرات، امتیاز و قیمت کنار هم بگذارید." },
    { Icon: CalendarCheck, title: "رزرو آنلاین", desc: "نوبت خود را در چند ثانیه و بدون تماس تلفنی رزرو کنید." },
    { Icon: Car, title: "دریافت خدمت", desc: "در زمان مقرر به مرکز مراجعه و از خدمت باکیفیت لذت ببرید." },
];

// (4) Headline benefits — why pick us over calling a random garage.
const BENEFITS = [
    { Icon: BadgeCheck, title: "متخصصان تأییدشده", desc: "هر مرکز پس از بررسی مدارک و مهارت، توسط تیم ما تأیید می‌شود." },
    { Icon: MessageSquareQuote, title: "نظرات واقعی", desc: "فقط مشتریانی که خدمت دریافت کرده‌اند می‌توانند نظر ثبت کنند." },
    { Icon: Zap, title: "رزرو سریع", desc: "بدون معطلی و تماس‌های بی‌پایان، در چند دقیقه نوبت بگیرید." },
    { Icon: Headphones, title: "پشتیبانی ۲۴/۷", desc: "تیم پشتیبانی ما هر ساعت از شبانه‌روز کنار شماست." },
    { Icon: CreditCard, title: "قیمت شفاف", desc: "قیمت‌ها از پیش مشخص است؛ هیچ هزینه پنهانی وجود ندارد." },
    { Icon: ShieldCheck, title: "ضمانت کیفیت", desc: "خدمات با تضمین رضایت ارائه می‌شود؛ در غیر این صورت پیگیر هستیم." },
];

// (5) Customer voices for social proof.
const TESTIMONIALS = [
    { name: "سارا محمدی", role: "صاحب پژو ۲۰۶", quote: "برای اولین بار بدون نگرانی، تعمیرگاه مطمئنی پیدا کردم. فرایند رزرو فوق‌العاده ساده بود.", rating: 5 },
    { name: "رضا کریمی", role: "راننده اسنپ", quote: "به‌خاطر کارم به سرعت برای ماشینم نیاز داشتم. اتو پلاس سریع‌ترین راه برای پیدا کردن مرکز بود.", rating: 5 },
    { name: "مریم احمدی", role: "صاحب هایما", quote: "نظرات واقعی مشتریان خیلی کمکم کرد تا درست انتخاب کنم. کیفیت کار عالی بود.", rating: 4 },
];

// (6) Platform features highlighted in the showcase split-section.
const SHOWCASE_FEATURES = [
    { Icon: Gauge, title: "مقایسه هوشمند", desc: "مراکز را بر اساس امتیاز، فاصله و قیمت در یک نگاه بسنجید." },
    { Icon: Clock, title: "مدیریت زمان", desc: "بدون انتظار در صف؛ نوبت دقیقاً برای ساعت دلخواه شما." },
    { Icon: Award, title: "گزارش شفاف", desc: "تاریخچه کامل خدمات و هزینه‌ها همیشه در دسترس شماست." },
];

// (7) FAQ entries that resolve the most common pre-purchase doubts.
const FAQS = [
    { q: "آیا رزرو نوبت از طریق پلتفرم هزینه‌ای دارد؟", a: "خیر، ثبت‌نام و رزرو نوبت برای مشتریان کاملاً رایگان است. شما فقط هزینه خود خدمت را به مرکز پرداخت می‌کنید." },
    { q: "چگونه از اعتبار مراکز مطمئن شوم؟", a: "تمام مراکز پیش از عضویت بررسی و تأیید می‌شوند و نظرات فقط توسط مشتریان واقعی پس از دریافت خدمت ثبت می‌گردد." },
    { q: "اگر از خدمت رضایت نداشته باشم چه کنم؟", a: "خدمات اتو پلاس با تضمین رضایت ارائه می‌شود. در صورت بروز مشکل، تیم پشتیبانی ۲۴ ساعته ما موضوع را پیگیری می‌کند." },
    { q: "آیا امکان لغو یا تغییر نوبت وجود دارد؟", a: "بله، می‌توانید نوبت خود را تا چند ساعت قبل از زمان مقرر از طریق پنل کاربری لغو یا تغییر دهید." },
];

/* Small presentational helper — a centered section heading (eyebrow + title + subtitle).
   Keeps the section openers visually consistent without componentizing each one. */
const SectionHeading = ({ eyebrow, title, subtitle, dark = false }: {
    eyebrow: string;
    title: string;
    subtitle?: string;
    dark?: boolean;
}) => (
    <div className="flex flex-col items-center text-center gap-3">
        <span className={`w-fit px-4 py-1 rounded-full text-label-sm font-bold tracking-wide ${dark ? "bg-on-primary/15 text-primary-fixed" : "bg-primary/10 text-primary"}`}>
            {eyebrow}
        </span>
        <h2 className={`text-headline-lg font-black leading-tight max-w-[720px] ${dark ? "text-on-primary" : "text-on-surface"}`}>
            {title}
        </h2>
        {subtitle && (
            <p className={`text-body-lg font-normal leading-normal max-w-[720px] ${dark ? "text-primary-fixed" : "text-on-surface-variant"}`}>
                {subtitle}
            </p>
        )}
    </div>
);

export const Homepage = () => {
    // Each inline section gets its own observer so reveals trigger as you scroll.
    const statsObs = useInView<HTMLDivElement>(0.3);
    const stepsObs = useInView<HTMLDivElement>(0.3);
    const showcaseObs = useInView<HTMLDivElement>(0.25);
    const benefitsObs = useInView<HTMLDivElement>(0.3);
    const reviewsObs = useInView<HTMLDivElement>(0.3);
    const appObs = useInView<HTMLDivElement>(0.25);
    const faqObs = useInView<HTMLDivElement>(0.2);

    // Single-open FAQ accordion state (-1 = all collapsed; 0 = first open by default).
    const [openFaq, setOpenFaq] = useState<number>(0);

    return (
        <div className="@container flex flex-col gap-16">

            {/* ============================ 1. HERO ============================ */}
            <Hero/>

            {/* ===================== 2. STATS / CREDIBILITY BAR =====================
                Big numbers right after the hero — converts curiosity into trust
                before the user reads anything else. */}
            <div ref={statsObs.ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 -mt-8">
                {/* eslint-disable-next-line react-hooks/refs */}
                {STATS.map((stat, i) => (
                    <div
                        key={stat.label}
                        className={`flex flex-col items-center text-center gap-1 bg-surface rounded-2xl p-6 border border-outline-variant transition-all duration-700 ${statsObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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

            {/* ===================== 3. BRAND TRUST STRIP =====================
                "We service the brands you drive" — a quiet but powerful signal.
                Latin brand names read fine inside RTL flow. */}
            <div className="flex flex-col items-center gap-6 px-4">
                <span className="text-on-surface-variant text-label-lg font-medium">مورد اعتماد رانندگان برترین برندها</span>
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                    {BRANDS.map((brand) => (
                        <span key={brand} className="text-on-surface-variant/70 text-title-lg font-bold tracking-tight hover:text-on-surface transition-colors cursor-default" dir="ltr">
                            {brand}
                        </span>
                    ))}
                </div>
            </div>

            {/* ============================ 4. SERVICES ============================ */}
            <Services/>

            {/* ===================== 5. HOW IT WORKS =====================
                Explains the journey in 4 ordered steps. On desktop a dashed
                connector implies progression from one step to the next. */}
            {/* eslint-disable-next-line react-hooks/refs */}
            <div ref={stepsObs.ref} className="flex flex-col gap-12 px-4" id="how-it-works">
                <div className={`transition-all duration-700 ${stepsObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <SectionHeading eyebrow="ساده و سریع" title="چطور در اتو پلاس نوبت می‌گیریم؟" subtitle="فقط در چهار گام ساده، خدمت موردنظر خودروی خود را رزرو کنید."/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {/* Dashed connector line behind the cards (desktop only) */}
                    <div className="hidden lg:block absolute top-12 inset-x-12 border-t-2 border-dashed border-outline-variant"/>

                    {STEPS.map((step, i) => (
                        <div
                            key={step.title}
                            className={`relative flex flex-col gap-3 bg-surface rounded-2xl p-6 border border-outline-variant hover:border-primary/30 transition-all duration-500 ${stepsObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                            style={{ transitionDelay: `${i * 150}ms` }}
                        >
                            {/* Floating step number badge */}
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

            {/* ===================== 6. PLATFORM SHOWCASE =====================
                A dark, deep-blue band that breaks the page rhythm and shows the
                product in action via a CSS booking mockup. The contrast here is
                the visual "wow" moment of the page. */}
            <div ref={showcaseObs.ref} className="bg-primary rounded-[3rem] overflow-hidden px-6 md:px-12 py-16 relative">
                {/* Soft radial glow for depth (tonal, not a heavy shadow) */}
                <div className="absolute -top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-on-primary/5 blur-3xl"/>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    {/* Left: copy + feature list */}
                    <div className={`flex flex-col gap-6 transition-all duration-700 ${showcaseObs.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
                        <span className="w-fit flex items-center gap-2 px-4 py-1 rounded-full bg-on-primary/15 text-primary-fixed text-label-sm font-bold tracking-wide">
                            <Sparkles className="size-4"/> تجربه‌ای هوشمند
                        </span>
                        <h2 className="text-on-primary text-headline-lg font-black leading-tight">
                            تمام خودروی شما، در یک اپلیکیشن
                        </h2>
                        <p className="text-primary-fixed text-body-lg font-normal leading-relaxed">
                            جستجو، مقایسه و رزرو — همه با چند لمس. شفافیت کامل در قیمت و کیفیت، همراه با تاریخچه خدمات همیشه در دسترس.
                        </p>
                        <ul className="flex flex-col gap-4 mt-2">
                            {SHOWCASE_FEATURES.map((feat, i) => (
                                <li
                                    key={feat.title}
                                    className={`flex items-start gap-4 transition-all duration-500 ${showcaseObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                    style={{ transitionDelay: `${200 + i * 120}ms` }}
                                >
                                    <div className="w-11 h-11 shrink-0 rounded-full bg-on-primary/10 border border-on-primary/15 text-on-primary flex items-center justify-center">
                                        <feat.Icon className="size-5" strokeWidth={1.5}/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-on-primary text-title-lg font-bold">{feat.title}</span>
                                        <span className="text-primary-fixed text-body-md">{feat.desc}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: booking mockup (pure CSS) — demonstrates the product */}
                    <div className={`flex justify-center transition-all duration-700 ${showcaseObs.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
                        <div className="w-full max-w-sm bg-surface rounded-[2rem] p-5 border border-on-primary/15 flex flex-col gap-4">
                            {/* Mock search bar */}
                            <div className="flex items-center gap-2 bg-surface-container-high rounded-full px-4 h-11">
                                <Search className="size-4 text-on-surface-variant" strokeWidth={2}/>
                                <span className="text-on-surface-variant text-body-md">تعویض روغن، تهران...</span>
                            </div>
                            {/* Mock result rows */}
                            {[
                                { name: "تعمیرگاه آریا", area: "ولیعصر", rating: "۴.۹", price: "۲۵۰٬۰۰۰" },
                                { name: "مرکز خدمات پارس", area: "میرداماد", rating: "۴.۷", price: "۲۳۰٬۰۰۰" },
                                { name: "اتوسرویس شرق", area: "تهرانپارس", rating: "۴.۸", price: "۲۱۰٬۰۰۰" },
                            ].map((row, i) => (
                                <div key={row.name} className="flex items-center gap-3 bg-surface-container-low rounded-xl p-3" style={{ transitionDelay: `${i * 100}ms` }}>
                                    <div className="w-11 h-11 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
                                        <Car className="size-5 text-on-primary-container" strokeWidth={1.5}/>
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <span className="text-on-surface text-label-lg font-bold">{row.name}</span>
                                        <span className="text-on-surface-variant text-label-sm">{row.area}</span>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="flex items-center gap-1 text-tertiary-fixed-dim">
                                            <Star className="size-3 fill-current"/> <span className="text-on-surface text-label-sm font-bold">{row.rating}</span>
                                        </span>
                                        <span className="text-on-surface text-label-sm font-bold tabular-nums">{row.price} ت</span>
                                    </div>
                                </div>
                            ))}
                            {/* Red accent — the single critical "book" action */}
                            <button className="mt-1 h-11 rounded-full bg-secondary text-on-secondary font-bold text-label-lg cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                رزرو نوبت
                                <ChevronLeft className="size-4" strokeWidth={2}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===================== 7. WHY CHOOSE US ===================== */}
            <div ref={benefitsObs.ref} className="flex flex-col gap-12 px-4 py-8 bg-surface-container-low rounded-[3rem]" id="benefits">
                <div className={`transition-all duration-700 ${benefitsObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <SectionHeading eyebrow="مزایای ما" title="چرا اتو پلاس؟" subtitle="تمام آنچه برای یک تجربه بی‌دردسر خدمات خودرو لازم دارید، در یک‌جا."/>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                    {BENEFITS.map((benefit, i) => (
                        <div
                            key={benefit.title}
                            className={`group flex flex-col gap-3 bg-surface rounded-2xl p-6 border border-outline-variant hover:border-primary/30 transition-all duration-500 ${benefitsObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                                <benefit.Icon className="size-6" strokeWidth={1.5}/>
                            </div>
                            <h3 className="text-on-surface text-title-lg font-bold">{benefit.title}</h3>
                            <p className="text-on-surface-variant text-body-md">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===================== 8. PARTNERS / CENTERS ===================== */}
            <Partners/>

            {/* ===================== 9. TESTIMONIALS ===================== */}
            <div ref={reviewsObs.ref} className="flex flex-col gap-12 px-4" id="reviews">
                <div className={`transition-all duration-700 ${reviewsObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <SectionHeading eyebrow="نظرات مشتریان" title="تجربه‌ای که مشتریان ما روایت می‌کنند" subtitle="هزاران راننده به اتو پلاس اعتماد کرده‌اند. این بخشی از داستان آن‌هاست."/>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                    {TESTIMONIALS.map((t, i) => (
                        <div
                            key={t.name}
                            className={`relative flex flex-col gap-4 bg-surface rounded-2xl p-6 border border-outline-variant transition-all duration-500 ${reviewsObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                            style={{ transitionDelay: `${i * 150}ms` }}
                        >
                            <Quote className="size-8 text-primary/20 absolute top-6 left-6" strokeWidth={1.5}/>
                            {/* Star rating */}
                            <div className="flex gap-1 text-tertiary-fixed-dim">
                                {Array.from({ length: 5 }).map((_, s) => (
                                    <Star key={s} className={`size-4 ${s < t.rating ? "fill-current" : "opacity-30"}`} strokeWidth={1.5}/>
                                ))}
                            </div>
                            <p className="text-on-surface text-body-md leading-relaxed">«{t.quote}»</p>
                            {/* Reviewer identity */}
                            <div className="flex items-center gap-3 mt-2">
                                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-lg font-bold">
                                    {t.name.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-on-surface text-label-lg font-bold">{t.name}</span>
                                    <span className="text-on-surface-variant text-label-sm">{t.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===================== 10. APP DOWNLOAD =====================
                A conversion-oriented band pushing the mobile app. Phone mockup
                on one side, value prop + store buttons on the other. */}
            <div ref={appObs.ref} className="bg-surface-container-low rounded-[3rem] px-6 md:px-12 py-16 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Copy + store buttons */}
                    <div className={`flex flex-col gap-6 transition-all duration-700 ${appObs.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
                        <span className="w-fit flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-bold tracking-wide">
                            <Smartphone className="size-4"/> اپلیکیشن موبایل
                        </span>
                        <h2 className="text-on-surface text-headline-lg font-black leading-tight">
                            اتو پلاس همیشه همراه شماست
                        </h2>
                        <p className="text-on-surface-variant text-body-lg font-normal leading-relaxed">
                            اپلیکیشن ما را دانلود کنید و از تخفیف‌های ویژه، یادآوری سرویس‌های دوره‌ای و پشتیبانی آنی بهره‌مند شوید.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mt-2">
                            {/* Store buttons styled as dark "pill" badges */}
                            <button className="flex items-center gap-3 h-14 px-6 rounded-full bg-on-surface text-surface font-bold cursor-pointer hover:opacity-90 transition-opacity">
                                <Smartphone className="size-6" strokeWidth={1.5}/>
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-label-sm opacity-70">دانلود از</span>
                                    <span className="text-title-lg">App Store</span>
                                </div>
                            </button>
                            <button className="flex items-center gap-3 h-14 px-6 rounded-full bg-on-surface text-surface font-bold cursor-pointer hover:opacity-90 transition-opacity">
                                <Smartphone className="size-6" strokeWidth={1.5}/>
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-label-sm opacity-70">دریافت از</span>
                                    <span className="text-title-lg">Google Play</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Phone mockup (pure CSS) */}
                    <div className={`flex justify-center transition-all duration-700 ${appObs.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
                        <div className="relative w-64 h-[480px] rounded-[2.5rem] bg-on-surface p-3 border-4 border-inverse-surface shadow-2xl">
                            {/* Notch */}
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-2xl bg-inverse-surface z-10"/>
                            {/* Screen */}
                            <div className="w-full h-full rounded-[2rem] bg-surface overflow-hidden flex flex-col">
                                <div className="mesh-gradient-bg flex flex-col items-center justify-center gap-3 p-6 pt-10 text-center">
                                    <div className="w-12 h-12 rounded-full bg-on-primary/15 flex items-center justify-center">
                                        <Wrench className="size-6 text-on-primary" strokeWidth={1.5}/>
                                    </div>
                                    <span className="text-on-primary text-title-lg font-bold">اتو پلاس</span>
                                    <span className="text-primary-fixed text-label-sm">سرویس بعدی شما در ۱۴ روز آینده</span>
                                </div>
                                <div className="flex flex-col gap-3 p-4 flex-1">
                                    {["تعویض روغن", "بازدید دوره‌ای", "تنظیم باد تایر"].map((item) => (
                                        <div key={item} className="flex items-center gap-3 bg-surface-container-high rounded-xl p-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
                                                <BadgeCheck className="size-4 text-on-primary-container" strokeWidth={1.5}/>
                                            </div>
                                            <span className="text-on-surface text-label-lg font-medium flex-1">{item}</span>
                                            <ChevronLeft className="size-4 text-on-surface-variant" strokeWidth={2}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===================== 11. FAQ =====================
                Accordion — only one item open at a time (openFaq index). */}
            <div ref={faqObs.ref} className="flex flex-col gap-8 px-4 max-w-3xl w-full self-center" id="faq">
                <div className={`transition-all duration-700 ${faqObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
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
                                {/* Question row — toggles this item */}
                                <button
                                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                                    className="flex items-center justify-between w-full text-right gap-4 p-5 cursor-pointer"
                                >
                                    <span className="text-on-surface text-title-lg font-bold">{faq.q}</span>
                                    <Plus className={`size-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`} strokeWidth={2}/>
                                </button>
                                {/* Answer — animated via grid-rows trick (0fr → 1fr) */}
                                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                    <div className="overflow-hidden">
                                        <p className="text-on-surface-variant text-body-md px-5 pb-5 leading-relaxed">{faq.a}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* Inline "still have questions?" nudge */}
                <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                    <span className="text-body-md">سوال دیگری دارید؟</span>
                    <a href="#" className="flex items-center gap-1 text-primary font-bold text-body-md hover:gap-2 transition-all">
                        با پشتیبانی در ارتباط باشید <ArrowLeft className="size-4" strokeWidth={2}/>
                    </a>
                </div>
            </div>

            {/* ===================== 12. FINAL CTA ===================== */}
            <CtaSection/>

        </div>
    )
}
