
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import { OrganizationProvider } from "./contexts/OrganizationContext";
import { Toaster } from "@/components/ui/sonner";

// Pages
import IndexPage from "./pages/Index";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import PreLaunch from "./pages/PreLaunch";

// Admin pages
import Admin from "./pages/Admin";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import HubManagement from "./pages/admin/HubManagement";
import WorkspaceCreation from "./pages/admin/WorkspaceCreation";
import HubCheckIn from "./pages/admin/HubCheckIn";
import OrganizationSettings from "./pages/admin/OrganizationSettings";

// Global Admin pages
import GlobalAdminLogin from "./pages/GlobalAdminLogin";
import GlobalAdmin from "./pages/GlobalAdmin";

// Hub manager pages
import HubManagerDashboard from "./pages/hubmanager/HubManagerDashboard";
import HubManagerActivity from "./pages/hubmanager/HubManagerActivity";
import HubManagerCheckIn from "./pages/hubmanager/HubManagerCheckIn";
import HubManagerLearners from "./pages/hubmanager/HubManagerLearners";
import HubManagerProfile from "./pages/hubmanager/HubManagerProfile";
import HubManagerSettings from "./pages/hubmanager/HubManagerSettings";

// Legal pages
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import RefundPolicy from "./pages/legal/RefundPolicy";
import CookiePolicy from "./pages/legal/CookiePolicy";
import WorkspaceSeatManagement from "./pages/admin/CreateSeats";

function App() {
  return (
    <OrganizationProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Pre-launch page - setting as root route during pre-launch phase */}
          <Route path="/" element={<PreLaunch />} />
          
          {/* Original index page now accessible via /home */}
          <Route path="/home" element={<IndexPage />} />
          
          {/* Public routes */}
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          
          {/* Authenticated member routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/hubs" element={<HubManagement />} />
          <Route path="/admin/workspace/create" element={<WorkspaceCreation />} />
          <Route path="/admin/check-in" element={<HubCheckIn />} />
          <Route path="/admin/organization" element={<OrganizationSettings />} />
          <Route path="/admin/workspace/:workspaceId/seat-management" element={<WorkspaceSeatManagement />} />
          
          {/* Global Admin routes */}
          <Route path="/global-admin/login" element={<GlobalAdminLogin />} />
          <Route path="/global-admin" element={<GlobalAdmin />} />
          
          {/* Hub manager routes */}
          <Route path="/hub-manager" element={<HubManagerDashboard />} />
          <Route path="/hub-manager/activity" element={<HubManagerActivity />} />
          <Route path="/hub-manager/check-in" element={<HubManagerCheckIn />} />
          <Route path="/hub-manager/learners" element={<HubManagerLearners />} />
          <Route path="/hub-manager/profile" element={<HubManagerProfile />} />
          <Route path="/hub-manager/settings" element={<HubManagerSettings />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </OrganizationProvider>
  );
}

export default App;
