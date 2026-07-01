import {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router";

const links = [
    { id: 1, title: "صفحه اصلی", to: "/" },
    { id: 2, title: "درباره ما", to: "/aboutus" },
    { id: 3, title: "مقالات", to: "/blogs" },
];

export const Header = () => {
    const {pathname} = useLocation();
    const navRef = useRef<HTMLElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const [indicator, setIndicator] = useState({left: 0, width: 0});

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

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-surface-variant px-10 py-3 bg-surface/80 backdrop-blur-md sticky top-0 z-50 rounded-full mb-6">
            <div className="flex items-center gap-4 text-primary">
                <div className="size-8">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"/>
                    </svg>
                </div>
                <h2 className="text-primary text-title-lg font-bold leading-tight tracking-[-0.015em]">اتو پلاس</h2>
            </div>
            <div className="flex flex-1 justify-end gap-8">
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
                <Link 
                    to="/login" 
                    className="flex min-w-21 max-w-120 cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-on-primary text-label-lg font-bold leading-normal tracking-[0.015em] hover:bg-primary-container hover:text-on-primary-container transition-all shadow-lg hover:shadow-xl"
                >
                    <span className="truncate">ورود / ثبت‌نام</span>
                </Link>
            </div>
        </header>
    );
};