export const Services = () => {
    return (
        <div className="flex flex-col gap-12 px-4 py-16 @container smooth-curve-top bg-surface-container-low rounded-[3rem] mb-16" id="services">
            <div className="flex flex-col items-center text-center gap-4">
                <h2 className="text-on-surface text-headline-lg font-black leading-tight max-w-[720px]">
                    تنوع بی‌نظیر خدمات
                </h2>
                <p className="text-on-surface-variant text-body-lg font-normal leading-normal max-w-[720px]">از سرویس‌های دوره‌ای تا دیتیلینگ تخصصی؛ هر آنچه خودروی شما نیاز دارد را در پلتفرم ما بیابید.</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
                <div className="group flex flex-col gap-4 bg-surface rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-surface-variant hover:border-primary/30">
                    <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-3xl" data-icon="car_repair">car_repair</span>
                    </div>
                    <h3 className="text-on-surface text-title-lg font-bold">مکانیک و تعمیرات</h3>
                    <p className="text-on-surface-variant text-body-md">دسترسی به تعمیرگاه‌های مجاز و متخصصین عیب‌یابی با تجهیزات پیشرفته.</p>
                </div>
                <div className="group flex flex-col gap-4 bg-surface rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-surface-variant hover:border-primary/30">
                    <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-3xl" data-icon="water_drop">water_drop</span>
                    </div>
                    <h3 className="text-on-surface text-title-lg font-bold">مراکز دیتیلینگ</h3>
                    <p className="text-on-surface-variant text-body-md">مقایسه و رزرو برترین مراکز احیای رنگ، سرامیک و صفرشویی تخصصی.</p>
                </div>
                <div className="group flex flex-col gap-4 bg-surface rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-surface-variant hover:border-primary/30">
                    <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-3xl" data-icon="tire_repair">tire_repair</span>
                    </div>
                    <h3 className="text-on-surface text-title-lg font-bold">خدمات تایر و جلوبندی</h3>
                    <p className="text-on-surface-variant text-body-md">یافتن نزدیک‌ترین و معتبرترین مراکز برای تعویض لاستیک و تنظیم فرمان.</p>
                </div>
            </div>
        </div>
    )
}