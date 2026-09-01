import {
    Heart,
    Bookmark,
    Link2,
    Share2,
    CheckCircle2,
    MessageCircle,
    Send,
} from "lucide-react";

interface ShareRailProps {
    liked: boolean;
    bookmarked: boolean;
    copied: boolean;
    onLike: () => void;
    onBookmark: () => void;
    onCopyLink: () => void;
    shareOn: (platform: string) => void;
}

export const ShareRail = ({ liked, bookmarked, copied, onLike, onBookmark, onCopyLink, shareOn }: ShareRailProps) => (
    <aside className="hidden lg:flex sticky top-28 flex-col items-center gap-2 self-start">
        <span className="text-on-surface-variant text-label-sm font-bold mb-1">اشتراک‌گذاری</span>
        <div className="flex flex-col gap-2 p-2 rounded-full bg-surface border border-outline-variant">
            <button onClick={onLike} aria-label="پسندیدن" className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${liked ? "bg-secondary text-on-secondary" : "text-on-surface-variant hover:bg-surface-container-high hover:text-secondary"}`}>
                <Heart className={`size-5 ${liked ? "fill-current" : ""}`} strokeWidth={1.5}/>
            </button>
            <button onClick={onBookmark} aria-label="ذخیره" className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${bookmarked ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"}`}>
                <Bookmark className={`size-5 ${bookmarked ? "fill-current" : ""}`} strokeWidth={1.5}/>
            </button>
            <button onClick={onCopyLink} aria-label="کپی لینک" className="flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors">
                {copied ? <CheckCircle2 className="size-5 text-primary" strokeWidth={1.5}/> : <Link2 className="size-5" strokeWidth={1.5}/>}
            </button>
            <div className="h-px w-6 bg-outline-variant mx-auto my-1"/>
            <button onClick={() => shareOn("twitter")} aria-label="اشتراک‌گذاری در توییتر" className="flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer">
                <MessageCircle className="size-5" strokeWidth={1.5}/>
            </button>
            <button onClick={() => shareOn("facebook")} aria-label="اشتراک‌گذاری در فیسبوک" className="flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer">
                <Share2 className="size-5" strokeWidth={1.5}/>
            </button>
            <button onClick={() => shareOn("telegram")} aria-label="اشتراک‌گذاری در تلگرام" className="flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer">
                <Send className="size-5" strokeWidth={1.5}/>
            </button>
        </div>
    </aside>
);

interface MobileShareBarProps {
    liked: boolean;
    bookmarked: boolean;
    copied: boolean;
    onLike: () => void;
    onBookmark: () => void;
    onCopyLink: () => void;
}

export const MobileShareBar = ({ liked, bookmarked, copied, onLike, onBookmark, onCopyLink }: MobileShareBarProps) => (
    <div className="flex lg:hidden items-center justify-center gap-3 mt-8 p-3 rounded-2xl bg-surface-container-low border border-outline-variant">
        <button onClick={onLike} aria-label="پسندیدن" className={`flex items-center justify-center w-11 h-11 rounded-full transition-colors ${liked ? "bg-secondary text-on-secondary" : "bg-surface text-on-surface-variant"}`}>
            <Heart className={`size-5 ${liked ? "fill-current" : ""}`} strokeWidth={1.5}/>
        </button>
        <button onClick={onBookmark} aria-label="ذخیره" className={`flex items-center justify-center w-11 h-11 rounded-full transition-colors ${bookmarked ? "bg-primary text-on-primary" : "bg-surface text-on-surface-variant"}`}>
            <Bookmark className={`size-5 ${bookmarked ? "fill-current" : ""}`} strokeWidth={1.5}/>
        </button>
        <button onClick={onCopyLink} aria-label="کپی لینک" className="flex items-center justify-center w-11 h-11 rounded-full bg-surface text-on-surface-variant">
            {copied ? <CheckCircle2 className="size-5 text-primary" strokeWidth={1.5}/> : <Link2 className="size-5" strokeWidth={1.5}/>}
        </button>
        <button aria-label="اشتراک‌گذاری" className="flex items-center justify-center w-11 h-11 rounded-full bg-surface text-on-surface-variant">
            <Share2 className="size-5" strokeWidth={1.5}/>
        </button>
    </div>
);
