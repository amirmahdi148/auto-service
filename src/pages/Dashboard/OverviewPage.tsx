import { useAuth } from "../../contexts/useAuth.ts";
import { DashboardPageHeader } from "../../components/Dashboard/DashboardPageHeader";
import { KpiCards } from "../../components/Dashboard/KpiCards";
import { RevenueChart } from "../../components/Dashboard/RevenueChart";
import { ActivityFeed } from "../../components/Dashboard/ActivityFeed";
import { RecentBookings } from "../../components/Dashboard/RecentBookings";
import { PopularServices } from "../../components/Dashboard/PopularServices";
import { TopCenters } from "../../components/Dashboard/TopCenters";
import { QuickActions } from "../../components/Dashboard/QuickActions";
import { AlertBand } from "../../components/Dashboard/AlertBand";
import { UserKpiCards } from "../../components/Dashboard/UserKpiCards";
import { UserVehicles } from "../../components/Dashboard/UserVehicles";
import { UserUpcomingBookings } from "../../components/Dashboard/UserUpcomingBookings";
import { UserQuickActions } from "../../components/Dashboard/UserQuickActions";

export const OverviewPage = () => {
    const { role } = useAuth();
    const isSpecialist = role === "specialist";
    const isUser = role === "user";

    return (
        <div className="flex flex-col gap-6">
            <DashboardPageHeader/>
            
            {/* KPI Cards */}
            {isSpecialist && <KpiCards/>}
            {isUser && <UserKpiCards/>}

            {/* Specialist Top Row: Revenue & Activity */}
            {isSpecialist && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <RevenueChart/>
                    <ActivityFeed/>
                </div>
            )}

            {/* User Top Row: Vehicles & Upcoming Bookings */}
            {isUser && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-1">
                        <UserVehicles/>
                    </div>
                    <div className="lg:col-span-2">
                        <UserUpcomingBookings/>
                    </div>
                </div>
            )}

            {/* Specialist Middle Row: Recent Bookings & Lists */}
            {isSpecialist && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <RecentBookings/>
                    <div className="flex flex-col gap-4">
                        <PopularServices/>
                        <TopCenters/>
                    </div>
                </div>
            )}

            {/* User Middle Row: Suggestions (Popular Services & Top Centers) */}
            {isUser && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PopularServices/>
                    <TopCenters/>
                </div>
            )}

            {/* Quick Actions */}
            {isSpecialist && <QuickActions/>}
            {isUser && <UserQuickActions/>}

            {/* Alerts */}
            <AlertBand/>
        </div>
    );
};
