import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../constants/personalData';

const quickLinks = [
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact', path: '/contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-secondary/60 mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display font-bold text-xl text-white mb-2">
            {personalInfo.name}
          </h3>
          <p className="text-slate-400 text-sm max-w-xs">{personalInfo.title} building smart, connected systems.</p>
          <div className="flex gap-3 mt-4">
            <a href={socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub"
               className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-accent hover:bg-white/10 transition-colors">
              <FaGithub size={18} />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
               className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-accent hover:bg-white/10 transition-colors">
              <FaLinkedin size={18} />
            </a>
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
                 className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-accent hover:bg-white/10 transition-colors">
                <FaInstagram size={18} />
              </a>
            )}
            <a href={socialLinks.email} aria-label="Email"
               className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-accent hover:bg-white/10 transition-colors">
              <FaEnvelope size={18} />
            </a>
            <a href={socialLinks.phone} aria-label="Phone"
               className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-accent hover:bg-white/10 transition-colors">
              <FaPhone size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-slate-400 hover:text-white text-sm transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">Get in Touch</h4>
          <p className="text-slate-400 text-sm">{personalInfo.email}</p>
          <p className="text-slate-400 text-sm mt-1">{personalInfo.phone}</p>
          <p className="text-slate-400 text-sm mt-1">{personalInfo.location}</p>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center">
        <p className="text-slate-500 text-xs font-mono">
          © {year} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
