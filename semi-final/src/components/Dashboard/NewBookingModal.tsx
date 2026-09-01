import { useState, useMemo, useEffect } from "react";
import { X, CalendarDays, Clock, CarFront, Wrench, Search, MapPin, Store, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpService } from "../../utils/HttpService";
import { useAuth } from "../../contexts/useAuth.ts";

interface NewBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MOCK_PROVIDERS = [
    { 
        id: "p1", 
        name: "اتو سرویس تهران", 
        address: "تهران، خیابان آزادی", 
        services: [
            { id: "s1", name: "تعویض روغن", price: "۸۰۰,۰۰۰" }, 
            { id: "s2", name: "سرویس دوره‌ای", price: "۱,۵۰۰,۰۰۰" }
        ] 
    },
    { 
        id: "p2", 
        name: "مکانیکی برادران", 
        address: "کرج، مهرشهر", 
        services: [
            { id: "s1", name: "تعویض روغن", price: "۷۵۰,۰۰۰" }, 
            { id: "s3", name: "تعمیر جلوبندی", price: "۳,۲۰۰,۰۰۰" }
        ] 
    },
    { 
        id: "p3", 
        name: "تعمیرگاه مرکزی ایران‌خودرو", 
        address: "تهران، جاده مخصوص", 
        services: [
            { id: "s2", name: "سرویس دوره‌ای", price: "۱,۲۰۰,۰۰۰" }, 
            { id: "s4", name: "عیب‌یابی موتور", price: "۵۰۰,۰۰۰" }
        ] 
    }
];

const MOCK_DATES = [
    { id: "d1", dayName: "امروز", date: "۱۴۰۳/۰۴/۱۵" },
    { id: "d2", dayName: "فردا", date: "۱۴۰۳/۰۴/۱۶" },
    { id: "d3", dayName: "دوشنبه", date: "۱۴۰۳/۰۴/۱۷" },
    { id: "d4", dayName: "سه‌شنبه", date: "۱۴۰۳/۰۴/۱۸" },
    { id: "d5", dayName: "چهارشنبه", date: "۱۴۰۳/۰۴/۱۹" },
    { id: "d6", dayName: "پنج‌شنبه", date: "۱۴۰۳/۰۴/۲۰" },
];

export const NewBookingModal = ({ isOpen, onClose }: NewBookingModalProps) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [step, setStep] = useState(1);
    const [searchProvider, setSearchProvider] = useState("");
    
    // Selections
    const [selectedProviderId, setSelectedProviderId] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [selectedServiceId, setSelectedServiceId] = useState("");
    const [selectedDateId, setSelectedDateId] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    // Fetch user's registered vehicles
    const { data: vehicles = [], isLoading: isVehiclesLoading } = useQuery({
        queryKey: ["vehicles"],
        queryFn: () => HttpService.get<any[]>("/api/vehicles"),
        enabled: isOpen,
    });

    const bookingMutation = useMutation({
        mutationFn: (body: any) => HttpService.post("/api/bookings", { body }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-user-kpis"] });
            onClose();
            setStep(1);
            // Reset selection states
            setSelectedProviderId("");
            setSelectedVehicle("");
            setSelectedServiceId("");
            setSelectedDateId("");
            setSelectedTime("");
        }
    });

    const filteredProviders = useMemo(() => {
        return MOCK_PROVIDERS.filter(p => p.name.includes(searchProvider) || p.address.includes(searchProvider));
    }, [searchProvider]);

    const selectedProvider = MOCK_PROVIDERS.find(p => p.id === selectedProviderId);
    const selectedService = selectedProvider?.services.find(s => s.id === selectedServiceId);
    const selectedDateObj = MOCK_DATES.find(d => d.id === selectedDateId);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleNext = () => {
        if (step === 1 && !selectedProviderId) return;
        if (step === 2 && (!selectedVehicle || !selectedServiceId)) return;
        if (step === 3 && (!selectedDateId || !selectedTime)) return;
        setStep(step + 1);
    };

    const isNextDisabled = () => {
        if (step === 1 && !selectedProviderId) return true;
        if (step === 2 && (!selectedVehicle || !selectedServiceId)) return true;
        if (step === 3 && (!selectedDateId || !selectedTime)) return true;
        return false;
    };

    const handleFinalConfirm = () => {
        const costAmount = selectedService?.price ? Number(selectedService.price.replace(/,/g, "")) : 0;
        const [vName, vPlate] = selectedVehicle.split(" - ");
        
        bookingMutation.mutate({
            customer: user?.name || "کاربر اتو پلاس",
            phone: user?.phone || "---",
            service: selectedService?.name || "",
            vehicle: vName || "",
            plate: vPlate || "---",
            center: selectedProvider?.name || "",
            date: selectedDateObj?.date || "",
            dateISO: selectedDateObj?.date 
                ? selectedDateObj.date.replace(/\//g, "-") // simple convert YYYY/MM/DD to YYYY-MM-DD
                : new Date().toISOString().slice(0, 10),
            time: selectedTime,
            amount: costAmount,
            status: "pending"
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-surface rounded-2xl shadow-xl border border-outline-variant flex flex-col overflow-hidden max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant shrink-0">
                    <h2 className="text-title-lg font-bold text-on-surface">ثبت رزرو جدید</h2>
                    <button 
                        onClick={() => { onClose(); setStep(1); }}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
                    {/* Stepper */}
                    <div className="flex items-center justify-between gap-2 px-2">
                        {[
                            { s: 1, label: "مرکز" },
                            { s: 2, label: "خدمت" },
                            { s: 3, label: "زمان" },
                            { s: 4, label: "تایید" }
                        ].map((st, i) => (
                            <div key={st.s} className="flex items-center gap-2 flex-1 first:flex-initial last:flex-initial">
                                <div className={`flex flex-col items-center gap-1 min-w-[3rem] ${step >= st.s ? 'text-primary' : 'text-on-surface-variant'}`}>
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-label-sm ${step >= st.s ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                                        {st.s}
                                    </div>
                                    <span className="text-label-xs font-bold">{st.label}</span>
                                </div>
                                {i < 3 && (
                                    <div className={`flex-1 h-0.5 rounded-full ${step > st.s ? 'bg-primary' : 'bg-surface-container-high'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {step === 1 && (
                        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="relative">
                                <Search className="absolute right-4 top-3.5 size-4 text-on-surface-variant" strokeWidth={1.5} />
                                <input 
                                    type="text" 
                                    value={searchProvider}
                                    onChange={(e) => setSearchProvider(e.target.value)}
                                    placeholder="جستجوی مرکز خدماتی..." 
                                    className="w-full h-11 pl-4 pr-11 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface text-label-md"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                {filteredProviders.map(provider => (
                                    <div 
                                        key={provider.id}
                                        onClick={() => setSelectedProviderId(provider.id)}
                                        className={`p-4 rounded-xl border cursor-pointer transition-colors flex items-start gap-3 ${
                                            selectedProviderId === provider.id 
                                                ? 'bg-primary/5 border-primary ring-1 ring-primary' 
                                                : 'bg-surface border-outline-variant hover:border-primary/40'
                                        }`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${selectedProviderId === provider.id ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                                            <Store className="size-5" strokeWidth={1.5} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-label-lg font-bold text-on-surface">{provider.name}</span>
                                            <span className="text-label-sm text-on-surface-variant mt-0.5 flex items-center gap-1">
                                                <MapPin className="size-3" /> {provider.address}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {filteredProviders.length === 0 && (
                                    <div className="text-center py-6 text-on-surface-variant text-label-md">
                                        مرکزی یافت نشد.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 2 && selectedProvider && (
                        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant mb-2">
                                <span className="text-label-sm text-on-surface-variant">مرکز انتخاب شده:</span>
                                <div className="text-label-md font-bold text-on-surface">{selectedProvider.name}</div>
                            </div>
                            
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-md font-bold text-on-surface flex items-center gap-1.5">
                                    <CarFront className="size-4" /> انتخاب خودرو
                                </label>
                                <select 
                                    value={selectedVehicle}
                                    onChange={(e) => setSelectedVehicle(e.target.value)}
                                    disabled={isVehiclesLoading}
                                    className="w-full h-11 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface text-label-md disabled:opacity-50"
                                >
                                    <option value="">{isVehiclesLoading ? "در حال بارگذاری خودروها..." : "یک خودرو انتخاب کنید..."}</option>
                                    {vehicles.map((v) => (
                                        <option key={v.id} value={`${v.name} - ${v.plate}`}>{v.name} - {v.plate}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5 mt-2">
                                <label className="text-label-md font-bold text-on-surface flex items-center gap-1.5">
                                    <Wrench className="size-4" /> انتخاب خدمت
                                </label>
                                <div className="flex flex-col gap-2">
                                    {selectedProvider.services.map(service => (
                                        <div 
                                            key={service.id}
                                            onClick={() => setSelectedServiceId(service.id)}
                                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                                                selectedServiceId === service.id 
                                                    ? 'bg-primary/5 border-primary ring-1 ring-primary' 
                                                    : 'bg-surface border-outline-variant hover:border-primary/40'
                                            }`}
                                        >
                                            <span className="text-label-md font-bold text-on-surface">{service.name}</span>
                                            <span className="text-label-sm text-primary font-bold">{service.price} تومان</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex flex-col gap-2">
                                <label className="text-label-md font-bold text-on-surface flex items-center gap-1.5">
                                    <CalendarDays className="size-4" /> تاریخ مراجعه (تقویم شمسی)
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {MOCK_DATES.map(d => (
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
                                        {["۰۹:۰۰", "۱۰:۰۰", "۱۱:۰۰", "۱۴:۰۰", "۱۵:۰۰", "۱۶:۰۰"].map(t => (
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

                    {step === 4 && selectedProvider && selectedService && selectedDateObj && (
                        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col gap-4">
                                <div className="flex items-center gap-2 pb-3 border-b border-outline-variant">
                                    <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                                        <Store className="size-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-label-lg font-bold text-on-surface">{selectedProvider.name}</span>
                                        <span className="text-label-xs text-on-surface-variant">{selectedProvider.address}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center text-label-md text-on-surface-variant">
                                        <span>خودرو:</span>
                                        <span className="text-on-surface font-bold">{selectedVehicle}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-label-md text-on-surface-variant">
                                        <span>خدمت:</span>
                                        <span className="text-on-surface font-bold">{selectedService.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-label-md text-on-surface-variant">
                                        <span>زمان مراجعه:</span>
                                        <span className="text-on-surface font-bold">{selectedDateObj.dayName} {selectedDateObj.date} - ساعت {selectedTime}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center text-label-md border-t border-outline-variant pt-4 mt-1">
                                        <span className="text-on-surface font-bold">هزینه (تخمینی):</span>
                                        <span className="text-primary font-black text-title-lg">{selectedService.price} <span className="text-label-sm font-normal">تومان</span></span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-label-sm text-on-surface-variant text-center px-4">
                                با ثبت نهایی رزرو، پیامکی حاوی جزئیات نوبت برای شما ارسال خواهد شد.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant shrink-0 bg-surface">
                    {step > 1 ? (
                        <button 
                            onClick={() => setStep(step - 1)}
                            disabled={bookingMutation.isPending}
                            className="h-11 px-6 rounded-xl border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors text-label-lg font-bold cursor-pointer disabled:opacity-50"
                        >
                            مرحله قبل
                        </button>
                    ) : (
                        <div />
                    )}
                    
                    {step < 4 ? (
                        <button 
                            onClick={handleNext}
                            disabled={isNextDisabled()}
                            className="h-11 px-6 rounded-xl bg-primary text-on-primary hover:bg-primary-container disabled:opacity-50 disabled:pointer-events-none transition-colors text-label-lg font-bold cursor-pointer"
                        >
                            مرحله بعد
                        </button>
                    ) : (
                        <button 
                            onClick={handleFinalConfirm}
                            disabled={bookingMutation.isPending}
                            className="h-11 px-6 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-colors text-label-lg font-bold cursor-pointer flex items-center gap-2 disabled:opacity-50"
                        >
                            {bookingMutation.isPending && <Loader2 className="size-4 animate-spin" />}
                            {bookingMutation.isPending ? "در حال ثبت..." : "تایید و ثبت نهایی"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
