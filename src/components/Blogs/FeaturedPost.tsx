import {useInView} from "../../utils/useInView";
import {TrendingUp, Clock, ArrowLeft} from "lucide-react";
import {Link} from "react-router";
import type {Post} from "../../api/data/blogs.ts";

/* The lead article. Shown only on the default view (handled by the parent).
   Striking split layout: a layered visual on one side, copy on the other. */
export const FeaturedPost = ({post}: { post: Post }) => {
    const { ref, inView } = useInView<HTMLDivElement>(0.15);

    return (
        <section ref={ref} className="px-4">
            <div className={`max-w-container-max-width mx-auto w-full transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <Link to={`/blog/${post.slug}`} className="group grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] bg-surface rounded-[2rem] border border-outline-variant hover:border-primary/30 transition-all duration-500 overflow-hidden hover:shadow-xl">

                    {/* Visual side — layered gradient + floating icon + featured badge */}
                    <div className="relative min-h-[240px] sm:min-h-[300px] mesh-gradient-bg flex items-center justify-center p-10 overflow-hidden">
                        {/* Soft inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"/>
                        {/* Floating decorative ring */}
                        <div className="absolute w-48 h-48 rounded-full border border-on-primary/10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700"/>
                        {/* Category icon medallion */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-on-primary/15 border border-on-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <post.catIcon className="size-12 sm:size-14 text-on-primary" strokeWidth={1.5}/>
                        </div>
                        {/* Featured ribbon */}
                        <span className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-on-secondary text-label-sm font-bold shadow-lg">
                            <TrendingUp className="size-3.5" strokeWidth={2}/> ویژه
                        </span>
                    </div>

                    {/* Copy side */}
                    <div className="flex flex-col gap-4 p-7 sm:p-9 md:p-11 justify-center">
                        <span className="w-fit px-3 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-bold">{post.category}</span>
                        <h2 className="text-on-surface text-headline-md sm:text-headline-lg font-black leading-tight group-hover:text-primary transition-colors">
                            {post.title}
                        </h2>
                        <p className="text-on-surface-variant text-body-md leading-relaxed line-clamp-3">{post.excerpt}</p>

                        {/* Meta row */}
                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-lg font-bold ring-2 ring-surface">
                                    {post.author.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-on-surface text-label-lg font-bold">{post.author}</span>
                                    <span className="text-on-surface-variant text-label-sm">{post.date}</span>
                                </div>
                            </div>
                            <span className="flex items-center gap-1.5 text-on-surface-variant text-label-sm">
                                <Clock className="size-4" strokeWidth={1.5}/> {post.readTime} مطالعه
                            </span>
                        </div>

                        {/* Read-more affordance */}
                        <span className="flex items-center gap-1.5 text-primary font-bold text-body-md mt-3 group-hover:gap-3 transition-all">
                            ادامه مطلب <ArrowLeft className="size-4" strokeWidth={2}/>
                        </span>
                    </div>
                </Link>
            </div>
        </section>
    );
};
