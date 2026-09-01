import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Loader2 } from "lucide-react";
import { HttpService } from "../../utils/HttpService";
import type { Booking } from "../../api/data/bookings";

const STATUS_META: Record<string, { label: string; cls: string }> = {
    "completed": { label: "تکمیل‌شده", cls: "bg-primary/10 text-primary" },
    "in-progress": { label: "در حال انجام", cls: "bg-tertiary-container/30 text-on-tertiary-fixed-variant" },
    "confirmed": { label: "تأیید شده", cls: "bg-primary/10 text-primary" },
    "pending": { label: "در انتظار", cls: "bg-secondary/10 text-secondary" },
    "cancelled": { label: "لغوشده", cls: "bg-error/10 text-error" },
};

const fmtToman = (n: number) => `${n.toLocaleString("fa-IR")} ت`;

export const RecentBookings = () => {
    const { data: bookings = [] } = useQuery({
        queryKey: ["recent-bookings"],
        queryFn: () => {
            return HttpService.get<{ data: Booking[]; meta: { totalPages: number; totalItems: number } }>("/api/bookings", { params: { page: 1, limit: 5 } });
        },
        select: (res) => res.data,
    });

    return (
        <div className="lg:col-span-2 rounded-2xl bg-surface border border-outline-variant p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-on-surface text-title-lg font-bold">رزروهای اخیر</h2>
                <button className="text-primary text-label-sm font-bold cursor-pointer hover:underline flex items-center gap-0.5">
                    مشاهده همه <ChevronLeft className="size-3.5" strokeWidth={2}/>
                </button>
            </div>

            {bookings.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                    <Loader2 className="size-6 animate-spin text-on-surface-variant" />
                </div>
            ) : (
                <>
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="text-on-surface-variant text-label-sm">
                                    <th className="font-bold pb-3">مشتری</th>
                                    <th className="font-bold pb-3">خدمت</th>
                                    <th className="font-bold pb-3">تاریخ</th>
                                    <th className="font-bold pb-3">مبلغ</th>
                                    <th className="font-bold pb-3">وضعیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((b) => (
                                    <tr key={b.id} className="border-t border-outline-variant hover:bg-surface-container-low transition-colors">
                                        <td className="py-3 pl-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-sm font-bold shrink-0">
                                                    {b.customer.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-on-surface text-label-lg font-bold">{b.customer}</span>
                                                    <span className="text-on-surface-variant text-label-sm">{b.vehicle}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 pl-2 text-on-surface-variant text-label-lg">{b.service}</td>
                                        <td className="py-3 pl-2 text-on-surface-variant text-label-lg whitespace-nowrap">{b.date}</td>
                                        <td className="py-3 pl-2 text-on-surface text-label-lg font-bold whitespace-nowrap">{fmtToman(b.amount)}</td>
                                        <td className="py-3">
                                            <span className={`px-2.5 py-1 rounded-full text-label-sm font-bold ${(STATUS_META[b.status] || STATUS_META.pending).cls}`}>
                                                {(STATUS_META[b.status] || STATUS_META.pending).label}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 md:hidden">
                        {bookings.map((b) => (
                            <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low">
                                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-lg font-bold shrink-0">
                                    {b.customer.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-on-surface text-label-lg font-bold truncate">{b.customer}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-label-xs font-bold shrink-0 ${(STATUS_META[b.status] || STATUS_META.pending).cls}`}>
                                            {(STATUS_META[b.status] || STATUS_META.pending).label}
                                        </span>
                                    </div>
                                    <span className="text-on-surface-variant text-label-sm truncate">{b.service} — {b.vehicle}</span>
                                    <div className="flex items-center justify-between gap-2 mt-0.5">
                                        <span className="text-on-surface-variant text-label-sm">{b.date}</span>
                                        <span className="text-on-surface text-label-sm font-bold">{fmtToman(b.amount)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
