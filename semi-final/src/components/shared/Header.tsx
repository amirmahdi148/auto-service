import {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router";
import { Menu, X } from "lucide-react";

const links = [
    { id: 1, title: "صفحه اصلی", to: "/" },
    { id: 2, title: "خدمات", to: "/services" },
    { id: 3, title: "درباره ما", to: "/aboutus" },
    { id: 4, title: "مقالات", to: "/blogs" },
];

export const Header = () => {
    const {pathname} = useLocation();
    const navRef = useRef<HTMLElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const [indicator, setIndicator] = useState({left: 0, width: 0});
    const [mobileOpen, setMobileOpen] = useState(false);

    const activeIdx = links.findIndex((l) =>
        l.to === "/" ? pathname === "/" : pathname.startsWith(l.to),
    );

    useEffect(() => {
        if (activeIdx < 0) return;
        const nav = navRef.current;
        if (!nav) return;
        const el = linkRefs.current[activeIdx];
        if (!el) return;

        const navRect = nav.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        setIndicator({
            left: elRect.left - navRect.left,
            width: elRect.width,
        });
    }, [activeIdx]);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-surface-variant px-4 sm:px-10 py-3 bg-surface/80 backdrop-blur-md sticky top-0 z-50 rounded-full mb-6">
            <div className="flex items-center gap-4 text-primary">
                <div className="size-8">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"/>
                    </svg>
                </div>
                <h2 className="text-primary text-title-lg font-bold leading-tight tracking-[-0.015em]">اتو پلاس</h2>
            </div>
            <div className="flex flex-1 justify-end gap-8">
                {/* Desktop nav */}
                <nav ref={navRef} className="hidden lg:flex items-center gap-9 relative">
                    <div
                        className="absolute bottom-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-in-out"
                        style={{left: indicator.left, width: indicator.width}}
                    />
                    {links.map((item, i) => (
                        <Link
                            key={item.id}
                            ref={(el) => { linkRefs.current[i] = el; }}
                            className={`transition-colors text-label-lg font-medium leading-normal ${
                                i === activeIdx
                                    ? "text-primary font-bold"
                                    : "text-on-surface-variant hover:text-primary"
                            }`}
                            to={item.to}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                {/* Desktop login */}
                <Link
                    to="/login"
                    className="hidden lg:flex min-w-21 max-w-120 cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-on-primary text-label-lg font-bold leading-normal tracking-[0.015em] hover:bg-primary-container hover:text-on-primary-container transition-all shadow-lg hover:shadow-xl"
                >
                    <span className="truncate">ورود / ثبت‌نام</span>
                </Link>

                {/* Mobile hamburger */}
                <button
                    aria-label="منو"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
                >
                    {mobileOpen ? <X className="size-5" strokeWidth={1.5}/> : <Menu className="size-5" strokeWidth={1.5}/>}
                </button>
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}
            <div className={`lg:hidden fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-surface border-r border-outline-variant z-50 transition-transform duration-300 ${
                mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
                <div className="flex flex-col h-full p-5 gap-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-primary">
                            <div className="size-7">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"/>
                                </svg>
                            </div>
                            <span className="text-title-md font-bold">اتو پلاس</span>
                        </div>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-center w-9 h-9 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
                        >
                            <X className="size-5" strokeWidth={1.5}/>
                        </button>
                    </div>
                    <nav className="flex flex-col gap-1 flex-1">
                        {links.map((item) => (
                            <Link
                                key={item.id}
                                to={item.to}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center h-11 px-4 rounded-xl text-label-lg font-bold transition-colors ${
                                    pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to))
                                        ? "bg-primary/10 text-primary"
                                        : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                                }`}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                    <Link
                        to="/login"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center h-11 rounded-xl bg-primary text-on-primary text-label-lg font-bold hover:bg-primary/90 transition-colors"
                    >
                        ورود / ثبت‌نام
                    </Link>
                </div>
            </div>
        </header>
    );
};