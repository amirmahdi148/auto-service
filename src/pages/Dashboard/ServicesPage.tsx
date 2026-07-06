import { useState } from "react";
import { 
    Wrench, 
    Search, 
    Plus, 
    Edit, 
    Trash2, 
    Clock, 
    Tag,
} from "lucide-react";
import { ModalWrapper } from "../../components/shared/ModalWrapper.tsx";

interface ServiceItem {
    id: string;
    name: string;
    duration: string;
    basePrice: number;
    status: "active" | "inactive";
}

const INITIAL_SERVICES: ServiceItem[] = [
    { id: "1", name: "تعویض روغن موتور و فیلترها", duration: "۴۵ دقیقه", basePrice: 450000, status: "active" },
    { id: "2", name: "تنظیم موتور و دیاگ", duration: "۱ ساعت", basePrice: 800000, status: "active" },
    { id: "3", name: "تعویض لنت ترمز", duration: "۳۰ دقیقه", basePrice: 350000, status: "active" },
    { id: "4", name: "شارژ گاز کولر", duration: "۴۰ دقیقه", basePrice: 600000, status: "inactive" },
    { id: "5", name: "سرویس دوره‌ای جامع", duration: "۲ ساعت", basePrice: 1500000, status: "active" },
];

const fmtToman = (n: number) => `${n.toLocaleString("fa-IR")} ت`;

export const ServicesPage = () => {
    const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
    const [search, setSearch] = useState("");
    
    // Modal states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingService, setEditingService] = useState<ServiceItem | null>(null);
    const [formData, setFormData] = useState({ name: "", duration: "", basePrice: "", status: "active" });

    // Delete confirmation state
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const filteredServices = services.filter(s => s.name.includes(search));

    // Form Handlers
    const handleOpenAdd = () => {
        setFormData({ name: "", duration: "", basePrice: "", status: "active" });
        setEditingService(null);
        setIsFormOpen(true);
    };

    const handleOpenEdit = (service: ServiceItem) => {
        setFormData({ 
            name: service.name, 
            duration: service.duration, 
            basePrice: service.basePrice.toString(), 
            status: service.status 
        });
        setEditingService(service);
        setIsFormOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const price = parseInt(formData.basePrice) || 0;
        
        if (editingService) {
            setServices(services.map(s => s.id === editingService.id ? { 
                ...s, 
                name: formData.name, 
                duration: formData.duration, 
                basePrice: price, 
                status: formData.status as "active" | "inactive" 
            } : s));
        } else {
            const newService: ServiceItem = {
                id: `srv-${Date.now()}-${Math.random().toString(36).substring(2, 11) || crypto.randomUUID().slice(0, 9)}`,
                name: formData.name,
                duration: formData.duration,
                basePrice: price,
                status: formData.status as "active" | "inactive"
            };
            setServices([newService, ...services]);
        }
        setIsFormOpen(false);
    };

    const handleDelete = () => {
        if (deletingId) {
            setServices(services.filter(s => s.id !== deletingId));
            setDeletingId(null);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {/* ===================== HEADER ===================== */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-on-surface text-headline-md font-black">مدیریت خدمات</h1>
                        <span className="px-2 py-0.5 rounded-full bg-surface border border-outline-variant text-on-surface-variant text-label-sm font-bold tabular-nums">
                            {filteredServices.length.toLocaleString("fa-IR")} مورد
                        </span>
                    </div>
                    <p className="text-on-surface-variant text-body-md">
                        خدمات قابل ارائه در مرکز خود را تعریف و ویرایش کنید
                    </p>
                </div>
                <button 
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary-container transition-colors shrink-0 self-start sm:self-auto"
                >
                    <Plus className="size-4" strokeWidth={2}/>
                    افزودن خدمت جدید
                </button>
            </div>

            {/* ===================== TOOLBAR ===================== */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute right-4 top-3.5 size-4 text-on-surface-variant" strokeWidth={1.5} />
                    <input 
                        type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="جستجوی عنوان خدمت..." 
                        className="w-full h-11 pl-4 pr-11 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface text-label-md"
                    />
                </div>
            </div>

            {/* ===================== LIST ===================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredServices.length > 0 ? filteredServices.map((s) => (
                    <div key={s.id} className="flex flex-col bg-surface border border-outline-variant rounded-2xl overflow-hidden group hover:-translate-y-1 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.1)] transition-all duration-300">
                        <div className="flex items-start justify-between p-5 border-b border-outline-variant/50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <Wrench className="size-5" strokeWidth={1.5}/>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-on-surface text-title-md font-bold group-hover:text-primary transition-colors line-clamp-1">{s.name}</span>
                                    <span className={`self-start inline-flex px-2 py-0.5 rounded-full text-label-xs font-bold ${s.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                                        {s.status === 'active' ? 'فعال' : 'غیرفعال'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 flex flex-col gap-3 flex-1">
                            <div className="flex items-center justify-between">
                                <span className="text-on-surface-variant text-label-md flex items-center gap-1.5"><Clock className="size-4" strokeWidth={1.5}/> زمان تخمینی</span>
                                <span className="text-on-surface text-label-md font-bold">{s.duration}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-on-surface-variant text-label-md flex items-center gap-1.5"><Tag className="size-4" strokeWidth={1.5}/> قیمت پایه</span>
                                <span className="text-on-surface text-label-md font-bold">{fmtToman(s.basePrice)}</span>
                            </div>
                        </div>
                        <div className="mt-auto flex items-center border-t border-outline-variant/50 bg-surface-container-lowest divide-x divide-x-reverse divide-outline-variant/50">
                            <button onClick={() => handleOpenEdit(s)} className="flex-1 flex items-center justify-center gap-2 py-3 text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer text-label-md font-bold">
                                <Edit className="size-4" strokeWidth={2}/>
                                ویرایش
                            </button>
                            <button onClick={() => setDeletingId(s.id)} className="flex items-center justify-center w-14 text-on-surface-variant hover:text-error hover:bg-error/5 transition-colors cursor-pointer">
                                <Trash2 className="size-4" strokeWidth={1.5}/>
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                        <Wrench className="size-10 text-on-surface-variant/50 mb-3" strokeWidth={1}/>
                        <span className="text-on-surface text-title-lg font-bold">خدمتی یافت نشد</span>
                        <span className="text-on-surface-variant text-label-md mt-1">با استفاده از دکمه افزودن، خدمات جدید تعریف کنید.</span>
                    </div>
                )}
            </div>

            {/* ===================== ADD/EDIT MODAL ===================== */}
            <ModalWrapper isOpen={isFormOpen} close={() => setIsFormOpen(false)}>
                <form onSubmit={handleSave} className="p-6 pt-5 flex flex-col gap-6">
                    <div className="flex items-center gap-3 border-b border-outline-variant/50 pb-4 pl-8">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            {editingService ? <Edit className="size-5" strokeWidth={1.5}/> : <Plus className="size-5" strokeWidth={2}/>}
                        </div>
                        <h2 className="text-title-lg font-bold text-on-surface">
                            {editingService ? "ویرایش خدمت" : "افزودن خدمت جدید"}
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-label-sm font-bold text-on-surface-variant">عنوان خدمت</label>
                            <input 
                                required
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="مثال: تعویض روغن موتور" 
                                className="h-11 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" 
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-sm font-bold text-on-surface-variant">قیمت پایه (تومان)</label>
                                <input 
                                    required
                                    type="number" 
                                    value={formData.basePrice}
                                    onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                                    placeholder="مثال: 500000" 
                                    className="h-11 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" 
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-sm font-bold text-on-surface-variant">زمان تخمینی</label>
                                <input 
                                    required
                                    type="text" 
                                    value={formData.duration}
                                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                    placeholder="مثال: ۴۵ دقیقه" 
                                    className="h-11 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" 
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-label-sm font-bold text-on-surface-variant">وضعیت</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="h-11 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface"
                            >
                                <option value="active">فعال (قابل رزرو)</option>
                                <option value="inactive">غیرفعال (موقتاً ناموجود)</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2 mt-2 border-t border-outline-variant/50">
                        <button type="button" onClick={() => setIsFormOpen(false)} className="h-11 px-6 rounded-xl text-on-surface-variant font-bold hover:bg-surface-container-high transition-colors cursor-pointer text-label-md">
                            انصراف
                        </button>
                        <button type="submit" className="h-11 px-8 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition-colors cursor-pointer text-label-md shadow-sm">
                            {editingService ? "ذخیره تغییرات" : "ثبت خدمت"}
                        </button>
                    </div>
                </form>
            </ModalWrapper>

            {/* ===================== DELETE CONFIRMATION ===================== */}
            <ModalWrapper isOpen={!!deletingId} close={() => setDeletingId(null)}>
                <div className="p-6 pt-8 flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center shrink-0 mb-2">
                        <Trash2 className="size-8" strokeWidth={1.5}/>
                    </div>
                    <h3 className="text-title-lg font-bold text-on-surface">حذف خدمت</h3>
                    <p className="text-on-surface-variant text-label-md max-w-[260px]">
                        آیا از حذف این خدمت اطمینان دارید؟ این عمل غیرقابل بازگشت است و از لیست رزرو مشتریان نیز حذف خواهد شد.
                    </p>
                    <div className="flex items-center w-full gap-3 mt-4">
                        <button onClick={() => setDeletingId(null)} className="flex-1 h-11 rounded-xl bg-surface border border-outline-variant text-on-surface font-bold hover:bg-surface-container-low transition-colors cursor-pointer text-label-md">
                            انصراف
                        </button>
                        <button onClick={handleDelete} className="flex-1 h-11 rounded-xl bg-error text-on-error font-bold hover:bg-error/90 transition-colors cursor-pointer text-label-md shadow-sm">
                            بله، حذف شود
                        </button>
                    </div>
                </div>
            </ModalWrapper>
        </div>
    );
};
