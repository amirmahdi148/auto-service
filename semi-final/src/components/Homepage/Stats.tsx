import {useState, useEffect, useRef} from "react";
import {useInView} from "../../utils/useInView";
import {Users, Wrench, Star, MapPin} from "lucide-react";

/** Convert a number back to a Persian-digit string, preserving ۴.۸ style. */
function toPersianNum(n: number, decimals = 0): string {
    const fixed = n.toFixed(decimals);
    const map: Record<string, string> = {
        "0": "۰", "1": "۱", "2": "۲", "3": "۳", "4": "۴",
        "5": "۵", "6": "۶", "7": "۷", "8": "۸", "9": "۹",
    };
    return Array.from(fixed).map((c) => map[c] ?? c).join("");
}

/** Reconstruct the display value from a current numeric count and the original string template. */
function buildDisplay(original: string, current: number, decimals: number): string {
    const persianCurrent = toPersianNum(current, decimals);
    // Insert commas every 3 digits (right-to-left in Persian is left-to-right in ASCII)
    // We replace the numeric portion with the formatted number
    const map: Record<string, string> = {
        "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4",
        "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9",
    };
    const normalized = Array.from(original).map((c) => map[c] ?? c).join("");
    const numMatch = normalized.match(/[\d.,]+/);
    if (!numMatch) return original;
    const [before, after] = original.split(numMatch[0]);
    return (before ?? "") + persianCurrent + (after ?? "");
}

const STATS = [
    { Icon: Users, value: "+۵۰٬۰۰۰", label: "مشتری راضی", numeric: 50000, decimals: 0 },
    { Icon: Wrench, value: "+۱٬۲۰۰", label: "مرکز همکار", numeric: 1200, decimals: 0 },
    { Icon: Star, value: "۴.۸", label: "امتیاز مشتریان", numeric: 4.8, decimals: 1 },
    { Icon: MapPin, value: "+۳۰", label: "شهر پوشش‌دار", numeric: 30, decimals: 0 },
];

interface CounterState {
    current: number;
    animating: boolean;
}

export const Stats = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.3);
    const startedRef = useRef(false);
    const [counters, setCounters] = useState<CounterState[]>(
        STATS.map(() => ({current: 0, animating: false}))
    );

    useEffect(() => {
        if (!inView || startedRef.current) return;
        startedRef.current = true;

        const rafIds: number[] = [];
        const timeouts: number[] = [];

        STATS.forEach((stat, i) => {
            const delay = i * 100 + 300;

            const tid = window.setTimeout(() => {
                const target = stat.numeric;
                const duration = 1200;
                const startTime = performance.now();

                function step(now: number) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = eased * target;

                    setCounters((prev) => {
                        const next = [...prev];
                        next[i] = {current, animating: progress < 1};
                        return next;
                    });

                    if (progress < 1) {
                        rafIds.push(requestAnimationFrame(step));
                    }
                }

                rafIds.push(requestAnimationFrame(step));
            }, delay);
            timeouts.push(tid);
        });

        return () => {
            timeouts.forEach(clearTimeout);
            rafIds.forEach(cancelAnimationFrame);
        };
    }, [inView]);

    return (
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 -mt-8">
            {STATS.map((stat, i) => (
                <div
                    key={stat.label}
                    className={`flex flex-col items-center text-center gap-1 bg-surface rounded-2xl p-6 border border-outline-variant transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                >
                    <div className="w-11 h-11 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-1">
                        <stat.Icon className="size-5" strokeWidth={1.5}/>
                    </div>
                    <span className="text-on-surface text-headline-md font-black tabular-nums">
                        {counters[i].animating
                            ? buildDisplay(stat.value, counters[i].current, stat.decimals)
                            : stat.value}
                    </span>
                    <span className="text-on-surface-variant text-label-lg font-medium">{stat.label}</span>
                </div>
            ))}
        </div>
    );
};