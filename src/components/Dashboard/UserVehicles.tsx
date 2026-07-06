import { CarFront, MoreHorizontal, Plus, AlertTriangle } from "lucide-react";

const VEHICLES = [
    { id: 1, name: "پژو ۲۰۶", plate: "۱۲ ب ۳۴۵ ایران ۶۷", status: "ok", lastService: "۲ ماه پیش" },
    { id: 2, name: "هایما S7", plate: "۹۸ د ۷۶۵ ایران ۱۱", status: "needs-service", lastService: "۷ ماه پیش" },
];

export const UserVehicles = () => (
    <div className="rounded-2xl bg-surface border border-outline-variant p-6">
        <div className="flex items-center justify-between mb-5">
            <h2 className="text-on-surface text-title-lg font-bold">خودروهای من</h2>
            <button className="text-primary text-label-sm font-bold flex items-center gap-1 hover:underline cursor-pointer">
                افزودن <Plus className="size-4" strokeWidth={2}/>
            </button>
        </div>
        
        <div className="flex flex-col gap-3">
            {VEHICLES.map((v) => (
                <div key={v.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low border border-transparent hover:border-outline-variant transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <CarFront className="size-6" strokeWidth={1.5}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-on-surface text-label-lg font-bold">{v.name}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-on-surface-variant text-label-sm px-2 py-0.5 rounded bg-surface-container border border-outline-variant">{v.plate}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        {v.status === "needs-service" ? (
                            <span className="flex items-center gap-1 text-error text-label-sm font-bold bg-error/10 px-2 py-1 rounded-full">
                                <AlertTriangle className="size-3.5"/> نیاز به سرویس
                            </span>
                        ) : (
                            <span className="text-primary text-label-sm font-bold bg-primary/10 px-2 py-1 rounded-full">
                                وضعیت مطلوب
                            </span>
                        )}
                        <button className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer">
                            <MoreHorizontal className="size-5"/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
