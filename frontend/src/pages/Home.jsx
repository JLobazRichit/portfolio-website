import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { HiOutlineDownload, HiOutlineMail, HiOutlineChevronDown } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../constants/personalData';

const Home = () => {
  return (
    <main className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Animated floating orbs - ambient background */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float pointer-events-none" />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float pointer-events-none"
        style={{ animationDelay: '2s' }}
      />

      <div className="section-container relative z-10 grid md:grid-cols-[1.2fr_0.8fr] items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-eyebrow">// portfolio</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            Hi, I'm {personalInfo.name.split(' ')[0]}{' '}
            <span className="text-accent">{personalInfo.name.split(' ').slice(1).join(' ')}</span>
          </h1>

          <div className="text-xl md:text-2xl font-mono text-slate-300 h-10 mb-6">
            <TypeAnimation
              sequence={personalInfo.taglineRoles.flatMap((role) => [role, 2000])}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor
            />
          </div>

          <p className="text-slate-400 max-w-xl mb-8 leading-relaxed">{personalInfo.bio}</p>

          <div className="flex flex-wrap gap-4">
            <a href={personalInfo.resumeUrl} download className="btn-gradient">
              <HiOutlineDownload size={18} /> Download Resume
            </a>
            <Link to="/contact" className="btn-outline">
              <HiOutlineMail size={18} /> Hire Me
            </Link>
          </div>

          <div className="flex gap-4 mt-8">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl glass-card text-slate-300 hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl glass-card text-slate-300 hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-primary blur-2xl opacity-40 animate-pulse-slow" />
            <div className="relative w-90 h-90 md:w-90 md:h-90 rounded-full border-4 border-accent/30 overflow-hidden glass-card">
              <img
                src="/profile.jpg"
                alt={personalInfo.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <HiOutlineChevronDown size={24} />
      </motion.div>
    </main>
  );
};

export default Home;
