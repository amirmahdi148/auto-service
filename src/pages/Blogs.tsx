import {useState, useEffect} from "react";
import {Wrench, Cpu, ShoppingCart, Newspaper} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {BlogHeader} from "../components/Blogs/BlogHeader";
import {FeaturedPost} from "../components/Blogs/FeaturedPost";
import {BlogGrid} from "../components/Blogs/BlogGrid";
import {NewsletterCta} from "../components/Blogs/NewsletterCta";
import {CATEGORIES} from "../api/data/blogs.ts";
import type {Post} from "../api/data/blogs.ts";
import {HttpService} from "../utils/HttpService.ts";

const CATEGORY_ICONS: Record<string, typeof Wrench> = {
    "تعمیر و نگهداری": Wrench,
    "تکنولوژی خودرو": Cpu,
    "راهنمای خرید": ShoppingCart,
    "اخبار صنعت": Newspaper,
};

interface ApiPost {
    id: number;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    featured?: boolean;
    slug?: string;
}

interface BlogsResponse {
    data: ApiPost[];
    meta: {
        page: number;
        limit: number;
        totalPages: number;
        totalItems: number;
    };
}

export const BlogsPage = () => {
    const [activeCategory, setActiveCategory] = useState("همه");
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(t);
    }, [search]);

    const { data, isFetching } = useQuery({
        queryKey: ["blogs", { page, category: activeCategory, search: debouncedSearch }],
        queryFn: () => {
            const params: Record<string, string | number | boolean | undefined> = {
                page,
                limit: 3,
            };
            if (activeCategory !== "همه") params.category = activeCategory;
            if (debouncedSearch) params.search = debouncedSearch;
            return HttpService.get<BlogsResponse>("/api/blogs", { params });
        },
        placeholderData: (previousData) => previousData,
    });

    const enriched = data?.data.map((p) => ({
        ...p,
        catIcon: CATEGORY_ICONS[p.category] ?? Newspaper,
    })) as Post[] | undefined;

    const handleCategoryChange = (label: string) => {
        setActiveCategory(label);
        setPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const showFeatured = activeCategory === "همه" && page === 1 && !debouncedSearch;
    const featured = showFeatured && enriched ? enriched[0] : null;
    const gridPosts = showFeatured && enriched ? enriched.slice(1) : enriched ?? [];

    return (
        <div className="flex flex-col gap-16 pt-4">
            <BlogHeader search={search} onSearchChange={handleSearchChange}/>
            {showFeatured && featured && <FeaturedPost post={featured}/>}
            <BlogGrid
                categories={CATEGORIES}
                posts={gridPosts}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                page={data?.meta.page ?? 1}
                totalPages={data?.meta.totalPages ?? 1}
                totalItems={data?.meta.totalItems ?? 0}
                onPageChange={setPage}
                isFetching={isFetching}
            />
            <NewsletterCta/>
        </div>
    );
};
