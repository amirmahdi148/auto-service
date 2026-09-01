import {useInView} from "../../utils/useInView";
import {UserCheck, Image} from "lucide-react";

const TEAM = [
    { name: "رادمان آریا", role: "مدیرعامل و بنیان‌گذار", desc: "بیش از دو دهه تجربه در صنعت خدمات خودرو و فناوری." },
    { name: "سارا نیک‌زاد", role: "مدیر تجربه مشتریان", desc: "متخصص طراحی تجربه کاربری و بهبود مستمر کیفیت خدمات." },
    { name: "کیوان سرمد", role: "مدیر عملیات", desc: "مسئول توسعه شبکه مراکز همکار و تضمین کیفیت خدمات." },
];

const SectionHeading = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) => (
    <div className="flex flex-col items-center text-center gap-3">
        <span className="w-fit px-4 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-bold tracking-wide">{eyebrow}</span>
        <h2 className="text-on-surface text-headline-lg font-black leading-tight max-w-[720px]">{title}</h2>
        {subtitle && <p className="text-on-surface-variant text-body-lg font-normal leading-normal max-w-[720px]">{subtitle}</p>}
    </div>
);

export const TeamSection = () => {
    const { ref, inView } = useInView<HTMLDivElement>(0.15);

    return (
        <section ref={ref} className="px-4">
            <div className={`mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <SectionHeading eyebrow="تیم ما" title="تیم متخصص اتو پلاس" subtitle="ترکیبی از تجربه صنعت خدمات خودرو و دانش فناوری روز."/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-container-max-width mx-auto w-full">
                {TEAM.map((member, i) => (
                    <div
                        key={member.name}
                        className={`group flex flex-col items-center text-center bg-surface rounded-[2rem] p-8 border border-outline-variant hover:border-primary/30 hover:shadow-lg transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                        style={{ transitionDelay: `${i * 150}ms` }}
                    >
                        <div className="relative w-28 h-28 mb-5">
                            <div className="absolute inset-0 bg-primary/10 rounded-full group-hover:scale-110 transition-transform duration-500"/>
                            <div className="absolute inset-0 m-2 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-headline-lg font-black border-4 border-surface">
                                {member.name.charAt(0)}
                            </div>
                        </div>
                        <h4 className="text-on-surface text-title-lg font-bold">{member.name}</h4>
                        <p className="text-secondary font-medium text-label-lg mb-3">{member.role}</p>
                        <p className="text-on-surface-variant text-body-md leading-relaxed mb-4">{member.desc}</p>
                        <div className="flex items-center gap-3">
                            <a href="#" aria-label="شبکه حرفه‌ای" className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors">
                                <UserCheck className="size-4" strokeWidth={1.5}/>
                            </a>
                            <a href="#" aria-label="شبکه اجتماعی" className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors">
                                <Image className="size-4" strokeWidth={1.5}/>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};