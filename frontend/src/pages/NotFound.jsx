import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center pt-16 px-6 text-center">
      <p className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-4">error_404</p>
      <h1 className="text-7xl md:text-9xl font-extrabold text-white mb-4">404</h1>
      <p className="text-slate-400 max-w-md mb-8">
        This route doesn't exist in the system. The page you're looking for may have been moved
        or never existed.
      </p>
      <Link to="/" className="btn-gradient">
        Return Home
      </Link>
    </main>
  );
};

export default NotFound;
