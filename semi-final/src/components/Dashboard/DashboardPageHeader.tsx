import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Bell, CalendarPlus, Sparkles, X } from "lucide-react";
import { HttpService } from "../../utils/HttpService";
import type { Notification } from "../../api/data/notifications";

interface DashboardPageHeaderProps {
    onNewBooking?: () => void;
}

export const DashboardPageHeader = ({ onNewBooking }: DashboardPageHeaderProps) => {
    const navigate = useNavigate();
    const [searchVal, setSearchVal] = useState("");
    const [notifOpen, setNotifOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);

    const { data: notifications = [] } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => HttpService.get<Notification[]>("/api/notifications"),
    });

    const queryClient = useQueryClient();
    const markReadMutation = useMutation({
        mutationFn: (id: string) => HttpService.put(`/api/notifications/${id}/read`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
    });

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setNotifOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchVal.trim()) {
            navigate(`/dashboard/bookings?search=${encodeURIComponent(searchVal.trim())}`);
        }
    };

    return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
                <h1 className="text-on-surface text-headline-md font-black">داشبورد مدیریت</h1>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm font-bold">
                    <Sparkles className="size-3"/> اتو پلاس
                </span>
            </div>
            <p className="text-on-surface-variant text-body-md">یکشنبه، ۱ تیر ۱۴۰۵ — خلاصه عملکرد کسب‌وکار شما</p>
        </div>

        <div className="flex items-center gap-2">
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center gap-2 h-11 px-4 rounded-full bg-surface border border-outline-variant">
                <Search className="size-4 text-on-surface-variant" strokeWidth={1.5}/>
                <input
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="جستجو..."
                    className="bg-transparent outline-none text-on-surface placeholder:text-on-surface-variant text-label-lg w-32"
                />
                {searchVal && (
                    <button type="button" onClick={() => setSearchVal("")} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                        <X className="size-3.5" strokeWidth={2}/>
                    </button>
                )}
            </form>

            <div className="relative" ref={notifRef}>
                <button
                    onClick={() => setNotifOpen(!notifOpen)}
                    aria-label="اعلان‌ها"
                    className="relative flex items-center justify-center w-11 h-11 rounded-full bg-surface border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors cursor-pointer"
                >
                    <Bell className="size-5" strokeWidth={1.5}/>
                    {notifications.some((n) => !n.isRead) && (
                        <span className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-secondary"/>
                    )}
                </button>
                {notifOpen && (
                    <div className="absolute left-0 top-full mt-2 z-30 min-w-72 bg-surface border border-outline-variant rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-4 py-2 border-b border-outline-variant/50">
                            <span className="text-label-lg font-bold text-on-surface">اعلان‌ها</span>
                        </div>
                        {notifications.length === 0 ? (
                            <div className="px-4 py-6 text-center text-on-surface-variant text-label-md">اعلانی وجود ندارد</div>
                        ) : (
                            notifications.map((n) => (
                                <button key={n.id} onClick={() => { if (!n.isRead) markReadMutation.mutate(n.id); }} className="w-full text-right px-4 py-3 hover:bg-surface-container-low transition-colors cursor-pointer border-b border-outline-variant/30 last:border-0">
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.isRead ? 'bg-outline-variant' : 'bg-secondary'}`} />
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <span className={`text-label-md ${n.isRead ? 'text-on-surface-variant' : 'text-on-surface font-bold'}`}>{n.title}</span>
                                            <span className="text-label-sm text-on-surface-variant line-clamp-1">{n.message}</span>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>

            <button
                onClick={onNewBooking}
                className="flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary-container transition-colors"
            >
                <CalendarPlus className="size-4" strokeWidth={1.5}/>
                <span className="hidden sm:inline">رزرو نوبت جدید</span>
                <span className="sm:hidden">رزرو</span>
            </button>
        </div>
    </header>
);
};
