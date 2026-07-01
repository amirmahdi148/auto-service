import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { HttpService } from "../utils/HttpService.ts";
import type { ApiPostDetail, RelatedPost } from "../components/BlogArticle/types.ts";
import { BackToBlogs } from "../components/BlogArticle/BackToBlogs.tsx";
import { ErrorState } from "../components/BlogArticle/ErrorState.tsx";
import { ArticleSkeleton } from "../components/BlogArticle/Skeleton.tsx";
import { ArticleHeader } from "../components/BlogArticle/ArticleHeader.tsx";
import { CoverVisual } from "../components/BlogArticle/CoverVisual.tsx";
import { ShareRail, MobileShareBar } from "../components/BlogArticle/ShareRail.tsx";
import { ArticleBody } from "../components/BlogArticle/ContentRenderer.tsx";
import { TableOfContents } from "../components/BlogArticle/TableOfContents.tsx";
import { RelatedArticles } from "../components/BlogArticle/RelatedArticles.tsx";

export const SingleBlogPage = () => {
    const { slug = "" } = useParams<{ slug: string }>();
    console.log("[SingleBlog] slug:", slug);

    const [progress, setProgress] = useState(0);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [copied, setCopied] = useState(false);

    const { data: post, isLoading, isError } = useQuery({
        queryKey: ["blog", slug],
        queryFn: () => HttpService.get<ApiPostDetail>(`/api/blogs/${slug}`),
    });
    console.log("[SingleBlog] query state:", { isLoading, isError, hasPost: !!post });

    const { data: relatedData } = useQuery({
        queryKey: ["related", post?.category],
        queryFn: () => HttpService.get<{ data: RelatedPost[] }>("/api/blogs", { params: { limit: 4 } }),
        enabled: !!post,
    });
    const related = (relatedData?.data ?? [])
        .filter((p) => p.id !== post?.id && p.slug)
        .slice(0, 2);

    useEffect(() => {
        const onScroll = () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setProgress(height > 0 ? (winScroll / height) * 100 : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [slug]);

    const headings = post?.content?.filter((b): b is { type: "heading"; text: string } => b.type === "heading") ?? [];

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { /* clipboard not available */ }
    };

    const shareOn = (platform: string) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(post?.title ?? "");
        const urls: Record<string, string> = {
            twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            telegram: `https://t.me/share/url?url=${url}&text=${title}`,
        };
        window.open(urls[platform], "_blank", "noopener,noreferrer,width=600,height=500");
    };

    return (
        <div className="flex flex-col pt-4">
            <div
                className="fixed top-0 right-0 h-1 bg-gradient-to-l from-primary to-secondary z-[60] transition-[width] duration-150"
                style={{ width: `${progress}%` }}
            />

            <div className="flex flex-col gap-12 px-4">
                <BackToBlogs />

                {isError && <ErrorState />}
                {isLoading && <ArticleSkeleton />}

                {post && !isError && (
                    <>
                        <ArticleHeader post={post} />
                        <CoverVisual />

                        <div className="relative grid grid-cols-1 lg:grid-cols-[auto_1fr_220px] gap-8 lg:gap-12 max-w-5xl w-full mx-auto items-start">
                            <ShareRail
                                liked={liked}
                                bookmarked={bookmarked}
                                copied={copied}
                                onLike={() => setLiked((v) => !v)}
                                onBookmark={() => setBookmarked((v) => !v)}
                                onCopyLink={copyLink}
                                shareOn={shareOn}
                            />

                            <div className="flex flex-col">
                                <ArticleBody content={post.content ?? []} author={post.author} category={post.category} />
                                <MobileShareBar
                                    liked={liked}
                                    bookmarked={bookmarked}
                                    copied={copied}
                                    onLike={() => setLiked((v) => !v)}
                                    onBookmark={() => setBookmarked((v) => !v)}
                                    onCopyLink={copyLink}
                                />
                            </div>

                            <TableOfContents headings={headings} />
                        </div>

                        <RelatedArticles related={related} />
                    </>
                )}
            </div>

            <div className="h-16" />
        </div>
    );
};
