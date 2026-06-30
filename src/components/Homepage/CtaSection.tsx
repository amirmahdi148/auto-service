export const CtaSection = () => (
    <div className="flex flex-col lg:flex-row gap-12 px-8 py-16 items-center mb-16 rounded-[3rem] bg-primary text-on-primary shadow-2xl relative overflow-hidden" id="professionals">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }}/>
        <div className="w-full lg:w-3/5 flex flex-col gap-6 z-10">
            <span className="text-primary bg-on-primary w-fit px-4 py-1 rounded-full text-label-sm font-bold tracking-wide">برای متخصصان و تعمیرگاه‌ها</span>
            <h2 className="text-on-primary text-headline-lg font-black leading-tight">
                کسب و کار خود را در اتو پلاس گسترش دهید
            </h2>
            <p className="text-primary-fixed text-body-lg font-normal leading-relaxed">
                به هزاران مشتری که روزانه به دنبال خدمات با کیفیت خودرو هستند متصل شوید. با پیوستن به بازارگاه ما، نوبت‌دهی خود را مدیریت کنید، نظرات مشتریان را دریافت کنید و درآمد خود را افزایش دهید.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-secondary text-on-secondary text-title-lg font-bold leading-normal transition-transform hover:scale-105 shadow-lg">
                    ثبت‌نام به عنوان متخصص
                </button>
                <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-transparent border-2 border-on-primary text-on-primary text-title-lg font-bold leading-normal transition-colors hover:bg-on-primary/10">
                    کسب اطلاعات بیشتر
                </button>
            </div>
        </div>
        <div className="w-full lg:w-2/5 flex justify-center z-10">
            <div className="relative w-full max-w-md aspect-square rounded-[2rem] overflow-hidden border-4 border-on-primary/20 shadow-2xl">
                <img alt="Mechanic using a tablet" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpMxYu9kFWpl3wGkrStQpHaBBsRa-XGAGYdzbEXk8UvabOM51rl-61QqX4xDfCYlZisgesn00FZR49drKekkbh-ltJRiZjZlKWSi-5b57zDUDArT5pIsX2nO3iq-Okl2Rez1lTx3S6zkOYZov0cpDUfvD8y6B_5MFyMj-cG3kWywXOyZ2skcG0668wnRXVRVmXbI6-3YaEL_WlkbgklrbVeCYMhH1eBJ4kDRA6Dh7dUMsA6ScybDwtMobQ__JqWCXcAxHXEKgsFpZg"/>
            </div>
        </div>
    </div>
)
