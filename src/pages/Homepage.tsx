import {Hero} from "../components/Homepage/Hero.tsx";
import {Stats} from "../components/Homepage/Stats.tsx";
import {BrandTrust} from "../components/Homepage/BrandTrust.tsx";
import {Services} from "../components/Homepage/Services.tsx";
import {HowItWorks} from "../components/Homepage/HowItWorks.tsx";
import {Benefits} from "../components/Homepage/Benefits.tsx";
import {Partners} from "../components/Homepage/Partners.tsx";
import {Testimonials} from "../components/Homepage/Testimonials.tsx";
import {Faq} from "../components/Homepage/Faq.tsx";
import {CtaSection} from "../components/Homepage/CtaSection.tsx";

export const Homepage = () => (
    <div className="@container flex flex-col gap-16">
        <Hero/>
        <Stats/>
        <BrandTrust/>
        <Services/>
        <HowItWorks/>
        <Benefits/>
        <Partners/>
        <Testimonials/>
        <Faq/>
        <CtaSection/>
    </div>
);