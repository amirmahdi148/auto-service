export const ArticleSkeleton = () => (
    <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-4 w-32 rounded-full bg-surface-container-high"/>
        <div className="h-12 w-3/4 rounded-2xl bg-surface-container-high"/>
        <div className="h-4 w-1/2 rounded-full bg-surface-container-high"/>
        <div className="h-64 w-full rounded-[2rem] bg-surface-container-high"/>
        <div className="space-y-3 pt-4">
            {Array.from({length: 6}).map((_, i) => (
                <div key={i} className="h-4 rounded-full bg-surface-container-high" style={{width: `${85 - (i % 3) * 12}%`}}/>
            ))}
        </div>
    </div>
);
