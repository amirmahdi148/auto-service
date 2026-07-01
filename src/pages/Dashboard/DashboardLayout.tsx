import {useState, useEffect} from "react";
import {NavLink, Outlet} from "react-router";
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    Settings,
    Wrench,
    Star,
    FileText,
    LogOut,
    Menu,
    X,
    Bell,
    Search,

} from "lucide-react";

/* ============================================================================
 * DASHBOARD LAYOUT — shell with redesigned sidebar + topbar
 *
 * Sidebar features:
 *   - Brand header with اتو پلاس logo mark
 *   - Sectioned navigation (main / management / account)
 *   - Active state: right-aligned accent bar + tint (DESIGN.md "Lists & Nav")
 *   - User profile card + logout at the bottom
 *   - Mobile: slide-in drawer from the right with backdrop (DESIGN.md RTL)
 *   - Desktop: persistent rail, always expanded
 *
 * Follows Heritage Tech: Deep Blue brand, Red reserved for the logout
 * (destructive) action, tonal layers + 1px outlines, Vazirmatn RTL.
 * ========================================================================== */

interface NavItem {
    to: string;
    label: string;
    icon: typeof LayoutDashboard;
    end?: boolean;
    badge?: string;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
    {
        title: "اصلی",
        items: [
            { to: "/dashboard/overview", label: "داشبورد", icon: LayoutDashboard, end: true },
            { to: "/dashboard/bookings", label: "رزروها", icon: CalendarDays, badge: "۳" },
        ],
    },
    {
        title: "مدیریت",
        items: [
            { to: "/dashboard/customers", label: "مشتریان", icon: Users },
            { to: "/dashboard/services", label: "خدمات", icon: Wrench },
            { to: "/dashboard/reviews", label: "نظرات", icon: Star },
            { to: "/dashboard/reports", label: "گزارش‌ها", icon: FileText },
        ],
    },
    {
        title: "حساب کاربری",
        items: [
            { to: "/dashboard/settings", label: "تنظیمات", icon: Settings },
        ],
    },
];

/* The sidebar body — shared between the desktop rail and the mobile drawer.
   `onNavigate` lets the mobile drawer close itself after a link is tapped. */
const SidebarBody = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex flex-col h-full">

        {/* ===== Brand header ===== */}
        <div className="flex items-center gap-3 px-5 h-16 shrink-0 border-b border-outline-variant">
            <div className="size-8 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"/>
                </svg>
            </div>
            <div className="flex flex-col leading-tight">
                <span className="text-on-surface text-title-lg font-black tracking-[-0.015em]">اتو پلاس</span>
                <span className="text-on-surface-variant text-label-sm">پنل مدیریت</span>
            </div>
        </div>

        {/* ===== Sectioned navigation (scrollable) ===== */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-6">
            {NAV_SECTIONS.map((section) => (
                <div key={section.title} className="flex flex-col gap-1">
                    <span className="px-4 mb-1 text-on-surface-variant text-label-sm font-bold">{section.title}</span>
                    {section.items.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={onNavigate}
                            className={({ isActive }) =>
                                /* Active = right-aligned accent bar + tint (DESIGN.md).
                                   The bar is absolute on the inline-start (right in RTL). */
                                `group relative flex items-center gap-3 pr-4 pl-3 h-11 rounded-xl text-label-lg font-bold transition-colors ${
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {/* Active accent bar */}
                                    {isActive && (
                                        <span className="absolute inset-y-2.5 right-0 w-1 rounded-full bg-primary"/>
                                    )}
                                    <item.icon className="size-5 shrink-0" strokeWidth={isActive ? 2 : 1.5}/>
                                    <span className="flex-1">{item.label}</span>
                                    {/* Badge — Red for urgent (pending items), else neutral */}
                                    {item.badge && (
                                        <span className={`flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-label-xs font-bold ${
                                            item.badge === "۳" ? "bg-secondary text-on-secondary" : "bg-primary/10 text-primary"
                                        }`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            ))}
        </nav>

        {/* ===== User profile card + logout ===== */}
        <div className="shrink-0 border-t border-outline-variant p-3">
            <div className="flex items-center gap-3 p-2 rounded-xl">
                <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-lg font-bold">
                        آ
                    </div>
                    {/* Online indicator dot */}
                    <span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full bg-primary ring-2 ring-surface"/>
                </div>
                <div className="flex-1 min-w-0 flex flex-col leading-tight">
                    <span className="text-on-surface text-label-lg font-bold truncate">آرش رضایی</span>
                    <span className="text-on-surface-variant text-label-sm truncate">مدیر سیستم</span>
                </div>
                {/* Logout — destructive action uses the Red accent (DESIGN.md) */}
                <button
                    aria-label="خروج"
                    className="flex items-center justify-center w-9 h-9 rounded-full text-on-surface-variant hover:bg-secondary/10 hover:text-secondary transition-colors cursor-pointer"
                >
                    <LogOut className="size-4" strokeWidth={1.5}/>
                </button>
            </div>
        </div>
    </div>
);

export const DashboardLayout = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Lock body scroll while the mobile drawer is open.
    useEffect(() => {
        if (drawerOpen) {
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = ""; };
        }
    }, [drawerOpen]);

    return (
        <div className="flex h-screen w-full bg-surface-container-low overflow-hidden">

            {/* ===================== DESKTOP SIDEBAR (persistent) ===================== */}
            <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-surface border-l border-outline-variant h-full">
                <SidebarBody/>
            </aside>

            {/* ===================== MOBILE DRAWER (slide-in from right) ===================== */}
            {/* Backdrop */}
            {drawerOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-40"
                    onClick={() => setDrawerOpen(false)}
                />
            )}
            {/* Drawer panel — slides in from the inline-start edge (right in RTL) */}
            <aside
                className={`lg:hidden fixed inset-y-0 right-0 w-72 max-w-[85vw] bg-surface border-l border-outline-variant z-50 transition-transform duration-300 ${
                    drawerOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Close button inside the drawer */}
                <button
                    aria-label="بستن منو"
                    onClick={() => setDrawerOpen(false)}
                    className="absolute top-4 left-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                    <X className="size-5" strokeWidth={1.5}/>
                </button>
                <SidebarBody onNavigate={() => setDrawerOpen(false)}/>
            </aside>

            {/* ===================== MAIN COLUMN ===================== */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">

                {/* Mobile topbar — provides the drawer toggle + quick actions.
                    Only shown below the lg breakpoint where the rail is hidden. */}
                <header className="lg:hidden flex items-center justify-between gap-3 h-16 px-4 bg-surface border-b border-outline-variant shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            aria-label="باز کردن منو"
                            onClick={() => setDrawerOpen(true)}
                            className="flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface cursor-pointer"
                        >
                            <Menu className="size-5" strokeWidth={1.5}/>
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="size-6 text-primary">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"/>
                                </svg>
                            </div>
                            <span className="text-on-surface text-title-lg font-black">اتو پلاس</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button aria-label="جستجو" className="flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface cursor-pointer">
                            <Search className="size-5" strokeWidth={1.5}/>
                        </button>
                        <button aria-label="اعلان‌ها" className="relative flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface cursor-pointer">
                            <Bell className="size-5" strokeWidth={1.5}/>
                            <span className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-secondary"/>
                        </button>
                    </div>
                </header>

                {/* Routed page content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};
