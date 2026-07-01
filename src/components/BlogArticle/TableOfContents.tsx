import { BookOpen, Sparkles } from "lucide-react";

interface TableOfContentsProps {
    headings: { type: "heading"; text: string }[];
}

export const TableOfContents = ({ headings }: TableOfContentsProps) => (
    <aside className="hidden lg:block sticky top-28 self-start">
        <nav className="flex flex-col gap-3 p-5 rounded-2xl bg-surface-container-low border border-outline-variant">
            {headings.length > 0 ? (
                <>
                    <span className="flex items-center gap-2 text-on-surface text-label-lg font-bold">
                        <BookOpen className="size-4 text-primary" strokeWidth={1.5}/> فهرست مطالب
                    </span>
                    <ul className="flex flex-col gap-2 border-r-2 border-outline-variant pr-4">
                        {headings.map((h, i) => (
                            <li key={i} className="text-on-surface-variant text-label-lg leading-snug hover:text-primary transition-colors cursor-default">
                                {h.text}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <span className="text-on-surface-variant text-label-sm">—</span>
            )}
        </nav>
        <div className="mt-4 p-5 rounded-2xl bg-primary text-on-primary">
            <span className="flex items-center gap-2 text-on-primary text-label-lg font-bold">
                <Sparkles className="size-4"/> نیاز به سرویس دارید؟
            </span>
            <p className="text-primary-fixed text-label-sm mt-2 leading-relaxed">همین حالا نزدیک‌ترین مرکز معتبر را پیدا و نوبت بگیرید.</p>
            <button className="mt-4 w-full h-10 rounded-full bg-secondary text-on-secondary font-bold text-label-lg cursor-pointer hover:opacity-90 transition-opacity">
                رزرو نوبت
            </button>
        </div>
    </aside>
);
