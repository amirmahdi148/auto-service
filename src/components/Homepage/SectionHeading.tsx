interface SectionHeadingProps {
    eyebrow: string;
    title: string;
    subtitle?: string;
}

export const SectionHeading = ({ eyebrow, title, subtitle }: SectionHeadingProps) => (
    <div className="flex flex-col items-center text-center gap-3">
        <span className="w-fit px-4 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-bold tracking-wide">
            {eyebrow}
        </span>
        <h2 className="text-on-surface text-headline-lg font-black leading-tight max-w-[720px]">
            {title}
        </h2>
        {subtitle && (
            <p className="text-on-surface-variant text-body-lg font-normal leading-normal max-w-[720px]">
                {subtitle}
            </p>
        )}
    </div>
);
