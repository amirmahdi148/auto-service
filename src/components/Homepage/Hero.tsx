export const Hero = () => {
    return (
        <>

            <div className="@[480px]:p-4 mb-16">
                <div
                    className="flex min-h-150 flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-[3rem] items-center justify-center p-8 relative overflow-hidden mesh-gradient-bg"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 37, 68, 0.4) 0%, rgba(26, 59, 92, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2qNwWg_SkZmGVs06vLk8sgrTori2BnhZwzserdF2OK11Rmg12jyfMuiH-jC4JfcE3SJ8pMDhy4g5q1wy7sE87O2EtEg_SdReR-jurSqLkjjZjmH5dif-Cd9ITZVJMamSinleUz2Kas7GaSz3a9urXG6pc-ECd7Tx93Z4rnM7FVB1CNByr_ywqx8x1VPGy-xo_aqp-oO1PcM7ZWHhBGO21hGCO7_wVsaxbj9sorQyshnpUKwbO_z3qH5m7fFAqMA8qeYgUKlCH8Qjy")`,
                    }}
                >
                    <div className="flex flex-col gap-4 text-center z-10 max-w-[800px]">
                        <span className="text-cyan-300 text-label-lg uppercase tracking-widest font-semibold mb-2">بازارگاه تخصصی خدمات خودرو</span>
                        <h1 className="text-white text-display-lg-mobile @[768px]:text-display-lg font-black leading-tight drop-shadow-md">
                            بهترین متخصصان خودرو، در یک نگاه
                        </h1>
                        <p className="text-surface-container-low text-body-lg font-normal leading-relaxed opacity-90 mt-4">
                            با اتو پلاس، به راحتی برترین تعمیرگاه‌ها و متخصصان خدمات خودرو را پیدا کنید، نظرات را بخوانید و نوبت خود را آنلاین رزرو کنید.
                        </p>
                    </div>
                    <div className="flex gap-4 z-10 mt-8">
                        <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-on-primary text-primary text-title-lg font-bold leading-normal transition-transform hover:scale-105 shadow-xl">
                            جستجوی خدمات
                        </button>
                        <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-transparent border-2 border-on-primary text-on-primary text-title-lg font-bold leading-normal transition-colors hover:bg-on-primary/10">
                            مشاهده مراکز
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}