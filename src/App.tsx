import { Routes, Route, Navigate } from "react-router";
import { PublicLayout } from "./components/shared/PublicLayout.tsx";
import { Homepage } from "./pages/Homepage.tsx";
import { AboutusPage } from "./pages/Aboutuspage.tsx";
import { BlogsPage } from "./pages/Blogs.tsx";
import { ServicesPage as PublicServicesPage } from "./pages/Services.tsx";
import { SingleBlogPage } from "./pages/SingleBlog.tsx";
import { LoginPage } from "./pages/Login.tsx";
import { DashboardLayout } from "./pages/Dashboard/DashboardLayout.tsx";
import { OverviewPage } from "./pages/Dashboard/OverviewPage.tsx";
import { BookingsPage } from "./pages/Dashboard/BookingsPage.tsx";
import { MyVehiclesPage } from "./pages/Dashboard/MyVehiclesPage.tsx";
import { FavoritesPage } from "./pages/Dashboard/FavoritesPage.tsx";
import { CustomersPage } from "./pages/Dashboard/CustomersPage.tsx";
import { ServicesPage } from "./pages/Dashboard/ServicesPage.tsx";
import { SettingsPage } from "./pages/Dashboard/SettingsPage.tsx";
import { ReviewsPage } from "./pages/Dashboard/ReviewsPage.tsx";
import { SupportPage } from "./pages/Dashboard/SupportPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { RequireRole } from "./components/Dashboard/RequireRole.tsx";
import { ScrollToTop } from "./components/shared/ScrollToTop.tsx";

function App() {
    return (
        <>
        <ScrollToTop />
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/aboutus" element={<AboutusPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/services" element={<PublicServicesPage />} />
                <Route path="/blog/:slug" element={<SingleBlogPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="/dashboard" element={<AuthProvider><DashboardLayout /></AuthProvider>}>
                <Route index element={<Navigate to="/dashboard/overview" replace />} />

                <Route path="overview" element={<OverviewPage />} />
                <Route path="vehicles" element={
                    <RequireRole role="user"><MyVehiclesPage /></RequireRole>
                } />
                <Route path="favorites" element={
                    <RequireRole role="user"><FavoritesPage /></RequireRole>
                } />
                <Route path="support" element={
                    <RequireRole role="user"><SupportPage /></RequireRole>
                } />
                <Route path="customers" element={
                    <RequireRole role="specialist"><CustomersPage /></RequireRole>
                } />
                <Route path="services" element={
                    <RequireRole role="specialist"><ServicesPage /></RequireRole>
                } />
                <Route path="reviews" element={
                    <RequireRole role="specialist"><ReviewsPage /></RequireRole>
                } />
                <Route path="bookings" element={<BookingsPage />} />
                <Route path="settings" element={<SettingsPage />} />

            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </>
    );
}

export default App;
