import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import UmrahPackages from "./pages/UmrahPackages";
import FlightTickets from "./pages/FlightTickets";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUmrahPackages from "./pages/admin/UmrahPackagesAdmin";
import AdminDestinations from "./pages/admin/DestinationsAdmin";
import AdminAirlines from "./pages/admin/AirlinesAdmin";
import AdminTeamMembers from "./pages/admin/TeamMembersAdmin";
import AdminCounterStats from "./pages/admin/CounterStatsAdmin";
import AdminAboutContent from "./pages/admin/AboutContentAdmin";
import AdminSiteSettings from "./pages/admin/SiteSettingsAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/umrah-packages" element={<UmrahPackages />} />
            <Route path="/flights" element={<FlightTickets />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="packages" element={<AdminUmrahPackages />} />
              <Route path="destinations" element={<AdminDestinations />} />
              <Route path="airlines" element={<AdminAirlines />} />
              <Route path="team" element={<AdminTeamMembers />} />
              <Route path="stats" element={<AdminCounterStats />} />
              <Route path="about" element={<AdminAboutContent />} />
              <Route path="settings" element={<AdminSiteSettings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
