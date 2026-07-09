import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  HiOutlineViewGrid,
  HiOutlineCode,
  HiOutlineBadgeCheck,
  HiOutlineClock,
  HiOutlineMail,
  HiOutlineLogout,
  HiMenu,
  HiX,
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: HiOutlineViewGrid, end: true },
  { label: 'Projects', path: '/admin/projects', icon: HiOutlineCode },
  { label: 'Certificates', path: '/admin/certificates', icon: HiOutlineBadgeCheck },
  { label: 'Experience', path: '/admin/experience', icon: HiOutlineClock },
  { label: 'Messages', path: '/admin/messages', icon: HiOutlineMail },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.info('Logged out');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-surface-card/80 backdrop-blur-md border-r border-white/5 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          <p className="font-display font-bold text-xl text-white">
            Lobaz<span className="text-accent">.</span>
          </p>
          <p className="text-xs font-mono text-slate-500 mt-1">admin_console</p>
        </div>

        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-accent/15 text-accent' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <p className="text-xs text-slate-500 mb-2 px-2">Signed in as {admin?.username}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
          >
            <HiOutlineLogout size={18} /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-white/5">
          <p className="font-display font-bold text-white">Admin</p>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white p-2">
            {sidebarOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </header>
        <main className="p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
