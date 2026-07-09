import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import api from '../../services/api';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

const emptyForm = {
  title: '',
  description: '',
  technologies: '',
  githubLink: '',
  liveDemo: '',
  category: 'IoT',
  date: '',
  featured: false,
};

const categories = ['IoT', 'Web Development', 'AI/ML', 'Full Stack', 'Embedded Systems', 'Other'];

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/projects');
      setProjects(data.data);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      githubLink: project.githubLink || '',
      liveDemo: project.liveDemo || '',
      category: project.category,
      date: project.date?.slice(0, 10) || '',
      featured: project.featured,
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
        await api.put(`/projects/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Project updated');
      } else {
        await api.post('/projects', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Project created');
      }

      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${deleteTarget}`);
      toast.success('Project deleted');
      setDeleteTarget(null);
      fetchProjects();
    } catch {
      toast.error('Failed to delete project');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Manage Projects</h1>
          <p className="text-slate-400">Add, edit, or remove portfolio projects.</p>
        </div>
        <button onClick={openCreateModal} className="btn-gradient">
          <HiOutlinePlus size={18} /> Add Project
        </button>
      </div>

      {loading ? (
        <p className="text-slate-500 font-mono text-sm">loading_projects...</p>
      ) : (
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-white/5">
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b border-white/5 last:border-0">
                  <td className="p-4 text-white font-medium">{project.title}</td>
                  <td className="p-4 text-slate-400">{project.category}</td>
                  <td className="p-4 text-slate-400 font-mono text-xs">
                    {new Date(project.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => openEditModal(project)}
                      className="p-2 text-slate-400 hover:text-accent transition-colors"
                    >
                      <HiOutlinePencil size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(project._id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <HiOutlineTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-500 font-mono text-sm">
                    no_projects_yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Project' : 'Add Project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
          />
          <textarea
            required
            placeholder="Description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50 resize-none"
          />
          <input
            type="text"
            required
            placeholder="Technologies (comma-separated)"
            value={form.technologies}
            onChange={(e) => setForm({ ...form, technologies: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="url"
              placeholder="GitHub Link"
              value={form.githubLink}
              onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
            />
            <input
              type="url"
              placeholder="Live Demo"
              value={form.liveDemo}
              onChange={(e) => setForm({ ...form, liveDemo: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-accent/50"
            />
          </div>
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
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-sm text-slate-400 file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-accent/20 file:text-accent"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-400">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="accent-accent"
            />
            Featured project
          </label>
          <button type="submit" disabled={saving} className="btn-gradient w-full justify-center disabled:opacity-60">
            {saving ? 'Saving...' : editingId ? 'Update Project' : 'Create Project'}
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        message="Delete this project permanently? This cannot be undone."
      />
    </div>
  );
};

export default ManageProjects;
