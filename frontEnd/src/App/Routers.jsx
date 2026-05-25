import { Route, BrowserRouter, Routes } from "react-router-dom";

import AppLayout from "@layout/appLayout/AppLayout";
import OwnerLayout from "@/layout/ownerLayout/OwnerLayout";
import AdminLayout from "@/layout/adminLayout/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";

import Home from "@pages/home/Home";
import AddFarm from "@/features/farms/Pages/AddFarm";
import Farm from "@/features/farms/Pages/Farm";
import Favorites from "@/features/farms/Pages/Favorites";
import AllFarms from "@/features/farms/Pages/AllFarms";
import MyFarms from "@/features/farms/Pages/MyFarms";
import LogIn from "@features/auth/Pages/LogIn";
import SignUp from "@features/auth/Pages/SignUp";
import Bookings from "@/features/bookings/Pages/UserBookings";
import NotFound from "@/ui/notFound/NotFound";
import Settings from "@/features/settings/pages/Settings";
import ForgotPassword from "@/features/auth/Pages/ForgotPassword";
import ResetPassword from "@features/auth/Pages/ResetPassword";
import VerifyCode from "@features/auth/Pages/VerifyCode";
import Notifications from "@/features/notifications/components/NotificationsList";
import OwnerDashboard from "@/features/owners/pages/OwnerDashboard";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import AdminPendingOwners from "@/features/admin/pages/AdminPendingOwners";
import AdminUsers from "@/features/admin/pages/AdminUsers";
import AdminCities from "@/features/admin/pages/AdminCities";
import AdminCategories from "@/features/admin/pages/AdminCategories";
import AdminFacilities from "@/features/admin/pages/AdminFacilities";
import CreateBooking from "@/features/bookings/Pages/CreateBooking";
import OwnerBookings from "@/features/bookings/Pages/OwnerBookings";
import FileInput from "@/ui/forms/fileInput/FileInput";
import RecentReviews from "@/features/reviews/components/RecentReviews";

export default function Routers() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/app"
          element={
              <AppLayout />
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="farm/:id" element={<Farm />} />
          <Route path="farms" element={<AllFarms />} />
          <Route path="favorites" element={<ProtectedRoute allowedRoles={["user", "owner", "admin"]}><Favorites /></ProtectedRoute>} />
          <Route path="create-booking/:id" element={<ProtectedRoute allowedRoles={["user", "owner", "admin"]}><CreateBooking /></ProtectedRoute>} />
          <Route path="bookings" element={<ProtectedRoute allowedRoles={["user", "owner", "admin"]}><Bookings /></ProtectedRoute>} />
          <Route path="notifications" element={<ProtectedRoute allowedRoles={["user", "owner", "admin"]}><Notifications /></ProtectedRoute>} />
          <Route path="file" element={<FileInput/>} />
          <Route
            path="settings/:section?/:subSection?/:content?"
            element={<ProtectedRoute allowedRoles={["user", "owner", "admin"]}><Settings /></ProtectedRoute>}
          />
        </Route>

        <Route
          path="/owner"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <OwnerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="my-farms" element={<MyFarms />} />
          <Route path="add-farm" element={<AddFarm />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="bookings" element={<OwnerBookings />} />
          <Route path="reviews" element={<RecentReviews />} />
          <Route path="settings/:section?/:subSection?/:content?" element={<Settings />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="pending-owners" element={<AdminPendingOwners />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="cities" element={<AdminCities />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="facilities" element={<AdminFacilities />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
