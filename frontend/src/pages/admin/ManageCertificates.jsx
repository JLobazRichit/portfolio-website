import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import api from '../../services/api';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

const emptyForm = {
  title: '',
  organization: '',
  date: '',
  certificateLink: '',
  category: 'Other',
};

const categories = ['AI/ML', 'Programming', 'IoT', 'Virtual Internship', 'Other'];

const ManageCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchCertificates = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/certificates');
      setCertificates(data.data);
    } catch {
      toast.error('Failed to load certificates');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setModalOpen(true);
  };

  const openEditModal = (cert) => {
    setEditingId(cert._id);
    setForm({
      title: cert.title,
      organization: cert.organization,
      date: cert.date?.slice(0, 10) || '',
      certificateLink: cert.certificateLink || '',
      category: cert.category,
    });
    setImageFile(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (imageFile) formData.append('image', imageFile);

      if (editingId) {
        await api.put(`/certificates/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Certificate updated');
      } else {
        await api.post('/certificates', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Certificate created');
      }

      setModalOpen(false);
      fetchCertificates();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save certificate');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/certificates/${deleteTarget}`);
      toast.success('Certificate deleted');
      setDeleteTarget(null);
      fetchCertificates();
    } catch {
      toast.error('Failed to delete certificate');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Manage Certificates</h1>
          <p className="text-slate-400">Add, edit, or remove certificates.</p>
        </div>
        <button onClick={openCreateModal} className="btn-gradient">
          <HiOutlinePlus size={18} /> Add Certificate
        </button>
      </div>

      {loading ? (
        <p className="text-slate-500 font-mono text-sm">loading_certificates...</p>
      ) : (
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-white/5">
                <th className="p-4">Title</th>
                <th className="p-4">Organization</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert._id} className="border-b border-white/5 last:border-0">
                  <td className="p-4 text-white font-medium">{cert.title}</td>
                  <td className="p-4 text-slate-400">{cert.organization}</td>
                  <td className="p-4 text-slate-400 font-mono text-xs">
                    {new Date(cert.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEditModal(cert)} className="p-2 text-slate-400 hover:text-accent transition-colors">
                      <HiOutlinePencil size={18} />
                    </button>
                    <button onClick={() => setDeleteTarget(cert._id)} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                      <HiOutlineTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {certificates.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-500 font-mono text-sm">
                    no_certificates_yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Certificate' : 'Add Certificate'}>
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
            placeholder="Issuing Organization"
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-secondary">{cat}</option>
              ))}
            </select>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
            />
          </div>
          <input
            type="url"
            placeholder="Certificate Link"
            value={form.certificateLink}
            onChange={(e) => setForm({ ...form, certificateLink: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
          />
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Certificate Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-sm text-slate-400 file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-accent/20 file:text-accent"
            />
          </div>
          <button type="submit" disabled={saving} className="btn-gradient w-full justify-center disabled:opacity-60">
            {saving ? 'Saving...' : editingId ? 'Update Certificate' : 'Create Certificate'}
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        message="Delete this certificate permanently? This cannot be undone."
      />
    </div>
  );
};

export default ManageCertificates;
