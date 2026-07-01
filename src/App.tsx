import { Routes, Route, Navigate } from "react-router";
import { PublicLayout } from "./components/shared/PublicLayout.tsx";
import { Homepage } from "./pages/Homepage.tsx";
import { AboutusPage } from "./pages/Aboutuspage.tsx";
import { BlogsPage } from "./pages/Blogs.tsx";
import { SingleBlogPage } from "./pages/SingleBlog.tsx";
import { LoginPage } from "./pages/Login.tsx";
import { DashboardLayout } from "./pages/Dashboard/DashboardLayout.tsx";
import { OverviewPage } from "./pages/Dashboard/OverviewPage.tsx";
import { BookingsPage } from "./pages/Dashboard/BookingsPage.tsx";

function App() {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/aboutus" element={<AboutusPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blog/:slug" element={<SingleBlogPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Navigate to="/dashboard/overview" replace />} />

                <Route path="overview" element={<OverviewPage />} />
                <Route path="bookings" element={<BookingsPage />} />

            </Route>
        </Routes>
    );
}

export default App;
