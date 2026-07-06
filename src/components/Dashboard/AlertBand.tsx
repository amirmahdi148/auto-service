import { AlertCircle, ChevronLeft } from "lucide-react";

export const AlertBand = () => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-primary text-on-primary p-6">
        <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-on-primary/10 shrink-0">
                <AlertCircle className="size-6" strokeWidth={1.5}/>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-on-primary text-title-lg font-bold">موارد نیازمند توجه شما</h3>
                <p className="text-primary-fixed text-label-lg">۳ رزرو در انتظار تأیید و ۲ پیام پشتیبانی جدید</p>
            </div>
        </div>
        <button className="flex items-center gap-2 h-11 px-6 rounded-full bg-secondary text-on-secondary font-bold text-label-lg cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap">
            بررسی موارد
            <ChevronLeft className="size-4" strokeWidth={2}/>
        </button>
    </div>
);
