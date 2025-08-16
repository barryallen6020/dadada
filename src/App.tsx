
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { OrganizationProvider } from '@/contexts/OrganizationContext';
import ScrollToTop from '@/components/common/ScrollToTop';

// Import all pages
import Index from '@/pages/Index';
import Home from '@/pages/Home';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import VerifyAccount from '@/pages/VerifyAccount';
import PreLaunch from '@/pages/PreLaunch';

// Legal pages
import TermsOfService from '@/pages/legal/TermsOfService';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';
import CookiePolicy from '@/pages/legal/CookiePolicy';
import RefundPolicy from '@/pages/legal/RefundPolicy';

// Protected pages
import Dashboard from '@/pages/Dashboard';
import MyBookings from '@/pages/MyBookings';
import BookingPage from '@/pages/BookingPage';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';

// Admin pages
import Admin from '@/pages/Admin';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminBookings from '@/pages/admin/AdminBookings';
import AdminLocations from '@/pages/admin/AdminLocations';
import AdminSettings from '@/pages/admin/AdminSettings';
import Messages from '@/pages/admin/Messages';
import HubCheckIn from '@/pages/admin/HubCheckIn';
import HubManagement from '@/pages/admin/HubManagement';
import WorkspaceCreation from '@/pages/admin/WorkspaceCreation';
import CreateSeats from '@/pages/admin/CreateSeats';
import OrganizationSettings from '@/pages/admin/OrganizationSettings';

// Hub Manager pages
import HubManagerDashboard from '@/pages/hubmanager/HubManagerDashboard';
import HubManagerBookings from '@/pages/hubmanager/HubManagerBookings';
import HubManagerCheckIn from '@/pages/hubmanager/HubManagerCheckIn';
import HubManagerWorkspaces from '@/pages/hubmanager/HubManagerWorkspaces';
import HubManagerUsers from '@/pages/hubmanager/HubManagerUsers';
import HubManagerLearners from '@/pages/hubmanager/HubManagerLearners';
import HubManagerReports from '@/pages/hubmanager/HubManagerReports';
import HubManagerSettings from '@/pages/hubmanager/HubManagerSettings';
import HubManagerProfile from '@/pages/hubmanager/HubManagerProfile';
import HubManagerMaintenance from '@/pages/hubmanager/HubManagerMaintenance';
import HubManagerActivity from '@/pages/hubmanager/HubManagerActivity';
import HubManagerMessages from '@/pages/hubmanager/HubManagerMessages';

// Global Admin pages
import GlobalAdminLogin from '@/pages/GlobalAdminLogin';
import GlobalAdmin from '@/pages/GlobalAdmin';
import HubManagerLogin from '@/pages/HubManagerLogin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <OrganizationProvider>
          <div className="App">
            <ScrollToTop />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-account" element={<VerifyAccount />} />
              <Route path="/prelaunch" element={<PreLaunch />} />
              
              {/* Legal routes */}
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/refund" element={<RefundPolicy />} />

              {/* Protected user routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<MyBookings />} />
              <Route path="/book/:workspaceId" element={<BookingPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />

              {/* Admin routes */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/bookings" element={<AdminBookings />} />
              <Route path="/admin/locations" element={<AdminLocations />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/messages" element={<Messages />} />
              <Route path="/admin/check-in" element={<HubCheckIn />} />
              <Route path="/admin/hub-management" element={<HubManagement />} />
              <Route path="/admin/workspace-creation" element={<WorkspaceCreation />} />
              <Route path="/admin/create-seats" element={<CreateSeats />} />
              <Route path="/admin/organization-settings" element={<OrganizationSettings />} />

              {/* Hub Manager routes */}
              <Route path="/hubmanager/dashboard" element={<HubManagerDashboard />} />
              <Route path="/hubmanager/bookings" element={<HubManagerBookings />} />
              <Route path="/hubmanager/check-in" element={<HubManagerCheckIn />} />
              <Route path="/hubmanager/workspaces" element={<HubManagerWorkspaces />} />
              <Route path="/hubmanager/users" element={<HubManagerUsers />} />
              <Route path="/hubmanager/learners" element={<HubManagerLearners />} />
              <Route path="/hubmanager/reports" element={<HubManagerReports />} />
              <Route path="/hubmanager/settings" element={<HubManagerSettings />} />
              <Route path="/hubmanager/profile" element={<HubManagerProfile />} />
              <Route path="/hubmanager/maintenance" element={<HubManagerMaintenance />} />
              <Route path="/hubmanager/activity" element={<HubManagerActivity />} />
              <Route path="/hubmanager/messages" element={<HubManagerMessages />} />

              {/* Global Admin routes */}
              <Route path="/global-admin/login" element={<GlobalAdminLogin />} />
              <Route path="/global-admin" element={<GlobalAdmin />} />
              <Route path="/hubmanager/login" element={<HubManagerLogin />} />

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </OrganizationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
