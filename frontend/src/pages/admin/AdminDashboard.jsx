import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineCode, HiOutlineBadgeCheck, HiOutlineClock, HiOutlineMail } from 'react-icons/hi';
import api from '../../services/api';

const StatCard = ({ label, value, icon: Icon, to }) => (
  <Link to={to} className="glass-card p-6 hover:border-accent/30 border border-transparent transition-colors">
    <div className="flex items-center justify-between mb-3">
      <Icon className="text-accent" size={24} />
      <span className="text-3xl font-bold text-white font-mono">{value}</span>
    </div>
    <p className="text-sm text-slate-400">{label}</p>
  </Link>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data.data);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
      <p className="text-slate-400 mb-8">Overview of your portfolio content and messages.</p>

      {loading ? (
        <p className="text-slate-500 font-mono text-sm">loading_stats...</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <StatCard label="Projects" value={stats?.projectCount ?? 0} icon={HiOutlineCode} to="/admin/projects" />
            <StatCard label="Certificates" value={stats?.certificateCount ?? 0} icon={HiOutlineBadgeCheck} to="/admin/certificates" />
            <StatCard label="Experience Entries" value={stats?.experienceCount ?? 0} icon={HiOutlineClock} to="/admin/experience" />
            <StatCard label="Unread Messages" value={stats?.unreadCount ?? 0} icon={HiOutlineMail} to="/admin/messages" />
          </div>

          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Messages</h2>
            {stats?.recentMessages?.length ? (
              <ul className="divide-y divide-white/5">
                {stats.recentMessages.map((msg) => (
                  <li key={msg._id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white font-medium">{msg.name}</p>
                      <p className="text-xs text-slate-500">{msg.subject}</p>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      {new Date(msg.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 text-sm font-mono">no_messages_yet</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
