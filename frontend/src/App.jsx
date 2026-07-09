import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import AppToaster from './components/AppToaster';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageCertificates from './pages/admin/ManageCertificates';
import ManageExperience from './pages/admin/ManageExperience';
import ManageMessages from './pages/admin/ManageMessages';
import AdminLayout from './pages/admin/AdminLayout';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 80 });
  }, []);

  return (
    <>
      <ScrollToTop />
      <AppToaster />
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public site */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin */}
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
          <Route path="projects" element={<ManageProjects />} />
          <Route path="certificates" element={<ManageCertificates />} />
          <Route path="experience" element={<ManageExperience />} />
          <Route path="messages" element={<ManageMessages />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BackToTop />}
    </>
  );
}

export default App;
