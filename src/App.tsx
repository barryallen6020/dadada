
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

// Workspace Admin pages
import WorkspaceAdmin from "./pages/admin/WorkspaceAdmin";
import WorkspaceList from "./pages/admin/WorkspaceList";
import WorkspaceRooms from "./pages/admin/WorkspaceRooms";
import WorkspaceBookings from "./pages/admin/WorkspaceBookings";
import WorkspacePricing from "./pages/admin/WorkspacePricing";
import WorkspaceCommunications from "./pages/admin/WorkspaceCommunications";
import WorkspaceBilling from "./pages/admin/WorkspaceBilling";
import WorkspaceAPI from "./pages/admin/WorkspaceAPI";
import WorkspaceAudit from "./pages/admin/WorkspaceAudit";
import WorkspaceSettings from "./pages/admin/WorkspaceSettings";

// Global Admin pages
import GlobalAdminLogin from "./pages/GlobalAdminLogin";
import GlobalAdmin from "./pages/GlobalAdmin";

// Hub manager pages
import HubManagerLogin from "./pages/HubManagerLogin";
import HubManagerDashboard from "./pages/hubmanager/HubManagerDashboard";
import HubManagerWorkspaces from "./pages/hubmanager/HubManagerWorkspaces";
import HubManagerBookings from "./pages/hubmanager/HubManagerBookings";
import HubManagerCheckIn from "./pages/hubmanager/HubManagerCheckIn";
import HubManagerMaintenance from "./pages/hubmanager/HubManagerMaintenance";
import HubManagerUsers from "./pages/hubmanager/HubManagerUsers";
import HubManagerReports from "./pages/hubmanager/HubManagerReports";
import HubManagerActivity from "./pages/hubmanager/HubManagerActivity";
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
          
          {/* Workspace Admin routes */}
          <Route path="/admin/workspace" element={<WorkspaceAdmin />} />
          <Route path="/admin/workspace/list" element={<WorkspaceList />} />
          <Route path="/admin/workspace/rooms" element={<WorkspaceRooms />} />
          <Route path="/admin/workspace/bookings" element={<WorkspaceBookings />} />
          <Route path="/admin/workspace/pricing" element={<WorkspacePricing />} />
          <Route path="/admin/workspace/communications" element={<WorkspaceCommunications />} />
          <Route path="/admin/workspace/billing" element={<WorkspaceBilling />} />
          <Route path="/admin/workspace/api" element={<WorkspaceAPI />} />
          <Route path="/admin/workspace/audit" element={<WorkspaceAudit />} />
          <Route path="/admin/workspace/settings" element={<WorkspaceSettings />} />
          
          {/* Global Admin routes */}
          <Route path="/global-admin/login" element={<GlobalAdminLogin />} />
          <Route path="/global-admin" element={<GlobalAdmin />} />
          
          {/* Hub Manager routes */}
          <Route path="/hubmanager/login" element={<HubManagerLogin />} />
          <Route path="/hubmanager" element={<HubManagerDashboard />} />
          <Route path="/hubmanager/workspaces" element={<HubManagerWorkspaces />} />
          <Route path="/hubmanager/bookings" element={<HubManagerBookings />} />
          <Route path="/hubmanager/check-in" element={<HubManagerCheckIn />} />
          <Route path="/hubmanager/maintenance" element={<HubManagerMaintenance />} />
          <Route path="/hubmanager/users" element={<HubManagerUsers />} />
          <Route path="/hubmanager/reports" element={<HubManagerReports />} />
          <Route path="/hubmanager/activity" element={<HubManagerActivity />} />
          <Route path="/hubmanager/learners" element={<HubManagerLearners />} />
          <Route path="/hubmanager/profile" element={<HubManagerProfile />} />
          <Route path="/hubmanager/settings" element={<HubManagerSettings />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </OrganizationProvider>
  );
}

export default App;
