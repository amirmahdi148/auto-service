import {useState} from "react";
import {useInView} from "../../utils/useInView";
import {useNavigate} from "react-router";
import {HttpService} from "../../utils/HttpService.ts";
import {
    Star,
    Clock,
    ChevronLeft,
    ArrowLeft,
    Search,
    Wrench,
    Droplets,
    RotateCw,
    Battery,
    Snowflake,
    Gauge,
    ShieldCheck,
} from "lucide-react";
import type {ServiceCategory, ServiceItem} from "../../api/data/services";
import {toPersianDigits, formatToman} from "../../api/data/services";
import {ServiceBookingModal} from "./ServiceBookingModal.tsx";

const SERVICE_ICONS: Record<string, typeof Wrench> = {
    "مکانیک و تعمیرات": Wrench,
    "دیتیلینگ": Droplets,
    "تایر و جلوبندی": RotateCw,
    "برق و باتری": Battery,
    "کولر و تهویه": Snowflake,
    "عیب‌یابی": Gauge,
    "سرویس دوره‌ای": ShieldCheck,
};

interface ServicesGridProps {
    categories: ServiceCategory[];
    services: ServiceItem[];
    activeCategory: string;
    onCategoryChange: (label: string) => void;
    search: string;
    onReset: () => void;
    isFetching?: boolean;
}

/* A single skeleton card — shown during the initial mount before any state is
   settled. Matches the real service card layout. */
const SkeletonCard = () => (
    <div className="flex flex-col bg-surface rounded-2xl border border-outline-variant overflow-hidden">
        <div className="min-h-[140px] mesh-gradient-bg animate-pulse"/>
        <div className="flex flex-col gap-3 p-6">
            <div className="h-5 w-24 rounded-full bg-surface-container-high animate-pulse"/>
            <div className="h-6 w-full rounded-full bg-surface-container-high animate-pulse"/>
            <div className="h-4 w-5/6 rounded-full bg-surface-container-high animate-pulse"/>
            <div className="flex items-center justify-between pt-3 mt-1 border-t border-outline-variant/60">
                <div className="h-7 w-24 rounded-full bg-surface-container-high animate-pulse"/>
                <div className="h-5 w-12 rounded-full bg-surface-container-high animate-pulse"/>
            </div>
        </div>
    </div>
);

export const ServicesGrid = ({
    categories,
    services,
    activeCategory,
    onCategoryChange,
    search,
    onReset,
    isFetching,
}: ServicesGridProps) => {
    const { ref, inView } = useInView<HTMLDivElement>(0.1);
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(6);
    const [bookingService, setBookingService] = useState<ServiceItem | null>(null);

    const isLoading = isFetching && services.length === 0;
    const visible = services.slice(0, visibleCount);
    const hasMore = services.length > visibleCount;

    const handleBook = async (service: ServiceItem) => {
        try {
            const res = await HttpService.get<{ authenticated: boolean }>("/api/auth/check");
            if (res.authenticated) {
                setBookingService(service);
            }
        } catch {
            navigate("/login");
        }
    };

    return (
        <section ref={ref} className="px-4 max-w-container-max-width mx-auto w-full">

            {/* Category filter chips — single-select, horizontally scrollable on mobile */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                {categories.map((cat) => {
                    const isActive = activeCategory === cat.label;
                    return (
                        <button
                            key={cat.label}
                            onClick={() => onCategoryChange(cat.label)}
                            className={`flex items-center gap-2 h-11 px-5 rounded-full text-label-lg font-bold cursor-pointer transition-all duration-300 ${
                                isActive
                                    ? "bg-primary text-on-primary border border-primary shadow-md"
                                    : "bg-surface text-on-surface-variant border border-outline-variant hover:border-primary/40 hover:text-primary"
                            }`}
                        >
                            <cat.Icon className="size-4" strokeWidth={1.5}/>
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            {/* Result count */}
            <div className={`mb-8 flex items-center justify-center gap-2 transition-opacity duration-500 ${inView ? "opacity-100" : "opacity-0"}`}>
                {services.length > 0 && (
                    <p className="text-on-surface-variant text-body-md text-center">
                        {toPersianDigits(services.length)} خدمت یافت شد
                        {search && <> برای «{search}»</>}
                    </p>
                )}
            </div>

            {/* Body: skeleton (initial load) / grid (data) / empty state */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i}/>)}
                </div>
            ) : services.length > 0 ? (
                <>
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300`}>
                        {visible.map((service, i) => (
                            <ServiceCard key={service.id} service={service} inView={inView} index={i} onBook={handleBook}/>
                        ))}
                    </div>

                    {hasMore && (
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={() => setVisibleCount((c) => c + 6)}
                                className="flex items-center gap-2 h-12 px-8 rounded-full bg-surface text-on-surface-variant border border-outline-variant hover:border-primary/40 hover:text-primary transition-all cursor-pointer text-label-lg font-bold"
                            >
                                مشاهده خدمات بیشتر
                                <ChevronLeft className="size-4" strokeWidth={2}/>
                            </button>
                        </div>
                    )}
                </>
            ) : (
                /* Empty state — no services match the active filter/search */
                <div className="flex flex-col items-center gap-4 py-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center">
                        <Search className="size-9 text-on-surface-variant" strokeWidth={1.5}/>
                    </div>
                    <h3 className="text-on-surface text-title-lg font-bold">خدمتی یافت نشد</h3>
                    <p className="text-on-surface-variant text-body-md max-w-sm">
                        هیچ خدمتی با این فیلتر یا عبارت جستجو وجود ندارد. فیلتر را تغییر دهید یا همه خدمات را ببینید.
                    </p>
                    <button
                        onClick={onReset}
                        className="flex items-center gap-2 mt-2 px-6 h-11 rounded-full bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary-container hover:text-on-primary-container transition-colors"
                    >
                        <Search className="size-4" strokeWidth={1.5}/>
                        مشاهده همه خدمات
                    </button>
                </div>
            )}
            <ServiceBookingModal
                key={bookingService?.id ?? "closed"}
                isOpen={bookingService !== null}
                onClose={() => setBookingService(null)}
                service={bookingService}
            />
        </section>
    );
};

interface ServiceCardProps {
    service: ServiceItem;
    inView: boolean;
    index: number;
    onBook: (service: ServiceItem) => void;
}

const ServiceCard = ({ service, inView, index, onBook }: ServiceCardProps) => {
    const Icon = service.Icon ?? SERVICE_ICONS[service.category];
    return (
    <div
        className={`group flex flex-col bg-surface rounded-2xl border border-outline-variant hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        style={{ transitionDelay: `${index * 90}ms` }}
    >
        {/* Header banner — mesh gradient + icon medallion + category badge */}
        <div className="relative min-h-[140px] mesh-gradient-bg flex items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-on-primary/10 group-hover:scale-125 transition-transform duration-700"/>
            <div className="relative w-16 h-16 rounded-full bg-on-primary/15 border border-on-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {Icon && <Icon className="size-8 text-on-primary" strokeWidth={1.5}/>}
            </div>
            {/* Category ribbon */}
            <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-on-primary/25 backdrop-blur-sm text-on-primary text-label-sm font-bold">
                {service.category}
            </span>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 p-6 flex-1">
            <h3 className="text-on-surface text-title-lg font-bold leading-snug group-hover:text-primary transition-colors">
                {service.title}
            </h3>
            <p className="text-on-surface-variant text-body-md leading-relaxed line-clamp-2 flex-1">
                {service.desc}
            </p>

            {/* Meta row: rating + duration */}
            <div className="flex items-center gap-4 text-on-surface-variant text-label-sm">
                <span className="flex items-center gap-1">
                    <Star className="size-4 text-tertiary-fixed-dim fill-tertiary-fixed-dim" strokeWidth={1.5}/>
                    <span className="font-bold text-on-surface">{toPersianDigits(service.rating)}</span>
                    <span className="text-on-surface-variant">({toPersianDigits(service.reviewCount)})</span>
                </span>
                <span className="flex items-center gap-1">
                    <Clock className="size-4" strokeWidth={1.5}/>
                    {service.duration}
                </span>
            </div>

            {/* Price + CTA footer */}
            <div className="flex items-center justify-between pt-4 mt-1 border-t border-outline-variant/60">
                <div className="flex flex-col">
                    <span className="text-label-sm text-on-surface-variant">شروع از</span>
                    <span className="text-on-surface text-title-lg font-black">{formatToman(service.fromPrice)}</span>
                </div>
                <button
                    onClick={() => onBook(service)}
                    className="flex items-center gap-1 h-11 px-5 rounded-full bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary-container hover:text-on-primary-container transition-colors group-hover:gap-2"
                >
                    رزرو نوبت
                    <ArrowLeft className="size-4" strokeWidth={2}/>
                </button>
            </div>
        </div>
    </div>
);
};
