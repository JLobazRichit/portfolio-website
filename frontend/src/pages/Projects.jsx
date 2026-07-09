import { useState, useEffect, useCallback } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import api from '../services/api';
import ProjectCard from '../components/ProjectCard';
import SkeletonCard from '../components/SkeletonCard';
import { staticProjects } from '../constants/staticData';

const categories = ['All', 'IoT', 'Web Development', 'AI/ML', 'Full Stack', 'Embedded Systems', 'Other'];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (category !== 'All') params.category = category;

      const { data } = await api.get('/projects', { params });
      setProjects(data.data);
    } catch (err) {
      // Backend/database not reachable - fall back to static content so the page still works
      let filtered = staticProjects;
      if (category !== 'All') filtered = filtered.filter((p) => p.category === category);
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.technologies.some((t) => t.toLowerCase().includes(q))
        );
      }
      setProjects(filtered);
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    const timeout = setTimeout(fetchProjects, 300); // debounce search
    return () => clearTimeout(timeout);
  }, [fetchProjects]);

  return (
    <main className="pt-16">
      <section className="section-container">
        <p className="section-eyebrow" data-aos="fade-up">// projects.map()</p>
        <h1 className="section-heading" data-aos="fade-up">Projects</h1>
        <p className="text-slate-400 max-w-2xl mb-8" data-aos="fade-up">
          IoT systems, AI/ML experiments, and full-stack builds — search or filter by category below.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-10" data-aos="fade-up">
          <div className="relative flex-1">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search projects by name, tech, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-accent/50 outline-none transition-colors"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-accent/50 outline-none transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-secondary">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-400 text-center mb-6">{error}</p>}

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center text-slate-500 py-16 font-mono text-sm">
            no_projects_found — try a different search or category.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div key={project._id} data-aos="fade-up" data-aos-delay={(idx % 3) * 80}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Projects;
