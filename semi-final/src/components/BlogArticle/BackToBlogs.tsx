import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export const BackToBlogs = () => (
    <Link
        to="/blogs"
        className="group inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary text-body-md font-medium transition-colors w-fit"
    >
        <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5}/>
        بازگشت به مجله
    </Link>
);
