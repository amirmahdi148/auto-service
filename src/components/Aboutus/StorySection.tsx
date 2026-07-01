import {useInView} from "../../utils/useInView";

const SectionHeading = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
    <div className="flex flex-col items-center text-center gap-3">
        <span className="w-fit px-4 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-bold tracking-wide">
            {eyebrow}
        </span>
        <h2 className="text-on-surface text-headline-lg font-black leading-tight max-w-[720px]">{title}</h2>
    </div>
);

export const StorySection = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.2);

    return (
        <section ref={ref} className="px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-container-max-width mx-auto">
                <div className={`flex flex-col gap-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <SectionHeading eyebrow="داستان ما" title="اتو پلاس چیست؟"/>
                </div>
                <div className={`flex flex-col gap-5 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "150ms" }}>
                    <p className="text-on-surface-variant text-body-lg leading-relaxed">
                        اتو پلاس یک بازارگاه آنلاین خدمات خودرو است که شما را به هزاران مرکز معتبر و متخصص در سراسر کشور متصل می‌کند. ما جستجو، مقایسه و رزرو نوبت را برای هر نوع خدمات خودرو — از تعویض روغن تا دیتیلینگ تخصصی — در یک پلتفرم ساده و شفاف گرد هم آورده‌ایم.
                    </p>
                    <p className="text-on-surface-variant text-body-lg leading-relaxed">
                        مأموریت ما حذف استرس و ابهام از فرایند خدمات خودرو است. با نمایش قیمت‌های شفاف، نظرات واقعی مشتریان و امکان مقایسه مراکز در کنار هم، شما می‌توانید آگاهانه‌ترین انتخاب را داشته باشید. ما به کیفیت خدماتی که از طریق پلتفرم ما ارائه می‌شود، تضمین می‌دهیم.
                    </p>
                </div>
            </div>
        </section>
    );
};