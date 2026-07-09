import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HiMenu, HiX, HiMoon, HiSun } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Projects', path: '/projects' },
  { label: 'Certificates', path: '/certificates' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-secondary/80 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        <Link to="/" className="font-display font-bold text-xl text-white tracking-tight">
          Lobaz<span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'text-accent bg-accent/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
              end={item.path === '/'}
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="ml-2 p-2 rounded-lg text-slate-300 hover:text-accent hover:bg-white/5 transition-colors"
          >
            {theme === 'dark' ? <HiSun size={18} /> : <HiMoon size={18} />}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="p-2 rounded-lg text-slate-300"
          >
            {theme === 'dark' ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg text-white"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-secondary/95 backdrop-blur-md border-b border-white/5">
          <div className="flex flex-col px-6 py-4 gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'text-accent bg-accent/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
