import { useState, useMemo, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Search,
    Phone,
    Car, 
    CalendarDays, 
    MoreHorizontal, 
    Plus,
    Filter,
    Download,
    Pencil,
    Trash2,
    Loader2,
    UserCheck,
} from "lucide-react";
import { HttpService } from "../../utils/HttpService";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import type { Customer } from "../../api/data/customers";

export const CustomersPage = () => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [formData, setFormData] = useState({ name: "", phone: "", vehicles: "1", status: "active" as "active" | "inactive" });
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const { data: customers = [] } = useQuery({
        queryKey: ["customers"],
        queryFn: () => HttpService.get<Customer[]>("/api/customers"),
    });

    const createMutation = useMutation({
        mutationFn: (data: typeof formData) => HttpService.post("/api/customers", { body: data }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: typeof formData }) =>
            HttpService.put(`/api/customers/${id}`, { body: data }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => HttpService.delete(`/api/customers/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
    });

    const filteredList = useMemo(() => {
        if (!search.trim()) return customers;
        const q = search.trim();
        return customers.filter((c) => c.name.includes(q) || c.phone.includes(q));
    }, [customers, search]);

    const handleOpenAdd = () => {
        setFormData({ name: "", phone: "", vehicles: "1", status: "active" });
        setEditingCustomer(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (customer: Customer) => {
        setFormData({
            name: customer.name,
            phone: customer.phone,
            vehicles: String(customer.vehicles),
            status: customer.status,
        });
        setEditingCustomer(customer);
        setIsModalOpen(true);
        setActiveMenu(null);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCustomer) {
            updateMutation.mutate({ id: editingCustomer.id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        if (deletingId) {
            deleteMutation.mutate(deletingId);
            setDeletingId(null);
            setActiveMenu(null);
        }
    };

    const handleExportCSV = () => {
        const headers = ["نام مشتری", "شماره تماس", "تعداد خودرو", "مراجعات", "آخرین مراجعه", "وضعیت"];
        const rows = filteredList.map((c) => [c.name, c.phone, String(c.vehicles), String(c.totalVisits), c.lastVisit, c.status === "active" ? "فعال" : "غیرفعال"]);
        const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `customers_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    return (
        <div className="flex flex-col gap-6">
            {/* ===================== HEADER ===================== */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-on-surface text-headline-md font-black">مشتریان</h1>
                        <span className="px-2 py-0.5 rounded-full bg-surface border border-outline-variant text-on-surface-variant text-label-sm font-bold tabular-nums">
                            {filteredList.length} مورد
                        </span>
                    </div>
                    <p className="text-on-surface-variant text-body-md">
                        لیست مشتریان و سوابق مراجعات آن‌ها
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 h-11 px-4 rounded-full bg-surface border border-outline-variant text-on-surface-variant hover:border-primary/30 hover:text-primary font-bold text-label-lg cursor-pointer transition-colors"
                    >
                        <Download className="size-4" strokeWidth={1.5}/>
                        <span className="hidden sm:inline">خروجی</span>
                    </button>
                    <button 
                        onClick={handleOpenAdd}
                        className="flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary-container transition-colors"
                    >
                        <Plus className="size-4" strokeWidth={2}/>
                        <span className="hidden sm:inline">افزودن مشتری</span>
                        <span className="sm:hidden">جدید</span>
                    </button>
                </div>
            </div>

            {/* ===================== TOOLBAR ===================== */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute right-4 top-3.5 size-4 text-on-surface-variant" strokeWidth={1.5} />
                    <input 
                        type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="جستجوی مشتری بر اساس نام یا شماره تماس..." 
                        className="w-full h-11 pl-4 pr-11 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface text-label-md"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-surface border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer shrink-0">
                    <Filter className="size-4 text-on-surface-variant" strokeWidth={1.5}/>
                    فیلترها
                </button>
            </div>

            {/* ===================== TABLE / LIST ===================== */}
            <div className="rounded-2xl bg-surface border border-outline-variant overflow-hidden">
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="text-on-surface-variant text-label-sm bg-surface-container-low">
                                <th className="font-bold px-5 py-3">نام مشتری</th>
                                <th className="font-bold px-5 py-3">شماره تماس</th>
                                <th className="font-bold px-5 py-3">تعداد خودرو</th>
                                <th className="font-bold px-5 py-3">مراجعات</th>
                                <th className="font-bold px-5 py-3">وضعیت</th>
                                <th className="font-bold px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                            {filteredList.map((c) => (
                                <tr key={c.id} className="hover:bg-surface-container-low transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-lg font-bold shrink-0">
                                                {c.name.charAt(0)}
                                            </div>
                                            <span className="text-on-surface text-label-lg font-bold">{c.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-on-surface-variant text-label-lg whitespace-nowrap" dir="ltr">
                                        {c.phone}
                                    </td>
                                    <td className="px-5 py-3 text-on-surface text-label-lg whitespace-nowrap">
                                        <div className="flex items-center gap-1.5">
                                            <Car className="size-4 text-on-surface-variant"/>
                                            {c.vehicles} خودرو
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-on-surface text-label-lg">{c.totalVisits} بار</span>
                                            <span className="text-on-surface-variant text-label-sm flex items-center gap-1">
                                                <CalendarDays className="size-3" strokeWidth={1.5}/> {c.lastVisit}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        {c.status === "active" ? (
                                            <span className="inline-flex px-2.5 py-1 rounded-full text-label-sm font-bold bg-primary/10 text-primary">
                                                فعال
                                            </span>
                                        ) : (
                                            <span className="inline-flex px-2.5 py-1 rounded-full text-label-sm font-bold bg-surface-container-highest text-on-surface-variant">
                                                غیرفعال
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3 text-left relative">
                                        <button 
                                            onClick={() => setActiveMenu(activeMenu === c.id ? null : c.id)}
                                            aria-label="گزینه‌ها" 
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface cursor-pointer transition-colors"
                                        >
                                            <MoreHorizontal className="size-5" strokeWidth={1.5}/>
                                        </button>
                                        {activeMenu === c.id && (
                                            <div ref={menuRef} className="absolute left-5 top-full mt-1 z-20 min-w-36 bg-surface border border-outline-variant rounded-xl shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                                                <button onClick={() => handleOpenEdit(c)} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer flex items-center gap-2">
                                                    <Pencil className="size-4"/> ویرایش
                                                </button>
                                                <div className="h-px bg-outline-variant/50 my-1 mx-1" />
                                                <button onClick={() => { setDeletingId(c.id); setActiveMenu(null); }} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-error hover:bg-error/5 transition-colors cursor-pointer flex items-center gap-2">
                                                    <Trash2 className="size-4"/> حذف
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile cards */}
                <div className="flex flex-col md:hidden divide-y divide-outline-variant">
                    {filteredList.map((c) => (
                        <div key={c.id} className="p-4 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-title-md font-bold shrink-0">
                                        {c.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-on-surface text-title-md font-bold">{c.name}</span>
                                        <span className="text-on-surface-variant text-label-md mt-0.5 flex items-center gap-1.5" dir="ltr">
                                            {c.phone} <Phone className="size-3"/>
                                        </span>
                                    </div>
                                </div>
                                <div className="relative">
                                    <button 
                                        onClick={() => setActiveMenu(activeMenu === c.id ? null : c.id)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high cursor-pointer transition-colors"
                                    >
                                        <MoreHorizontal className="size-5"/>
                                    </button>
                                    {activeMenu === c.id && (
                                        <div ref={menuRef} className="absolute left-0 top-full mt-1 z-20 min-w-36 bg-surface border border-outline-variant rounded-xl shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                                            <button onClick={() => handleOpenEdit(c)} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer flex items-center gap-2">
                                                <Pencil className="size-4"/> ویرایش
                                            </button>
                                            <div className="h-px bg-outline-variant/50 my-1 mx-1" />
                                            <button onClick={() => { setDeletingId(c.id); setActiveMenu(null); }} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-error hover:bg-error/5 transition-colors cursor-pointer flex items-center gap-2">
                                                <Trash2 className="size-4"/> حذف
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/50">
                                <div className="flex flex-col gap-1">
                                    <span className="text-on-surface-variant text-label-sm">تعداد خودرو</span>
                                    <span className="text-on-surface text-label-md font-bold flex items-center gap-1.5">
                                        <Car className="size-4 text-primary"/> {c.vehicles} عدد
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-on-surface-variant text-label-sm">مجموع مراجعات</span>
                                    <span className="text-on-surface text-label-md font-bold flex items-center gap-1.5">
                                        <CalendarDays className="size-4 text-primary"/> {c.totalVisits} بار
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===================== ADD/EDIT MODAL ===================== */}
            <ModalWrapper isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
                <form onSubmit={handleSave} className="p-6 pt-5 flex flex-col gap-6">
                    <div className="flex items-center gap-3 border-b border-outline-variant/50 pb-4 pl-8">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <UserCheck className="size-5" strokeWidth={1.5}/>
                        </div>
                        <h2 className="text-title-lg font-bold text-on-surface">
                            {editingCustomer ? "ویرایش اطلاعات مشتری" : "افزودن مشتری جدید"}
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-label-sm font-bold text-on-surface-variant">نام و نام خانوادگی</label>
                            <input 
                                required
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="مثال: علی رضایی" 
                                className="h-11 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" 
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-label-sm font-bold text-on-surface-variant">شماره تماس</label>
                            <input 
                                required
                                type="text"
                                dir="ltr"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
                                className="h-11 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" 
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-sm font-bold text-on-surface-variant">تعداد خودروها</label>
                                <input 
                                    required
                                    type="number" 
                                    value={formData.vehicles}
                                    onChange={(e) => setFormData({...formData, vehicles: e.target.value})}
                                    placeholder="1" 
                                    className="h-11 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface" 
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-label-sm font-bold text-on-surface-variant">وضعیت</label>
                                <select 
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value as "active" | "inactive"})}
                                    className="h-11 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface"
                                >
                                    <option value="active">فعال</option>
                                    <option value="inactive">غیرفعال</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2 mt-2 border-t border-outline-variant/50">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="h-11 px-6 rounded-xl text-on-surface-variant font-bold hover:bg-surface-container-high transition-colors cursor-pointer text-label-md">
                            انصراف
                        </button>
                        <button type="submit" disabled={isPending} className="flex items-center gap-2 h-11 px-8 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors cursor-pointer text-label-md shadow-sm">
                            {isPending && <Loader2 className="size-4 animate-spin" strokeWidth={2}/>}
                            {editingCustomer ? "ذخیره تغییرات" : "ثبت مشتری"}
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
                    <h3 className="text-title-lg font-bold text-on-surface">حذف مشتری</h3>
                    <p className="text-on-surface-variant text-label-md max-w-[260px]">
                        آیا از حذف این مشتری اطمینان دارید؟ این عمل غیرقابل بازگشت است.
                    </p>
                    <div className="flex items-center w-full gap-3 mt-4">
                        <button onClick={() => setDeletingId(null)} className="flex-1 h-11 rounded-xl bg-surface border border-outline-variant text-on-surface font-bold hover:bg-surface-container-low transition-colors cursor-pointer text-label-md">
                            انصراف
                        </button>
                        <button onClick={handleDelete} disabled={deleteMutation.isPending} className="flex-1 h-11 rounded-xl bg-error text-on-error font-bold hover:bg-error/90 disabled:opacity-50 transition-colors cursor-pointer text-label-md shadow-sm">
                            {deleteMutation.isPending ? <Loader2 className="size-4 animate-spin inline" strokeWidth={2}/> : null}
                            بله، حذف شود
                        </button>
                    </div>
                </div>
            </ModalWrapper>
        </div>
    );
};
