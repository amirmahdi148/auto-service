import { Link } from "react-router";
import { BookOpen } from "lucide-react";

export const ErrorState = () => (
    <div className="flex flex-col items-center gap-5 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center">
            <BookOpen className="size-10 text-on-surface-variant" strokeWidth={1.5}/>
        </div>
        <h2 className="text-on-surface text-headline-md font-black">مقاله یافت نشد</h2>
        <p className="text-on-surface-variant text-body-lg max-w-md">مقاله‌ای با این آدرس وجود ندارد یا حذف شده است.</p>
        <Link to="/blogs" className="mt-2 flex items-center gap-2 h-12 px-7 rounded-full bg-primary text-on-primary font-bold cursor-pointer hover:bg-primary-container hover:text-on-primary-container transition-colors">
            مشاهده همه مقالات
        </Link>
    </div>
);
