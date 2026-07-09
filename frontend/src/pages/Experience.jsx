import { useState, useEffect } from 'react';
import api from '../services/api';
import { staticExperience } from '../constants/staticData';

const typeColors = {
  Internship: 'bg-primary/20 text-primary-light border-primary/30',
  Workshop: 'bg-accent/20 text-accent border-accent/30',
  Hackathon: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Event: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  NCC: 'bg-green-500/20 text-green-300 border-green-500/30',
  Achievement: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data } = await api.get('/experience');
        setExperiences(data.data);
      } catch {
        // Backend/database not reachable - fall back to static content
        setExperiences(staticExperience);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <main className="pt-16">
      <section className="section-container">
        <p className="section-eyebrow" data-aos="fade-up">// experience.timeline</p>
        <h1 className="section-heading" data-aos="fade-up">Experience</h1>
        <p className="text-slate-400 max-w-2xl mb-10" data-aos="fade-up">
          Internships, hackathons, workshops, and leadership milestones along the way.
        </p>

        {loading ? (
          <p className="text-slate-500 font-mono text-sm">loading_timeline...</p>
        ) : experiences.length === 0 ? (
          <p className="text-slate-500 font-mono text-sm">no_experience_entries_yet</p>
        ) : (
          <div className="relative border-l-2 border-white/10 ml-3">
            {experiences.map((exp, idx) => (
              <div key={exp._id} className="mb-10 ml-8 relative" data-aos="fade-up" data-aos-delay={idx * 60}>
                <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-gradient-primary shadow-glow" />
                <div className="glass-card p-5">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-semibold text-white">{exp.title}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-mono ${
                        typeColors[exp.type] || typeColors.Event
                      }`}
                    >
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-1">{exp.organization}</p>
                  <p className="text-xs font-mono text-accent mb-3">
                    {new Date(exp.startDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
                    {exp.endDate &&
                      ` – ${new Date(exp.endDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}`}
                    {exp.location ? ` • ${exp.location}` : ''}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">{exp.description}</p>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-sm text-accent hover:text-accent-light mt-3"
                    >
                      Learn more →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Experience;
