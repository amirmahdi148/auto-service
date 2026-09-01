import { useNavigate } from "react-router";
import { CalendarPlus, Users, FileText, Wrench, Settings, Download } from "lucide-react";

interface QuickActionsProps {
    onNewBooking?: () => void;
    onExportData?: () => void;
}

export const QuickActions = ({ onNewBooking, onExportData }: QuickActionsProps) => {
    const navigate = useNavigate();

    const QUICK_ACTIONS = [
        { Icon: CalendarPlus, label: "رزرو نوبت جدید", onClick: () => onNewBooking?.() },
        { Icon: Users, label: "مدیریت مشتریان", onClick: () => navigate("/dashboard/customers") },
        { Icon: FileText, label: "گزارش‌ها", onClick: () => navigate("/dashboard/bookings") },
        { Icon: Wrench, label: "خدمات", onClick: () => navigate("/dashboard/services") },
        { Icon: Settings, label: "تنظیمات", onClick: () => navigate("/dashboard/settings") },
        { Icon: Download, label: "خروجی اطلاعات", onClick: () => onExportData?.() },
    ];

    return (
        <div className="rounded-2xl bg-surface border border-outline-variant p-6">
            <h2 className="text-on-surface text-title-lg font-bold mb-5">دسترسی سریع</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {QUICK_ACTIONS.map((action) => (
                    <button
                        key={action.label}
                        onClick={action.onClick}
                        className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-surface-container-low hover:bg-primary-container border border-transparent hover:border-primary/20 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                            <action.Icon className="size-5" strokeWidth={1.5}/>
                        </div>
                        <span className="text-on-surface-variant group-hover:text-on-primary-container text-label-sm font-bold text-center transition-colors">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
