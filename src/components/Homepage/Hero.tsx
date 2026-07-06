import {useState} from "react";
import {Users, Search} from "lucide-react";

const SERVICES = ["مکانیک", "دیتیلینگ", "تایر و جلوبندی", "عیب‌یابی", "سایر"];
const CITIES = ["تهران", "کرج", "اصفهان", "شیراز", "مشهد", "تبریز", "سایر"];

export const Hero = () => {
    const [service, setService] = useState("");
    const [city, setCity] = useState("");

    const handleSearch = () => {
        document.getElementById("centers")?.scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className="@[480px]:p-4 mb-24">
            <div className="relative">
                <div
                    className="flex min-h-150 flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-[3rem] items-center justify-center p-8 relative overflow-hidden mesh-gradient-bg"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 37, 68, 0.4) 0%, rgba(26, 59, 92, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2qNwWg_SkZmGVs06vLk8sgrTori2BnhZwzserdF2OK11Rmg12jyfMuiH-jC4JfcE3SJ8pMDhy4g5q1wy7sE87O2EtEg_SdReR-jurSqLkjjZjmH5dif-Cd9ITZVJMamSinleUz2Kas7GaSz3a9urXG6pc-ECd7Tx93Z4rnM7FVB1CNByr_ywqx8x1VPGy-xo_aqp-oO1PcM7ZWHhBGO21hGCO7_wVsaxbj9sorQyshnpUKwbO_z3qH5m7fFAqMA8qeYgUKlCH8Qjy")`,
                    }}
                >
                    <div className="flex flex-col gap-4 text-center z-10 max-w-[800px]">
                        <span className="text-cyan-300 text-label-lg uppercase tracking-widest font-semibold mb-2">
                            بازارگاه تخصصی خدمات خودرو
                        </span>
                        <h1 className="text-white text-display-lg-mobile @[768px]:text-display-lg font-black leading-tight drop-shadow-md">
                            بهترین متخصصان خودرو، در یک نگاه
                        </h1>
                        <p className="text-surface-container-low text-body-lg font-normal leading-relaxed opacity-90 mt-4">
                            با اتو پلاس، به راحتی برترین تعمیرگاه‌ها و متخصصان خدمات خودرو را پیدا کنید، نظرات را بخوانید و نوبت خود را آنلاین رزرو کنید.
                        </p>
                        <p className="flex items-center justify-center gap-2 text-surface-container-low/80 text-label-lg mt-2">
                            <Users className="size-4" strokeWidth={1.5}/>
                            +۵۰٬۰۰۰ راننده به ما اعتماد کرده‌اند
                        </p>
                    </div>
                </div>

                {/* Floating glass search bar — sibling to avoid overflow-hidden clipping */}
                <div className="relative z-20 -mt-16 mx-auto w-full max-w-3xl px-4">
                    <div className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-end shadow-xl border border-white/20">
                        <div className="flex-1 w-full">
                            <label className="text-label-sm text-on-surface-variant font-medium mb-1 block">
                                نوع خدمت
                            </label>
                            <select
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                className="w-full h-12 rounded-xl border border-outline-variant bg-surface/80 text-on-surface px-4 text-body-md appearance-none cursor-pointer focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            >
                                <option value="">همه خدمات</option>
                                {SERVICES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 w-full">
                            <label className="text-label-sm text-on-surface-variant font-medium mb-1 block">
                                موقعیت
                            </label>
                            <select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full h-12 rounded-xl border border-outline-variant bg-surface/80 text-on-surface px-4 text-body-md appearance-none cursor-pointer focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            >
                                <option value="">همه شهرها</option>
                                {CITIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleSearch}
                            className="shrink-0 cursor-pointer flex items-center justify-center gap-2 h-12 rounded-full bg-primary text-on-primary px-8 text-title-lg font-bold leading-normal transition-transform hover:scale-105 shadow-lg"
                        >
                            <Search className="size-5" strokeWidth={2}/>
                            جستجوی خدمات
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
