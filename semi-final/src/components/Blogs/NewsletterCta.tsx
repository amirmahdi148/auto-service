import {useInView} from "../../utils/useInView";
import {Sparkles, Send} from "lucide-react";

/* Conversion nudge at the bottom of the page. Local-only form state (no
   fetching wired). Red accent reserved solely for the submit button. */
export const NewsletterCta = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.2);

    return (
        <section ref={ref} className="px-4">
            <div className={`relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-primary transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                {/* Decorative layers */}
                <div className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full bg-on-primary/5 blur-3xl"/>
                <div className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 rounded-full bg-secondary/10 blur-3xl"/>
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "22px 22px" }}
                />

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-8 sm:p-12 md:p-16">
                    {/* Copy */}
                    <div className="flex flex-col gap-3 text-center lg:text-right">
                        <span className="w-fit mx-auto lg:mx-0 flex items-center gap-2 px-4 py-1.5 rounded-full bg-on-primary/15 text-primary-fixed text-label-sm font-bold tracking-wide">
                            <Sparkles className="size-4"/> خبرنامه
                        </span>
                        <h2 className="text-on-primary text-headline-lg font-black leading-tight max-w-lg">
                            از آخرین مقالات جا نمی‌مانید
                        </h2>
                        <p className="text-primary-fixed text-body-lg font-normal leading-relaxed max-w-lg">
                            ایمیل خود را وارد کنید تا تازه‌ترین مطالب دنیای خودرو مستقیم در صندوق دریافتی شما قرار گیرد.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex flex-col sm:flex-row gap-2 w-full lg:max-w-md"
                    >
                        <input
                            type="email"
                            required
                            placeholder="ایمیل شما"
                            className="flex-1 h-14 rounded-2xl px-5 bg-on-primary/10 backdrop-blur-sm border border-on-primary/20 text-on-primary placeholder:text-primary-fixed/60 focus:outline-none focus:border-on-primary/50 transition-colors text-body-md"
                        />
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 h-14 px-7 rounded-2xl bg-secondary text-on-secondary font-bold text-label-lg cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap"
                        >
                            عضویت
                            <Send className="size-4" strokeWidth={2}/>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
