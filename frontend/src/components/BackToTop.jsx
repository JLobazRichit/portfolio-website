import { useState, useEffect } from 'react';
import { HiArrowUp } from 'react-icons/hi';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-primary text-white shadow-glow hover:-translate-y-1 transition-transform duration-300"
    >
      <HiArrowUp size={20} />
    </button>
  );
};

export default BackToTop;
