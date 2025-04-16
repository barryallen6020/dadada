
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import MyBookings from "./pages/MyBookings";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { OrganizationProvider } from "@/contexts/OrganizationContext";
import ScrollToTop from "./components/common/ScrollToTop";
import BookingPage from "./pages/BookingPage";

// Admin Routes
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import HubManagement from "./pages/admin/HubManagement";
import HubCheckIn from "./pages/admin/HubCheckIn";
import OrganizationSettings from "./pages/admin/OrganizationSettings";

// Hub Manager Routes
import HubManagerDashboard from "./pages/hubmanager/HubManagerDashboard";
import HubManagerCheckIn from "./pages/hubmanager/HubManagerCheckIn";
import HubManagerActivity from "./pages/hubmanager/HubManagerActivity";
import HubManagerLearners from "./pages/hubmanager/HubManagerLearners";
import HubManagerSettings from "./pages/hubmanager/HubManagerSettings";
import HubManagerProfile from "./pages/hubmanager/HubManagerProfile";

// Public pages
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

// Legal pages
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import CookiePolicy from "./pages/legal/CookiePolicy";
import RefundPolicy from "./pages/legal/RefundPolicy";

// Authentication guard for protected routes
const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  return isAuthenticated ? element : <Navigate to="/login" />;
};

// Admin route guard with role check
const AdminRoute = ({ element }: { element: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : { role: "" };
  const isAdmin = user.role === "admin";
  
  return isAuthenticated && isAdmin ? element : <Navigate to="/dashboard" />;
};

// Hub Manager route guard with role check
const HubManagerRoute = ({ element }: { element: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : { role: "" };
  const isHubManager = user.role === "hub_manager";
  
  return isAuthenticated && isHubManager ? element : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <OrganizationProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Legal Routes */}
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/refunds" element={<RefundPolicy />} />
          
          {/* Protected User Routes */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/bookings" element={<PrivateRoute element={<MyBookings />} />} />
          <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/book/:id" element={<PrivateRoute element={<BookingPage />} />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
          <Route path="/admin/bookings" element={<AdminRoute element={<AdminBookings />} />} />
          <Route path="/admin/users" element={<AdminRoute element={<AdminUsers />} />} />
          <Route path="/admin/settings" element={<AdminRoute element={<AdminSettings />} />} />
          <Route path="/admin/organization" element={<AdminRoute element={<OrganizationSettings />} />} />
          <Route path="/admin/hubs" element={<AdminRoute element={<HubManagement />} />} />
          <Route path="/admin/hub-check-in" element={<AdminRoute element={<HubCheckIn />} />} />
          
          {/* Hub Manager Routes */}
          <Route path="/hubmanager" element={<HubManagerRoute element={<HubManagerDashboard />} />} />
          <Route path="/hubmanager/check-in" element={<HubManagerRoute element={<HubManagerCheckIn />} />} />
          <Route path="/hubmanager/activity" element={<HubManagerRoute element={<HubManagerActivity />} />} />
          <Route path="/hubmanager/learners" element={<HubManagerRoute element={<HubManagerLearners />} />} />
          <Route path="/hubmanager/settings" element={<HubManagerRoute element={<HubManagerSettings />} />} />
          <Route path="/hubmanager/profile" element={<HubManagerRoute element={<HubManagerProfile />} />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </OrganizationProvider>
  );
}

export default App;
