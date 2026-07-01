import type { ContentBlock } from "../../api/data/blogs";

export interface ApiPostDetail {
    id: number;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    slug?: string;
    featured?: boolean;
    content: ContentBlock[];
}

export interface RelatedPost {
    id: number;
    category: string;
    title: string;
    author: string;
    date: string;
    readTime: string;
    slug: string;
    excerpt: string;
}

export type { ContentBlock };
