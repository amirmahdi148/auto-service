import { BookOpen } from "lucide-react";

export const CoverVisual = () => (
    <div className="mesh-gradient-bg relative h-56 sm:h-72 md:h-80 rounded-[2rem] overflow-hidden max-w-4xl w-full mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-on-primary/15 border border-on-primary/20 backdrop-blur-sm flex items-center justify-center">
                <BookOpen className="size-14 text-on-primary" strokeWidth={1.5}/>
            </div>
        </div>
    </div>
);
