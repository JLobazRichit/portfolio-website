import { useEffect, useRef, useState } from 'react';
import { skills } from '../constants/personalData';

const SkillBar = ({ name, level }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-300 font-medium">{name}</span>
        <span className="text-accent font-mono text-xs">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-primary transition-all duration-1000 ease-out"
          style={{ width: inView ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <main className="pt-16">
      <section className="section-container">
        <p className="section-eyebrow" data-aos="fade-up">// skills.json</p>
        <h1 className="section-heading" data-aos="fade-up">Technical Skills</h1>
        <p className="text-slate-400 max-w-2xl mb-10" data-aos="fade-up">
          A breakdown of the languages, frameworks, and tools I work with, from embedded IoT
          firmware to full-stack web development and AI/ML.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items], idx) => (
            <div key={category} className="glass-card p-6" data-aos="fade-up" data-aos-delay={idx * 50}>
              <h2 className="text-lg font-semibold text-white mb-5">{category}</h2>
              {items.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Skills;
