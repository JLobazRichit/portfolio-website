const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-secondary">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-accent/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-accent rounded-full animate-spin" />
      </div>
      <p className="mt-4 font-mono text-xs tracking-[0.3em] uppercase text-accent">
        booting_system...
      </p>
    </div>
  );
};

export default Loader;
