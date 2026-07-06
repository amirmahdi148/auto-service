import { CheckCircle2, UserPlus, AlertCircle, Wallet, Star, ChevronLeft, Clock } from "lucide-react";

const ACTIVITY = [
    { Icon: CheckCircle2, color: "primary", text: "رزرو #۱۰۲۴ با موفقیت تکمیل شد", time: "۵ دقیقه پیش" },
    { Icon: UserPlus, color: "primary", text: "مشتری جدید ثبت‌نام کرد: نگار کاظمی", time: "۲۰ دقیقه پیش" },
    { Icon: AlertCircle, color: "secondary", text: "نوبت #۱۰۲۲ نیاز به تأیید دارد", time: "۱ ساعت پیش" },
    { Icon: Wallet, color: "primary", text: "پرداخت ۶٬۸۰۰٬۰۰۰ تومان ثبت شد", time: "۲ ساعت پیش" },
    { Icon: Star, color: "primary", text: "نظر ۵ ستاره جدید برای مرکز آریا", time: "۳ ساعت پیش" },
];

export const ActivityFeed = () => (
    <div className="rounded-2xl bg-surface border border-outline-variant p-6">
        <div className="flex items-center justify-between mb-5">
            <h2 className="text-on-surface text-title-lg font-bold">فعالیت‌های اخیر</h2>
            <button className="text-primary text-label-sm font-bold cursor-pointer hover:underline flex items-center gap-0.5">
                همه <ChevronLeft className="size-3.5" strokeWidth={2}/>
            </button>
        </div>
        <ul className="flex flex-col gap-1">
            {ACTIVITY.map((item, i) => (
                <li key={i} className="flex items-start gap-3 relative pb-4 last:pb-0">
                    {i < ACTIVITY.length - 1 && (
                        <span className="absolute right-[18px] top-9 bottom-0 w-px bg-outline-variant"/>
                    )}
                    <div className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-full shrink-0 ring-4 ring-surface ${
                        item.color === "secondary" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
                    }`}>
                        <item.Icon className="size-4" strokeWidth={1.5}/>
                    </div>
                    <div className="flex flex-col gap-0.5 pt-1.5">
                        <span className="text-on-surface text-label-lg leading-snug">{item.text}</span>
                        <span className="text-on-surface-variant text-label-sm flex items-center gap-1">
                            <Clock className="size-3" strokeWidth={1.5}/> {item.time}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);
