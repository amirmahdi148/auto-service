import {useInView} from "../../utils/useInView";
import {Smartphone} from "lucide-react";

const AppleIcon = () => (
    <svg viewBox="0 0 24 24" className="size-6 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
);

const PlayIcon = () => (
    <svg viewBox="0 0 24 24" className="size-6 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5v14l11-7z"/>
    </svg>
);

export const AppDownload = () => {
    const {ref, inView} = useInView<HTMLDivElement>(0.3);

    return (
        <div
            ref={ref}
            className={`flex flex-col lg:flex-row items-center justify-between gap-8 bg-primary text-on-primary rounded-[2rem] py-8 px-8 mx-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
            {/* Text side */}
            <div className="flex flex-col gap-3 lg:order-2">
                <div className="flex items-center gap-3">
                    <Smartphone className="size-7" strokeWidth={1.5}/>
                    <h2 className="text-headline-md font-black">اتو پلاس در جیب شما</h2>
                </div>
                <p className="text-on-primary text-body-md opacity-90 max-w-md">
                    نوبت‌گیری، پیگیری و یادآوری سرویس‌ها — همه در اپلیکیشن. هر زمان، هر مکان.
                </p>
            </div>

            {/* Badges side */}
            <div className="flex flex-col sm:flex-row gap-3 lg:order-1">
                <button className="flex items-center gap-3 bg-on-primary text-primary rounded-full px-6 py-3 hover:bg-on-primary/90 transition-colors cursor-pointer">
                    <AppleIcon/>
                    <div className="flex flex-col items-start text-right">
                        <span className="text-label-sm opacity-70">دانلود از</span>
                        <span className="text-title-lg font-bold leading-tight">App Store</span>
                    </div>
                </button>
                <button className="flex items-center gap-3 bg-on-primary text-primary rounded-full px-6 py-3 hover:bg-on-primary/90 transition-colors cursor-pointer">
                    <PlayIcon/>
                    <div className="flex flex-col items-start text-right">
                        <span className="text-label-sm opacity-70">دانلود از</span>
                        <span className="text-title-lg font-bold leading-tight">Google Play</span>
                    </div>
                </button>
            </div>
        </div>
    );
};
