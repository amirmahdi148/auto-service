import { Quote, Info, CheckCircle2 } from "lucide-react";
import type { ContentBlock } from "./types";

interface ContentRendererProps {
    content: ContentBlock[];
    author: string;
    category: string;
}

const renderBlock = (block: ContentBlock, i: number) => {
    switch (block.type) {
        case "heading":
            return (
                <h2 key={i} className="text-on-surface text-headline-md @[768px]:text-headline-lg font-black leading-tight mt-10 mb-4 scroll-mt-28">
                    {block.text}
                </h2>
            );
        case "paragraph":
            return (
                <p key={i} className="text-on-surface text-body-lg leading-[2.1] mb-6">
                    {block.text}
                </p>
            );
        case "quote":
            return (
                <blockquote key={i} className="relative my-10 bg-surface-container-low border-r-4 border-secondary rounded-l-2xl rounded-r-md p-7">
                    <Quote className="absolute top-5 left-5 size-8 text-secondary/20" strokeWidth={1.5}/>
                    <p className="text-on-surface text-headline-md font-bold leading-relaxed mb-3 pr-10">
                        {block.text}
                    </p>
                    {block.cite && <cite className="text-on-surface-variant text-label-lg not-italic">— {block.cite}</cite>}
                </blockquote>
            );
        case "list":
            return block.ordered ? (
                <ol key={i} className="flex flex-col gap-3 mb-8 pr-5 list-decimal marker:text-primary marker:font-bold">
                    {block.items.map((item, j) => (
                        <li key={j} className="text-on-surface text-body-lg leading-[1.9] pr-2 marker:font-black">
                            {item}
                        </li>
                    ))}
                </ol>
            ) : (
                <ul key={i} className="flex flex-col gap-3 mb-8">
                    {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-on-surface text-body-lg leading-[1.9]">
                            <CheckCircle2 className="size-5 text-primary shrink-0 mt-1.5" strokeWidth={1.5}/>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        case "callout":
            return (
                <div key={i} className="my-8 bg-primary/5 border border-primary/15 rounded-2xl p-6 flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Info className="size-5" strokeWidth={1.5}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-on-surface text-title-lg font-bold">{block.title}</span>
                        <p className="text-on-surface-variant text-body-md leading-relaxed">{block.text}</p>
                    </div>
                </div>
            );
        default:
            return null;
    }
};

export const ArticleBody = ({ content, author, category }: ContentRendererProps) => (
    <article className="max-w-2xl w-full mx-auto lg:mx-0">
        {content.map(renderBlock)}

        <div className="flex items-center gap-3 flex-wrap mt-12 pt-8 border-t border-outline-variant">
            <span className="text-on-surface-variant text-label-sm">برچسب‌ها:</span>
            {["خودرو", category, "اتو پلاس"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant text-label-sm font-medium border border-outline-variant">
                    #{tag}
                </span>
            ))}
        </div>

        <div className="flex items-center gap-5 p-6 mt-10 rounded-2xl bg-surface-container-low border border-outline-variant">
            <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-headline-md font-black ring-4 ring-surface shrink-0">
                {author.charAt(0)}
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-on-surface text-title-lg font-bold">{author}</span>
                <span className="text-on-surface-variant text-body-md leading-relaxed">نویسنده در مجله اتو پلاس — تمرکز بر {category}.</span>
            </div>
        </div>
    </article>
);
