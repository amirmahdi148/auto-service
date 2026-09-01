import { Link } from "react-router";
import { Home } from "lucide-react";

export const NotFoundPage = () => (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <span className="text-headline-lg font-black">!</span>
        </div>
        <h1 className="text-headline-lg font-black text-on-surface">صفحه مورد نظر یافت نشد</h1>
        <p className="text-body-md text-on-surface-variant max-w-sm">صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.</p>
        <Link
            to="/"
            className="flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-on-primary font-bold text-label-lg hover:bg-primary/90 transition-colors"
        >
            <Home className="size-4" strokeWidth={1.5}/>
            بازگشت به صفحه اصلی
        </Link>
    </div>
);
