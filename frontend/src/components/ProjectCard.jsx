import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

const ProjectCard = ({ project }) => {
  // Images from the backend are stored as "/uploads/xxx.jpg" and need the API server address.
  // Images added directly to the public folder (e.g. "/projects/xxx.jpg") are used as-is.
  const imageSrc = project.image
    ? project.image.startsWith('/uploads/')
      ? `${API_ORIGIN}${project.image}`
      : project.image
    : null;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="glass-card overflow-hidden flex flex-col h-full"
    >
      <div className="h-44 bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center overflow-hidden">
        {imageSrc ? (
          <img src={imageSrc} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <span className="font-mono text-xs text-slate-500">no_preview_image</span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-white">{project.title}</h3>
          <span className="text-xs font-mono text-accent">
            {new Date(project.date).getFullYear()}
          </span>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-full bg-white/5 text-slate-300 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-auto">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-accent transition-colors"
            >
              <FaGithub size={16} /> Code
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-accent transition-colors"
            >
              <FaExternalLinkAlt size={14} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
