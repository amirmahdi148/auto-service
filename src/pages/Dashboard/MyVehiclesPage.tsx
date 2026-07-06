import { useState } from "react";
import { CarFront, Plus, Pencil, Search, Settings2, Trash2, X, Save } from "lucide-react";

const USER_VEHICLES = [
    { id: 1, name: "پژو ۲۰۶", plate: "۱۲ ب ۳۴۵ ایران ۶۷", type: "سواری", year: "۱۳۹۸", lastService: "۲ ماه پیش", status: "ok" },
    { id: 2, name: "هایما S7", plate: "۹۸ د ۷۶۵ ایران ۱۱", type: "شاسی‌بلند", year: "۱۴۰۱", lastService: "۷ ماه پیش", status: "needs-service" },
    { id: 3, name: "تارا اتوماتیک", plate: "۴۵ ن ۱۲۳ ایران ۳۳", type: "سواری", year: "۱۴۰۲", lastService: "۱ ماه پیش", status: "ok" },
];

export const MyVehiclesPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: "", plate: "", type: "سواری", year: "" });

    const handleOpenAdd = () => {
        setFormData({ name: "", plate: "", type: "سواری", year: "" });
        setEditingId(null);
        setIsFormOpen(true);
    };

    const handleOpenEdit = (vehicle: typeof USER_VEHICLES[0]) => {
        setFormData({ name: vehicle.name, plate: vehicle.plate, type: vehicle.type, year: vehicle.year });
        setEditingId(vehicle.id);
        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingId(null);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-on-surface text-headline-md font-bold">خودروهای من</h1>
                    <span className="text-on-surface-variant text-label-md">مدیریت و مشاهده وضعیت خودروهای شما</span>
                </div>
                <button 
                    onClick={() => isFormOpen ? handleCloseForm() : handleOpenAdd()}
                    className="flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition-colors cursor-pointer shrink-0"
                >
                    {isFormOpen ? <X className="size-5" strokeWidth={2}/> : <Plus className="size-5" strokeWidth={2}/>}
                    {isFormOpen ? "انصراف" : "افزودن خودرو"}
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-surface border border-outline-variant rounded-2xl p-6 animate-in slide-in-from-top-4 fade-in duration-300">
                    <h2 className="text-title-lg font-bold text-on-surface mb-5">{editingId ? "ویرایش خودرو" : "ثبت خودرو جدید"}</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); handleCloseForm(); }}>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-label-sm font-bold text-on-surface-variant">نام خودرو</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="مثال: پژو ۲۰۶" className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-label-sm font-bold text-on-surface-variant">پلاک خودرو</label>
                            <input type="text" value={formData.plate} onChange={(e) => setFormData({...formData, plate: e.target.value})} placeholder="۱۲ ب ۳۴۵ ایران ۶۷" className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-label-sm font-bold text-on-surface-variant">نوع کاربری</label>
                            <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface">
                                <option value="سواری">سواری</option>
                                <option value="شاسی‌بلند">شاسی‌بلند</option>
                                <option value="وانت">وانت</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-label-sm font-bold text-on-surface-variant">سال ساخت / مدل</label>
                            <input type="text" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} placeholder="مثال: ۱۴۰۲" className="h-11 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                            <button type="button" onClick={handleCloseForm} className="h-11 px-6 rounded-xl border border-outline-variant text-on-surface font-bold hover:bg-surface-container-low transition-colors cursor-pointer">
                                انصراف
                            </button>
                            <button type="submit" className="flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition-colors cursor-pointer">
                                <Save className="size-5" strokeWidth={2}/>
                                {editingId ? "ثبت تغییرات" : "ذخیره خودرو"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute right-3.5 top-3 size-5 text-on-surface-variant" strokeWidth={1.5} />
                    <input 
                        type="text" 
                        placeholder="جستجوی خودرو..." 
                        className="w-full h-11 pl-4 pr-11 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface text-label-md"
                    />
                </div>
                <div className="relative">
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`flex items-center justify-center gap-2 h-11 px-4 rounded-xl border transition-colors cursor-pointer ${
                            isFilterOpen ? "bg-primary-container text-on-primary-container border-transparent" : "bg-surface border-outline-variant text-on-surface hover:bg-surface-container-low"
                        }`}
                    >
                        <Settings2 className={`size-5 ${isFilterOpen ? "" : "text-on-surface-variant"}`} strokeWidth={1.5}/>
                        فیلتر
                    </button>
                    {isFilterOpen && (
                        <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-56 bg-surface border border-outline-variant rounded-2xl shadow-lg z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-4 flex flex-col gap-4">
                                <span className="text-label-md font-bold text-on-surface-variant border-b border-outline-variant/50 pb-2">وضعیت خودرو</span>
                                <div className="flex flex-col gap-2">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" defaultChecked />
                                        <span className="text-label-md text-on-surface group-hover:text-primary transition-colors">مطلوب</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" defaultChecked />
                                        <span className="text-label-md text-on-surface group-hover:text-primary transition-colors">نیاز به بررسی</span>
                                    </label>
                                </div>
                                <span className="text-label-md font-bold text-on-surface-variant border-b border-outline-variant/50 pb-2 mt-2">نوع کاربری</span>
                                <div className="flex flex-col gap-2">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" defaultChecked />
                                        <span className="text-label-md text-on-surface group-hover:text-primary transition-colors">سواری</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" defaultChecked />
                                        <span className="text-label-md text-on-surface group-hover:text-primary transition-colors">شاسی‌بلند</span>
                                    </label>
                                </div>
                                <button onClick={() => setIsFilterOpen(false)} className="w-full h-9 rounded-lg bg-primary text-on-primary text-label-md font-bold mt-2 hover:bg-primary/90 transition-colors cursor-pointer">
                                    اعمال فیلتر
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {USER_VEHICLES.map((v) => (
                    <div key={v.id} className="flex flex-col bg-surface border border-outline-variant rounded-2xl overflow-hidden group hover:-translate-y-1 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.1)] transition-all duration-300">
                        <div className="flex items-start justify-between p-5 border-b border-outline-variant/50">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <CarFront className="size-7" strokeWidth={1.5}/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-on-surface text-title-lg font-bold group-hover:text-primary transition-colors">{v.name}</span>
                                    <span className="text-on-surface-variant text-label-sm">{v.type} • مدل {v.year}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleOpenEdit(v)}
                                title="ویرایش خودرو"
                                className="text-on-surface-variant hover:text-primary hover:bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <Pencil className="size-4"/>
                            </button>
                        </div>
                        <div className="p-5 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-on-surface-variant text-label-md">پلاک</span>
                                <span className="text-on-surface text-label-md font-bold px-3 py-1 rounded bg-surface-container-low border border-outline-variant">{v.plate}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-on-surface-variant text-label-md">آخرین سرویس</span>
                                <span className="text-on-surface text-label-md font-bold">{v.lastService}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-on-surface-variant text-label-md">وضعیت</span>
                                {v.status === "needs-service" ? (
                                    <span className="text-error text-label-sm font-bold bg-error/10 px-3 py-1 rounded-full">
                                        نیاز به بررسی
                                    </span>
                                ) : (
                                    <span className="text-primary text-label-sm font-bold bg-primary/10 px-3 py-1 rounded-full">
                                        مطلوب
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="mt-auto flex items-center border-t border-outline-variant/50 bg-surface-container-lowest divide-x divide-x-reverse divide-outline-variant/50">
                            <button className="flex-1 py-3 text-primary text-label-md font-bold hover:bg-primary/5 transition-colors cursor-pointer">
                                تاریخچه سرویس
                            </button>
                            <button className="flex items-center justify-center w-12 text-error hover:bg-error/5 transition-colors cursor-pointer">
                                <Trash2 className="size-4"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
