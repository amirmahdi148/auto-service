import {Link} from "react-router";
import {useInView} from "../../utils/useInView";
import {Search, Clock, ChevronRight, ChevronLeft, Loader2, BookOpen} from "lucide-react";
import type {Post, Category} from "../../api/data/blogs.ts";

interface BlogGridProps {
    categories: Category[];
    posts: Post[];
    activeCategory: string;
    onCategoryChange: (label: string) => void;
    page: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    isFetching: boolean;
}

/* A single skeleton card — shown during the initial load before any data is
   available. Modern shimmer-free placeholder that matches the real card grid. */
const SkeletonCard = () => (
    <div className="flex flex-col bg-surface rounded-2xl border border-outline-variant overflow-hidden">
        <div className="min-h-[180px] bg-surface-container-high animate-pulse"/>
        <div className="flex flex-col gap-3 p-6">
            <div className="h-5 w-24 rounded-full bg-surface-container-high animate-pulse"/>
            <div className="h-6 w-full rounded-full bg-surface-container-high animate-pulse"/>
            <div className="h-4 w-5/6 rounded-full bg-surface-container-high animate-pulse"/>
            <div className="h-4 w-2/3 rounded-full bg-surface-container-high animate-pulse"/>
            <div className="flex items-center justify-between pt-3 mt-1 border-t border-outline-variant/60">
                <div className="h-7 w-24 rounded-full bg-surface-container-high animate-pulse"/>
                <div className="h-5 w-12 rounded-full bg-surface-container-high animate-pulse"/>
            </div>
        </div>
    </div>
);

export const BlogGrid = ({ categories, posts, activeCategory, onCategoryChange, page, totalPages, totalItems, onPageChange, isFetching }: BlogGridProps) => {
    const { ref, inView } = useInView<HTMLDivElement>(0.1);

    // Initial load = no posts yet but fetching in progress → skeleton grid.
    const isLoading = isFetching && posts.length === 0;

    const renderPagination = () => {
        const pages: (number | "...")[] = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (page > 3) pages.push("...");
            for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
                pages.push(i);
            }
            if (page < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }

        return (
            <div className={`flex items-center justify-center gap-1.5 mt-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                    aria-label="صفحه قبلی"
                    className="flex items-center gap-1 h-11 px-4 rounded-full bg-surface text-on-surface-variant border border-outline-variant hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer text-label-sm font-bold"
                >
                    <ChevronRight className="size-4" strokeWidth={2}/>
                    <span className="hidden sm:inline">قبلی</span>
                </button>
                {pages.map((p, i) =>
                    p === "..." ? (
                        <span key={`ellipsis-${i}`} className="w-9 text-center text-on-surface-variant text-label-lg">…</span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            className={`w-11 h-11 rounded-full text-label-lg font-bold transition-all cursor-pointer ${
                                p === page
                                    ? "bg-primary text-on-primary shadow-md"
                                    : "bg-surface text-on-surface-variant border border-outline-variant hover:border-primary/40 hover:text-primary"
                            }`}
                        >
                            {toPersianDigits(p)}
                        </button>
                    )
                )}
                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                    aria-label="صفحه بعدی"
                    className="flex items-center gap-1 h-11 px-4 rounded-full bg-surface text-on-surface-variant border border-outline-variant hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer text-label-sm font-bold"
                >
                    <span className="hidden sm:inline">بعدی</span>
                    <ChevronLeft className="size-4" strokeWidth={2}/>
                </button>
            </div>
        );
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

            {/* Result count + fetching indicator */}
            <div className={`mb-8 flex items-center justify-center gap-2 transition-opacity duration-500 ${inView ? "opacity-100" : "opacity-0"}`}>
                {totalItems > 0 && (
                    <p className="text-on-surface-variant text-body-md text-center">
                        {isLoading ? "در حال بارگذاری..." : `${posts.length} مقاله از ${totalItems} مقاله`}
                    </p>
                )}
                {isFetching && !isLoading && <Loader2 className="size-4 text-primary animate-spin" strokeWidth={1.5}/>}
            </div>

            {/* Body: skeleton (initial load) / grid (data) / empty state */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i}/>)}
                </div>
            ) : posts.length > 0 ? (
                <>
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${isFetching ? "opacity-50" : "opacity-100"}`}>
                        {posts.map((post, i) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.slug}`}
                                className={`group flex flex-col bg-surface rounded-2xl border border-outline-variant hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                                style={{ transitionDelay: `${i * 90}ms` }}
                            >
                                {/* Thumbnail — gradient + icon medallion + overlaid category badge */}
                                <div className="relative min-h-[170px] mesh-gradient-bg flex items-center justify-center p-8 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                                    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-on-primary/10 group-hover:scale-125 transition-transform duration-700"/>
                                    <div className="relative w-16 h-16 rounded-full bg-on-primary/15 border border-on-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <post.catIcon className="size-8 text-on-primary" strokeWidth={1.5}/>
                                    </div>
                                    {/* Category ribbon on the thumbnail */}
                                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-on-primary/25 backdrop-blur-sm text-on-primary text-label-sm font-bold">
                                        {post.category}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="flex flex-col gap-3 p-6 flex-1">
                                    <h3 className="text-on-surface text-title-lg font-bold leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
                                    <p className="text-on-surface-variant text-body-md leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>

                                    {/* Meta footer */}
                                    <div className="flex items-center justify-between pt-4 mt-1 border-t border-outline-variant/60">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-8 h-8 shrink-0 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-sm font-bold">
                                                {post.author.charAt(0)}
                                            </div>
                                            <span className="text-on-surface-variant text-label-sm truncate">{post.author}</span>
                                        </div>
                                        <span className="flex items-center gap-1 text-on-surface-variant text-label-sm shrink-0">
                                            <Clock className="size-3.5" strokeWidth={1.5}/> {post.readTime}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {totalPages > 1 && renderPagination()}
                </>
            ) : (
                /* Empty state — no posts match the active filter/search */
                <div className="flex flex-col items-center gap-4 py-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center">
                        <Search className="size-9 text-on-surface-variant" strokeWidth={1.5}/>
                    </div>
                    <h3 className="text-on-surface text-title-lg font-bold">مقاله‌ای یافت نشد</h3>
                    <p className="text-on-surface-variant text-body-md max-w-sm">هیچ مقاله‌ای با این فیلتر یا عبارت جستجو وجود ندارد. فیلتر را تغییر دهید یا همه مقالات را ببینید.</p>
                    <button
                        onClick={() => onCategoryChange("همه")}
                        className="flex items-center gap-2 mt-2 px-6 h-11 rounded-full bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary-container hover:text-on-primary-container transition-colors"
                    >
                        <BookOpen className="size-4" strokeWidth={1.5}/>
                        مشاهده همه مقالات
                    </button>
                </div>
            )}
        </section>
    );
};

/* Persian-aware digit formatting for pagination numbers. */
function toPersianDigits(n: number): string {
    return n.toLocaleString("fa-IR");
}
