import { Sparkles, Clock } from "lucide-react";
import type { ApiPostDetail } from "./types";

interface ArticleHeaderProps {
    post: ApiPostDetail;
}

export const ArticleHeader = ({ post }: ArticleHeaderProps) => (
    <header className="flex flex-col gap-5 max-w-3xl w-full mx-auto">
        <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-bold">{post.category}</span>
            {post.featured && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-on-secondary text-label-sm font-bold">
                    <Sparkles className="size-3.5"/> ویژه
                </span>
            )}
        </div>
        <h1 className="text-on-surface text-display-lg-mobile @[768px]:text-display-lg font-black leading-[1.2]">
            {post.title}
        </h1>
        <p className="text-on-surface-variant text-body-lg leading-relaxed">{post.excerpt}</p>
        <div className="flex items-center gap-4 flex-wrap pt-2">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-title-lg font-black ring-2 ring-surface">
                    {post.author.charAt(0)}
                </div>
                <div className="flex flex-col">
                    <span className="text-on-surface text-label-lg font-bold">{post.author}</span>
                    <span className="text-on-surface-variant text-label-sm">{post.date}</span>
                </div>
            </div>
            <span className="hidden sm:block w-px h-8 bg-outline-variant"/>
            <span className="flex items-center gap-1.5 text-on-surface-variant text-label-lg">
                <Clock className="size-4" strokeWidth={1.5}/> {post.readTime} مطالعه
            </span>
        </div>
    </header>
);
