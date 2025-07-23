
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import UserPage from "./pages/UserPage";
import Community from "./pages/Community";
import Ethos from "./pages/Ethos";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminProjects from "./pages/AdminProjects";
import AdminTeam from "./pages/AdminTeam";
import AdminSiteContent from "./pages/AdminSiteContent";
import AdminPortfolio from "./pages/AdminPortfolio";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/:username" element={<UserPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/community" element={<Community />} />
            <Route path="/ethos" element={<Ethos />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="network-admin">
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/admin/projects" element={
              <ProtectedRoute requiredRole="project-lead">
                <AdminProjects />
              </ProtectedRoute>
            } />
            <Route path="/admin/portfolio" element={
              <ProtectedRoute requiredRole="project-lead">
                <AdminPortfolio />
              </ProtectedRoute>
            } />
            <Route path="/admin/team" element={
              <ProtectedRoute requiredRole="project-lead">
                <AdminTeam />
              </ProtectedRoute>
            } />
            <Route path="/admin/site-content" element={
              <ProtectedRoute requiredRole="project-lead">
                <AdminSiteContent />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
