import { useNavigate } from "react-router";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { HttpService } from "../../utils/HttpService";

interface Booking {
    status: string;
}

interface Ticket {
    status: string;
}

interface BookingsResponse {
    data?: Booking[];
}

export const AlertBand = () => {
    const navigate = useNavigate();

    const { data: bookingsData } = useQuery({
        queryKey: ["bookings", { limit: 100 }],
        queryFn: () => HttpService.get<BookingsResponse | Booking[]>("/api/bookings", { params: { limit: 100 } }),
    });

    const { data: ticketsData } = useQuery({
        queryKey: ["tickets"],
        queryFn: () => HttpService.get<Ticket[]>("/api/support/tickets"),
    });

    const bookingsList: Booking[] = Array.isArray(bookingsData) 
        ? bookingsData 
        : (bookingsData?.data ?? []);

    const pendingBookingsCount = bookingsList.filter((b) => b?.status === "pending").length;
    const openTicketsCount = Array.isArray(ticketsData) 
        ? ticketsData.filter((t) => t?.status === "open").length 
        : 0;

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-primary text-on-primary p-6">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-on-primary/10 shrink-0">
                    <AlertCircle className="size-6" strokeWidth={1.5}/>
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-on-primary text-title-lg font-bold">موارد نیازمند توجه شما</h3>
                    <p className="text-primary-fixed text-label-lg">
                        {pendingBookingsCount} رزرو در انتظار تأیید و {openTicketsCount} تیکت پشتیبانی فعال
                    </p>
                </div>
            </div>
            <button
                onClick={() => navigate("/dashboard/bookings?status=pending")}
                className="flex items-center gap-2 h-11 px-6 rounded-full bg-secondary text-on-secondary font-bold text-label-lg cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap"
            >
                بررسی موارد
                <ChevronLeft className="size-4" strokeWidth={2}/>
            </button>
        </div>
    );
};
