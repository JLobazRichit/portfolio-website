import { useState, useEffect } from 'react';
import { HiOutlineExternalLink, HiOutlineBadgeCheck } from 'react-icons/hi';
import api from '../services/api';
import SkeletonCard from '../components/SkeletonCard';
import { staticCertificates } from '../constants/staticData';

const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

const categories = ['All', 'AI/ML', 'Programming', 'MatLab', 'Virtual Internship', 'Other'];

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const params = category !== 'All' ? { category } : {};
        const { data } = await api.get('/certificates', { params });
        setCertificates(data.data);
      } catch {
        // Backend/database not reachable - fall back to static content
        let filtered = staticCertificates;
        if (category !== 'All') filtered = filtered.filter((c) => c.category === category);
        setCertificates(filtered);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, [category]);

  return (
    <main className="pt-16">
      <section className="section-container">
        <p className="section-eyebrow" data-aos="fade-up">// certificates.gallery</p>
        <h1 className="section-heading" data-aos="fade-up">Certificates</h1>
        <p className="text-slate-400 max-w-2xl mb-8" data-aos="fade-up">
          15+ certifications across AI/ML, programming, and virtual internships from Infosys
          Springboard, Forage, and other platforms.
        </p>

        <div className="flex flex-wrap gap-2 mb-10" data-aos="fade-up">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-gradient-primary text-white'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : certificates.length === 0 ? (
          <p className="text-center text-slate-500 py-16 font-mono text-sm">
            no_certificates_found for this category.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, idx) => {
              const imageSrc = cert.image
                ? cert.image.startsWith('/uploads/')
                  ? `${API_ORIGIN}${cert.image}`
                  : cert.image
                : null;
              return (
                <div
                  key={cert._id}
                  className="glass-card overflow-hidden flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay={(idx % 3) * 80}
                >
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                    {imageSrc ? (
                      <img src={imageSrc} alt={cert.title} className="w-full h-full object-cover" />
                    ) : (
                      <HiOutlineBadgeCheck className="text-accent/50" size={48} />
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-white mb-1">{cert.title}</h3>
                    <p className="text-sm text-slate-400 mb-1">{cert.organization}</p>
                    <p className="text-xs font-mono text-accent mb-4">
                      {new Date(cert.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
                    </p>
                    {cert.certificateLink && (
                      <a
                        href={cert.certificateLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm text-accent hover:text-accent-light mt-auto"
                      >
                        <HiOutlineExternalLink size={16} /> View Certificate
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Certificates;
