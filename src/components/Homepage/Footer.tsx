import {useState} from "react";
import {
    Image,
    UserCheck,
    MessageCircle,
    Send,
    MapPin,
    Phone,
    Mail,
    ShieldCheck,
} from "lucide-react";

/* ----------------------------------------------------------------------------
 * Footer — global layout component (rendered in App.tsx so it appears on
 * every page). Follows the DESIGN.md "Heritage Tech" system:
 *   - Deep Blue (#1A3B5C / primary) as the foundation
 *   - Red (#E63946 / secondary) reserved for the single critical action only
 *   - Tonal layers + 1px low-contrast outlines instead of heavy shadows
 *   - Vazirmatn, RTL flow, Lucide-react icons
 * -------------------------------------------------------------------------- */

// Navigation link groups. Each column renders a heading + list of anchors.
const NAV_COLUMNS = [
    {
        heading: "خدمات",
        links: ["مکانیک و تعمیرات", "مراکز دیتیلینگ", "تایر و جلوبندی", "برق و باتری", "خدمات امداد"],
    },
    {
        heading: "شرکت",
        links: ["درباره ما", "وبلاگ", "فرصت‌های شغلی", "تماس با ما", "اخبار"],
    },
    {
        heading: "پشتیبانی",
        links: ["مرکز راهنما", "سوالات متداول", "قوانین و مقررات", "حریم خصوصی", "گزارش مشکل"],
    },
];

// Social channels rendered as circular icon buttons.
const SOCIALS = [
    { Icon: Image, label: "اینستاگرام", href: "#" },
    { Icon: MessageCircle, label: "لینکدین", href: "#" },
    { Icon: UserCheck, label: "ایکس", href: "#" },
];

export const Footer = () => {
    // Newsletter form is intentionally simple — local state, no backend yet.
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSent(true);
        setEmail("");
        // Reset the success message after a few seconds so the user can re-use it.
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <footer className="mt-0 bg-primary text-on-primary rounded-t-[3rem] relative overflow-hidden w-full">
            {/* Faint top outline tint for tonal separation (DESIGN.md: low-contrast outlines) */}
            <div className="absolute inset-x-0 top-0 h-px bg-on-primary/10"/>

            {/* Full-width outer → constrained inner — mirrors how the main layout works */}
            <div className="mx-auto max-w-container-max-width px-4 md:px-10 lg:px-40 py-16 flex flex-col gap-12 z-10 relative">

                {/* ===================== TOP: BRAND + NEWSLETTER ===================== */}
                <div className="flex flex-col lg:flex-row gap-10 lg:items-center lg:justify-between">

                    {/* Brand identity block */}
                    <div className="flex flex-col gap-4 max-w-md">
                        <div className="flex items-center gap-3">
                            <div className="size-8 text-on-primary">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"/>
                                </svg>
                            </div>
                            <h2 className="text-on-primary text-title-lg font-bold leading-tight tracking-[-0.015em]">اتو پلاس</h2>
                        </div>
                        <p className="text-primary-fixed text-body-md font-normal leading-relaxed">
                            بازارگاه تخصصی خدمات خودرو؛ سریع‌ترین و مطمئن‌ترین راه برای پیدا کردن بهترین متخصصان خودرو در سراسر کشور.
                        </p>
                    </div>

                    {/* Newsletter signup — the single action using the Red accent */}
                    <div className="flex flex-col gap-3 lg:max-w-md w-full">
                        <span className="text-on-primary text-label-lg font-bold">عضویت در خبرنامه</span>
                        <p className="text-primary-fixed text-label-sm">جدیدترین خدمات و تخفیف‌های ویژه را اول از همه دریافت کنید.</p>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-1">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ایمیل شما"
                                className="flex-1 h-12 rounded-full px-5 bg-on-primary/10 border border-on-primary/20 text-on-primary placeholder:text-primary-fixed/70 focus:outline-none focus:border-on-primary/50 transition-colors text-body-md"
                            />
                            {/* Red accent button — reserved by DESIGN.md for the critical action */}
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-secondary text-on-secondary font-bold text-label-lg cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap"
                            >
                                <Send className="size-4" strokeWidth={2}/>
                                {sent ? "ثبت شد!" : "عضویت"}
                            </button>
                        </form>
                        {sent && (
                            <span className="text-primary-fixed-dim text-label-sm">از عضویت شما سپاسگزاریم!</span>
                        )}
                    </div>
                </div>

                {/* ===================== MIDDLE: NAV COLUMNS + CONTACT ===================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-on-primary/10 pt-12">

                    {/* Contact info column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-on-primary text-title-lg font-bold">ارتباط با ما</h3>
                        <ul className="flex flex-col gap-3 text-primary-fixed">
                            <li className="flex items-center gap-3 text-body-md">
                                <MapPin className="size-5 shrink-0" strokeWidth={1.5}/>
                                <span>تهران، خیابان ولیعصر</span>
                            </li>
                            <li className="flex items-center gap-3 text-body-md">
                                <Phone className="size-5 shrink-0" strokeWidth={1.5}/>
                                <span dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</span>
                            </li>
                            <li className="flex items-center gap-3 text-body-md">
                                <Mail className="size-5 shrink-0" strokeWidth={1.5}/>
                                <span dir="ltr">info@autoplus.ir</span>
                            </li>
                        </ul>
                    </div>

                    {/* Navigation link columns — mapped from NAV_COLUMNS */}
                    {NAV_COLUMNS.map((col) => (
                        <div key={col.heading} className="flex flex-col gap-4">
                            <h3 className="text-on-primary text-title-lg font-bold">{col.heading}</h3>
                            <ul className="flex flex-col gap-3">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-primary-fixed hover:text-on-primary text-body-md transition-colors"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ===================== BOTTOM: SOCIAL + TRUST + COPYRIGHT ===================== */}
                <div className="flex flex-col-reverse lg:flex-row gap-6 lg:items-center lg:justify-between border-t border-on-primary/10 pt-8">

                    {/* Copyright */}
                    <p className="text-primary-fixed text-label-sm text-center lg:text-right">
                        © {new Date().getFullYear()} اتو پلاس — تمامی حقوق محفوظ است.
                    </p>

                    {/* Trust badge — reinforces credibility (DESIGN.md tone) */}
                    <div className="flex items-center gap-2 text-primary-fixed justify-center">
                        <ShieldCheck className="size-5 text-on-primary/80" strokeWidth={1.5}/>
                        <span className="text-label-sm font-medium">نماد اعتماد الکترونیکی</span>
                    </div>

                    {/* Social icons */}
                    <div className="flex items-center gap-3 justify-center">
                        {SOCIALS.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                aria-label={social.label}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-on-primary/10 border border-on-primary/10 hover:bg-on-primary/20 hover:border-on-primary/30 transition-colors"
                            >
                                <social.Icon className="size-5 text-on-primary" strokeWidth={1.5}/>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
