import {Header} from "../components/Homepage/Header.tsx";
import {Hero} from "../components/Homepage/Hero.tsx";
import {Services} from "../components/Homepage/Services.tsx";
import {Partners} from "../components/Homepage/Partners.tsx";
import {CtaSection} from "../components/Homepage/CtaSection.tsx";

export const Homepage = () => {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-surface group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-container-max-width flex-1">
                        <Header/>
                        <div className="@container">
                            <Hero/>
                            <Services/>
                            <Partners/>
                            <CtaSection/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
