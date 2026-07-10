import { personalInfo, education, languages, interests, achievements } from '../constants/personalData';
import { HiOutlineAcademicCap, HiOutlineGlobeAlt, HiOutlineHeart, HiOutlineBadgeCheck } from 'react-icons/hi';

const About = () => {
  return (
    <main className="pt-16">
      <section className="section-container">
        <p className="section-eyebrow" data-aos="fade-up">// whoami</p>
        <h1 className="section-heading" data-aos="fade-up">About Me</h1>

        <div className="grid md:grid-cols-2 gap-10 mt-10">
          <div data-aos="fade-right">
            <h2 className="text-xl font-semibold text-white mb-3">Biography</h2>
            <p className="text-slate-400 leading-relaxed mb-6">{personalInfo.aboutbio}</p>

            <h2 className="text-xl font-semibold text-white mb-3">Career Objective</h2>
            <p className="text-slate-400 leading-relaxed">{personalInfo.objective}</p>
          </div>

          <div className="glass-card p-6" data-aos="fade-left">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineAcademicCap className="text-accent" size={22} />
              <h2 className="text-xl font-semibold text-white">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-accent/30 pl-4">
                  <h3 className="font-semibold text-white">{edu.degree}</h3>
                  <p className="text-sm text-slate-400">{edu.institution}</p>
                  <p className="text-sm font-mono text-accent">{edu.duration}</p>
                  <p className="text-sm text-slate-300">{edu.score}</p>
                  {edu.details && <p className="text-xs text-slate-500 mt-1">{edu.details}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="glass-card p-6" data-aos="fade-up">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineGlobeAlt className="text-accent" size={20} />
              <h3 className="font-semibold text-white">Languages</h3>
            </div>
            <ul className="space-y-1">
              {languages.map((lang) => (
                <li key={lang} className="text-slate-400 text-sm">{lang}</li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineHeart className="text-accent" size={20} />
              <h3 className="font-semibold text-white">Interests</h3>
            </div>
            <ul className="space-y-1">
              {interests.map((interest) => (
                <li key={interest} className="text-slate-400 text-sm">{interest}</li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineBadgeCheck className="text-accent" size={20} />
              <h3 className="font-semibold text-white">Achievements</h3>
            </div>
            <ul className="space-y-2">
              {achievements.map((item, idx) => (
                <li key={idx} className="text-slate-400 text-xs leading-relaxed">• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
