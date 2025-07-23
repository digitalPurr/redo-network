
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import AdminSetup from '@/components/AdminSetup';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Ethos from '@/pages/Ethos';
import Team from '@/pages/Team';
import Portfolio from '@/pages/Portfolio';
import Projects from '@/pages/Projects';
import Contact from '@/pages/Contact';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Admin from '@/pages/Admin';
import AdminTeam from '@/pages/AdminTeam';
import AdminProjects from '@/pages/AdminProjects';
import AdminSiteContent from '@/pages/AdminSiteContent';
import UserPage from '@/pages/UserPage';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/ProtectedRoute';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <AuthProvider>
          <AdminSetup />
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/ethos" element={<Ethos />} />
              <Route path="/team" element={<Team />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['network-admin', 'project-lead', 'contributor']}>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/admin/team" element={
                <ProtectedRoute allowedRoles={['network-admin', 'project-lead']}>
                  <AdminTeam />
                </ProtectedRoute>
              } />
              <Route path="/admin/projects" element={
                <ProtectedRoute allowedRoles={['network-admin', 'project-lead']}>
                  <AdminProjects />
                </ProtectedRoute>
              } />
              <Route path="/admin/site-content" element={
                <ProtectedRoute allowedRoles={['network-admin', 'project-lead']}>
                  <AdminSiteContent />
                </ProtectedRoute>
              } />
              <Route path="/u/:username" element={<UserPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
