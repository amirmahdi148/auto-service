import { Loader2 } from "lucide-react";

export const FullPageLoader = () => (
    <div className="flex items-center justify-center h-full w-full min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
            <Loader2 className="size-8 text-primary animate-spin" strokeWidth={1.5}/>
            <span className="text-on-surface-variant text-label-lg font-bold">در حال بارگذاری...</span>
        </div>
    </div>
);
