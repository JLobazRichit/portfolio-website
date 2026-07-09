import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import api from '../../services/api';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

const emptyForm = {
  title: '',
  organization: '',
  type: 'Internship',
  description: '',
  startDate: '',
  endDate: '',
  location: '',
  link: '',
};

const types = ['Internship', 'Workshop', 'Hackathon', 'Event', 'NCC', 'Achievement'];

const ManageExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/experience');
      setExperiences(data.data);
    } catch {
      toast.error('Failed to load experience entries');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (exp) => {
    setEditingId(exp._id);
    setForm({
      title: exp.title,
      organization: exp.organization,
      type: exp.type,
      description: exp.description,
      startDate: exp.startDate?.slice(0, 10) || '',
      endDate: exp.endDate?.slice(0, 10) || '',
      location: exp.location || '',
      link: exp.link || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.endDate) delete payload.endDate;

      if (editingId) {
        await api.put(`/experience/${editingId}`, payload);
        toast.success('Experience entry updated');
      } else {
        await api.post('/experience', payload);
        toast.success('Experience entry created');
      }

      setModalOpen(false);
      fetchExperiences();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save entry');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/experience/${deleteTarget}`);
      toast.success('Experience entry deleted');
      setDeleteTarget(null);
      fetchExperiences();
    } catch {
      toast.error('Failed to delete entry');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Manage Experience</h1>
          <p className="text-slate-400">Internships, hackathons, workshops, and events.</p>
        </div>
        <button onClick={openCreateModal} className="btn-gradient">
          <HiOutlinePlus size={18} /> Add Entry
        </button>
      </div>

      {loading ? (
        <p className="text-slate-500 font-mono text-sm">loading_experience...</p>
      ) : (
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-white/5">
                <th className="p-4">Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Start Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp._id} className="border-b border-white/5 last:border-0">
                  <td className="p-4 text-white font-medium">{exp.title}</td>
                  <td className="p-4 text-slate-400">{exp.type}</td>
                  <td className="p-4 text-slate-400 font-mono text-xs">
                    {new Date(exp.startDate).toLocaleDateString('en-IN')}
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEditModal(exp)} className="p-2 text-slate-400 hover:text-accent transition-colors">
                      <HiOutlinePencil size={18} />
                    </button>
                    <button onClick={() => setDeleteTarget(exp._id)} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                      <HiOutlineTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {experiences.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-500 font-mono text-sm">
                    no_entries_yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Entry' : 'Add Entry'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
          />
          <input
            type="text"
            required
            placeholder="Organization"
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
          >
            {types.map((t) => (
              <option key={t} value={t} className="bg-secondary">{t}</option>
            ))}
          </select>
          <textarea
            required
            placeholder="Description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50 resize-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Start Date</label>
              <input
                type="date"
                required
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">End Date (optional)</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
          />
          <input
            type="url"
            placeholder="Related Link (optional)"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
          />
          <button type="submit" disabled={saving} className="btn-gradient w-full justify-center disabled:opacity-60">
            {saving ? 'Saving...' : editingId ? 'Update Entry' : 'Create Entry'}
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        message="Delete this experience entry permanently? This cannot be undone."
      />
    </div>
  );
};

export default ManageExperience;
