import {useEffect, useState} from "react";
import {HeroSection} from "../components/Aboutus/HeroSection.tsx";
import {StorySection} from "../components/Aboutus/StorySection.tsx";
import {ValuesSection} from "../components/Aboutus/ValuesSection.tsx";
import {JourneySection} from "../components/Aboutus/JourneySection.tsx";
import {ApproachSection} from "../components/Aboutus/ApproachSection.tsx";
import {TeamSection} from "../components/Aboutus/TeamSection.tsx";
import {StatsBand} from "../components/Aboutus/StatsBand.tsx";
import {CtaSection} from "../components/Aboutus/CtaSection.tsx";

export const AboutusPage = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setProgress(height > 0 ? (winScroll / height) * 100 : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="flex flex-col gap-16 pt-4">
            <div
                className="fixed top-0 right-0 h-1 bg-gradient-to-l from-primary to-secondary z-[60] transition-[width] duration-150"
                style={{ width: `${progress}%` }}
            />
            <HeroSection/>
            <StorySection/>
            <ValuesSection/>
            <JourneySection/>
            <ApproachSection/>
            <TeamSection/>
            <StatsBand/>
            <CtaSection/>
        </div>
    );
};