import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-secondary">
      <div className="w-full max-w-sm glass-card p-8">
        <Link to="/" className="block text-center font-display font-bold text-2xl text-white mb-1">
          Lobaz<span className="text-accent">.</span>
        </Link>
        <p className="text-center text-xs font-mono text-accent tracking-[0.2em] uppercase mb-8">
          admin_console
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Username</label>
            <div className="relative">
              <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50 transition-colors"
                placeholder="admin username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Password</label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-gradient w-full justify-center disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;
