import { Link } from "react-router";
import { ChevronLeft, Clock } from "lucide-react";
import type { RelatedPost } from "./types";

interface RelatedArticlesProps {
    related: RelatedPost[];
}

export const RelatedArticles = ({ related }: RelatedArticlesProps) => {
    if (related.length === 0) return null;

    return (
        <section className="max-w-5xl w-full mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-on-surface text-headline-md font-black">مقالات مرتبط</h2>
                <Link to="/blogs" className="flex items-center gap-1 text-primary font-bold text-body-md hover:gap-2 transition-all">
                    همه مقالات <ChevronLeft className="size-4" strokeWidth={2}/>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((r) => (
                    <Link
                        key={r.id}
                        to={`/blog/${r.slug}`}
                        className="group flex flex-col bg-surface rounded-2xl border border-outline-variant hover:border-primary/30 hover:shadow-lg transition-all duration-500 overflow-hidden p-6"
                    >
                        <span className="w-fit px-3 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-bold mb-3">{r.category}</span>
                        <h3 className="text-on-surface text-title-lg font-bold leading-snug group-hover:text-primary transition-colors mb-3">{r.title}</h3>
                        <p className="text-on-surface-variant text-body-md line-clamp-2 flex-1">{r.excerpt}</p>
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-outline-variant/60">
                            <span className="text-on-surface-variant text-label-sm">{r.author}</span>
                            <span className="flex items-center gap-1 text-on-surface-variant text-label-sm">
                                <Clock className="size-3.5" strokeWidth={1.5}/> {r.readTime}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
