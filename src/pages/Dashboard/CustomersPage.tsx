import { useState } from "react";
import {
    Search,
    Phone,
    Car, 
    CalendarDays, 
    MoreHorizontal, 
    Plus,
    Filter,
    Download
} from "lucide-react";

const MOCK_CUSTOMERS = [
    { id: "1", name: "امیر ملکی", phone: "۰۹۱۲۳۴۵۶۷۸۹", vehicles: 2, totalVisits: 5, lastVisit: "۲ روز پیش", status: "active" },
    { id: "2", name: "سارا حسینی", phone: "۰۹۳۵۱۲۳۴۵۶۷", vehicles: 1, totalVisits: 1, lastVisit: "۱ ماه پیش", status: "active" },
    { id: "3", name: "علی کریمی", phone: "۰۹۱۵۹۸۷۶۵۴۳", vehicles: 3, totalVisits: 12, lastVisit: "۵ روز پیش", status: "active" },
    { id: "4", name: "محمد رضایی", phone: "۰۹۰۲۴۵۶۷۸۹۱", vehicles: 1, totalVisits: 0, lastVisit: "ثبت‌نام جدید", status: "inactive" },
    { id: "5", name: "زهرا احمدی", phone: "۰۹۱۹۱۱۱۲۲۳۳", vehicles: 2, totalVisits: 3, lastVisit: "۲ ماه پیش", status: "active" },
];

export const CustomersPage = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="flex flex-col gap-6">
            {/* ===================== HEADER ===================== */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-on-surface text-headline-md font-black">مشتریان</h1>
                        <span className="px-2 py-0.5 rounded-full bg-surface border border-outline-variant text-on-surface-variant text-label-sm font-bold tabular-nums">
                            ۵ مورد
                        </span>
                    </div>
                    <p className="text-on-surface-variant text-body-md">
                        لیست مشتریان و سوابق مراجعات آن‌ها
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 h-11 px-4 rounded-full bg-surface border border-outline-variant text-on-surface-variant hover:border-primary/30 hover:text-primary font-bold text-label-lg cursor-pointer transition-colors">
                        <Download className="size-4" strokeWidth={1.5}/>
                        <span className="hidden sm:inline">خروجی</span>
                    </button>
                    <button className="flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary-container transition-colors">
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
                            {MOCK_CUSTOMERS.map((c) => (
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
                                    <td className="px-5 py-3 text-left">
                                        <button aria-label="گزینه‌ها" className="inline-flex items-center justify-center w-8 h-8 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface cursor-pointer transition-colors">
                                            <MoreHorizontal className="size-5" strokeWidth={1.5}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile cards */}
                <div className="flex flex-col md:hidden divide-y divide-outline-variant">
                    {MOCK_CUSTOMERS.map((c) => (
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
                                <button className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high cursor-pointer transition-colors">
                                    <MoreHorizontal className="size-5"/>
                                </button>
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
        </div>
    );
};
