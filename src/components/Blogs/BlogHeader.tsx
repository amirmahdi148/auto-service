import {useInView} from "../../utils/useInView";
import {Search, BookOpen, X, Sparkles} from "lucide-react";

interface BlogHeaderProps {
    search: string;
    onSearchChange: (value: string) => void;
}

/* Top hero of the blogs page. Only interaction is the search input, which is
   debounced in the parent (Blogs.tsx) — this component stays purely presentational. */
export const BlogHeader = ({ search, onSearchChange }: BlogHeaderProps) => {
    const { ref, inView } = useInView<HTMLDivElement>(0.15);

    return (
        <section ref={ref} className="px-4">
            <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-primary text-on-primary">
                {/* Layered decorative glows for depth (tonal, no heavy shadows) */}
                <div className="absolute -top-1/3 -left-1/4 w-2/3 h-2/3 rounded-full bg-on-primary/5 blur-3xl"/>
                <div className="absolute -bottom-1/3 -right-1/4 w-2/3 h-2/3 rounded-full bg-secondary/10 blur-3xl"/>
                {/* Subtle dotted grid texture */}
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "22px 22px" }}
                />

                <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-14 sm:py-16 md:py-20 text-center">
                    {/* Eyebrow chip */}
                    <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full bg-on-primary/15 text-primary-fixed text-label-sm font-bold tracking-wide backdrop-blur-sm transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
                        <Sparkles className="size-4"/> مجله اتو پلاس
                    </span>

                    {/* Headline — fluid type scaling for small screens */}
                    <h1 className={`text-on-primary text-[2rem] leading-tight sm:text-headline-lg md:text-display-lg font-black leading-[1.15] max-w-3xl transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        دانشی که خودروی شما را بهتر می‌فهمد
                    </h1>

                    <p className={`text-primary-fixed text-base sm:text-body-lg font-normal leading-relaxed max-w-2xl transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        جدیدترین مقالات، راهنماها و اخبار دنیای خودرو؛ نوشته‌شده توسط متخصصان ما برای شما.
                    </p>

                    {/* Search field — prominent, touch-friendly, with clear button */}
                    <div className={`flex items-center gap-3 w-full max-w-lg bg-on-primary/10 backdrop-blur-md rounded-2xl px-5 h-14 border border-on-primary/15 focus-within:border-on-primary/40 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        <Search className="size-5 text-primary-fixed shrink-0" strokeWidth={1.5}/>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="جستجو در مقالات..."
                            className="flex-1 bg-transparent outline-none text-on-primary placeholder:text-primary-fixed/60 text-body-md"
                        />
                        {search && (
                            <button
                                onClick={() => onSearchChange("")}
                                aria-label="پاک کردن جستجو"
                                className="flex items-center justify-center w-7 h-7 rounded-full text-primary-fixed hover:bg-on-primary/15 hover:text-on-primary cursor-pointer transition-colors shrink-0"
                            >
                                <X className="size-4" strokeWidth={2}/>
                            </button>
                        )}
                    </div>

                    {/* Quick hint */}
                    <span className={`flex items-center gap-1.5 text-primary-fixed/70 text-label-sm transition-opacity duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
                        <BookOpen className="size-3.5" strokeWidth={1.5}/>
                        مقالات را بر اساس دسته‌بندی فیلتر کنید
                    </span>
                </div>
            </div>
        </section>
    );
};
