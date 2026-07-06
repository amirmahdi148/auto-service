import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { X, CalendarDays, Clock, MapPin, Store, CheckCircle2 } from "lucide-react";
import { HttpService } from "../../utils/HttpService.ts";
import type { ServiceItem } from "../../api/data/services.ts";
import type { Partner } from "../../types/handler.ts";

interface ServiceBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: ServiceItem | null;
}

const MOCK_DATES = [
    { id: "d1", dayName: "امروز", date: "۱۴۰۳/۰۴/۱۵" },
    { id: "d2", dayName: "فردا", date: "۱۴۰۳/۰۴/۱۶" },
    { id: "d3", dayName: "دوشنبه", date: "۱۴۰۳/۰۴/۱۷" },
    { id: "d4", dayName: "سه‌شنبه", date: "۱۴۰۳/۰۴/۱۸" },
    { id: "d5", dayName: "چهارشنبه", date: "۱۴۰۳/۰۴/۱۹" },
    { id: "d6", dayName: "پنج‌شنبه", date: "۱۴۰۳/۰۴/۲۰" },
];

const TIME_SLOTS = ["۰۹:۰۰", "۱۰:۰۰", "۱۱:۰۰", "۱۴:۰۰", "۱۵:۰۰", "۱۶:۰۰"];

export const ServiceBookingModal = ({ isOpen, onClose, service }: ServiceBookingModalProps) => {
    const [step, setStep] = useState(1);
    const [selectedCenterId, setSelectedCenterId] = useState<number | null>(null);
    const [selectedDateId, setSelectedDateId] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const { data: centers } = useQuery({
        queryKey: ["partners"],
        queryFn: () => HttpService.get<Partner[]>("/api/partners"),
        enabled: isOpen,
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // State resets via key prop on parent component

    const centerCities: Record<number, string> = useMemo(() => ({
        1: "تهران، خیابان ولیعصر",
        2: "تهران، سعادت‌آباد",
        3: "تهران، جاده مخصوص",
    }), []);

    const selectedCenter = centers?.find((c) => c.id === selectedCenterId) ?? null;

    const handleConfirm = async () => {
        if (!service || !selectedCenter) return;
        setSubmitting(true);
        try {
            await HttpService.post("/api/bookings", {
                body: {
                    serviceId: service.id,
                    serviceName: service.title,
                    centerId: selectedCenter.id,
                    centerName: selectedCenter.title,
                    date: MOCK_DATES.find((d) => d.id === selectedDateId)?.date,
                    time: selectedTime,
                },
            });
            setDone(true);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen || !service) return null;

    const canProceed = (s: number) => {
        if (s === 1) return selectedCenterId !== null;
        if (s === 2) return !!selectedDateId && !!selectedTime;
        return false;
    };

    if (done) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/40 backdrop-blur-sm p-4">
                <div className="w-full max-w-md bg-surface rounded-2xl shadow-xl border border-outline-variant p-8 flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <CheckCircle2 className="size-8" strokeWidth={1.5}/>
                    </div>
                    <h3 className="text-title-lg font-bold text-on-surface">رزرو با موفقیت ثبت شد</h3>
                    <p className="text-on-surface-variant text-body-md">
                        نوبت شما در {selectedCenter?.title} برای {service.title} ثبت شد. پیامکی حاوی جزئیات ارسال خواهد شد.
                    </p>
                    <button
                        onClick={onClose}
                        className="mt-4 h-11 px-8 rounded-xl bg-primary text-on-primary font-bold cursor-pointer hover:bg-primary/90 transition-colors text-label-lg"
                    >
                        باشه
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-surface rounded-2xl shadow-xl border border-outline-variant flex flex-col overflow-hidden max-h-[90vh]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant shrink-0">
                    <h2 className="text-title-lg font-bold text-on-surface">رزرو نوبت</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex flex-col gap-1">
                        <span className="text-label-sm text-on-surface-variant">خدمت انتخاب شده</span>
                        <span className="text-title-md font-bold text-on-surface">{service.title}</span>
                        <span className="text-label-sm text-on-surface-variant">{service.duration} • شروع از {service.fromPrice.toLocaleString("fa-IR")} ت</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 px-2">
                        {[
                            { s: 1, label: "مرکز" },
                            { s: 2, label: "زمان" },
                            { s: 3, label: "تایید" },
                        ].map((st, i) => (
                            <div key={st.s} className="flex items-center gap-2 flex-1 first:flex-initial last:flex-initial">
                                <div className={`flex flex-col items-center gap-1 min-w-[3rem] ${step >= st.s ? 'text-primary' : 'text-on-surface-variant'}`}>
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-label-sm ${step >= st.s ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                                        {st.s}
                                    </div>
                                    <span className="text-label-xs font-bold">{st.label}</span>
                                </div>
                                {i < 2 && (
                                    <div className={`flex-1 h-0.5 rounded-full ${step > st.s ? 'bg-primary' : 'bg-surface-container-high'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {step === 1 && (
                        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <p className="text-label-md font-bold text-on-surface flex items-center gap-1.5">
                                <Store className="size-4" /> مرکز خدماتی مورد نظر را انتخاب کنید
                            </p>
                            {centers?.map((center) => (
                                <div
                                    key={center.id}
                                    onClick={() => setSelectedCenterId(center.id)}
                                    className={`p-4 rounded-xl border cursor-pointer transition-colors flex items-start gap-3 ${
                                        selectedCenterId === center.id
                                            ? 'bg-primary/5 border-primary ring-1 ring-primary'
                                            : 'bg-surface border-outline-variant hover:border-primary/40'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${selectedCenterId === center.id ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                                        <Store className="size-5" strokeWidth={1.5} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-label-lg font-bold text-on-surface">{center.title}</span>
                                        <span className="text-label-sm text-on-surface-variant mt-0.5 flex items-center gap-1">
                                            <MapPin className="size-3" /> {centerCities[center.id] ?? center.description}
                                        </span>
                                        <span className="text-label-xs text-on-surface-variant mt-1">
                                            {center.tags.join(" • ")} • {"★".repeat(Math.round(center.rating))}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex flex-col gap-2">
                                <label className="text-label-md font-bold text-on-surface flex items-center gap-1.5">
                                    <CalendarDays className="size-4" /> تاریخ مراجعه
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {MOCK_DATES.map((d) => (
                                        <button
                                            key={d.id}
                                            onClick={() => setSelectedDateId(d.id)}
                                            className={`py-2 rounded-lg border flex flex-col items-center justify-center transition-colors ${
                                                selectedDateId === d.id
                                                    ? 'bg-primary text-on-primary border-primary'
                                                    : 'bg-surface border-outline-variant text-on-surface hover:border-primary/40'
                                            }`}
                                        >
                                            <span className="text-label-sm font-bold">{d.dayName}</span>
                                            <span className={`text-label-xs mt-1 ${selectedDateId === d.id ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>{d.date}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedDateId && (
                                <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant">
                                    <label className="text-label-md font-bold text-on-surface flex items-center gap-1.5">
                                        <Clock className="size-4" /> زمان مراجعه
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {TIME_SLOTS.map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setSelectedTime(t)}
                                                className={`h-10 rounded-lg border font-bold transition-colors text-label-md ${
                                                    selectedTime === t
                                                        ? 'bg-primary text-on-primary border-primary'
                                                        : 'bg-surface border-outline-variant text-on-surface hover:border-primary/40'
                                                }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {step === 3 && selectedCenter && (
                        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col gap-4">
                                <div className="flex items-center gap-2 pb-3 border-b border-outline-variant">
                                    <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                                        <Store className="size-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-label-lg font-bold text-on-surface">{selectedCenter.title}</span>
                                        <span className="text-label-xs text-on-surface-variant">{centerCities[selectedCenter.id] ?? selectedCenter.description}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center text-label-md text-on-surface-variant">
                                        <span>خدمت:</span>
                                        <span className="text-on-surface font-bold">{service.title}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-label-md text-on-surface-variant">
                                        <span>تاریخ:</span>
                                        <span className="text-on-surface font-bold">
                                            {MOCK_DATES.find((d) => d.id === selectedDateId)?.dayName} {MOCK_DATES.find((d) => d.id === selectedDateId)?.date}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-label-md text-on-surface-variant">
                                        <span>زمان:</span>
                                        <span className="text-on-surface font-bold">{selectedTime}</span>
                                    </div>

                                    <div className="flex justify-between items-center text-label-md border-t border-outline-variant pt-4 mt-1">
                                        <span className="text-on-surface font-bold">هزینه (تخمینی):</span>
                                        <span className="text-primary font-black text-title-lg">{service.fromPrice.toLocaleString("fa-IR")} <span className="text-label-sm font-normal">تومان</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant shrink-0 bg-surface">
                    {step > 1 ? (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="h-11 px-6 rounded-xl border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors text-label-lg font-bold cursor-pointer"
                        >
                            مرحله قبل
                        </button>
                    ) : (
                        <div />
                    )}

                    {step < 3 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            disabled={!canProceed(step)}
                            className="h-11 px-6 rounded-xl bg-primary text-on-primary hover:bg-primary-container disabled:opacity-50 disabled:pointer-events-none transition-colors text-label-lg font-bold cursor-pointer"
                        >
                            مرحله بعد
                        </button>
                    ) : (
                        <button
                            onClick={handleConfirm}
                            disabled={submitting}
                            className="h-11 px-6 rounded-xl bg-primary text-on-primary hover:bg-primary-container disabled:opacity-50 disabled:pointer-events-none transition-colors text-label-lg font-bold cursor-pointer"
                        >
                            {submitting ? "در حال ثبت..." : "تایید و ثبت نهایی"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
