const SkeletonCard = () => (
  <div className="glass-card p-5 animate-pulse">
    <div className="h-40 rounded-xl bg-white/5 mb-4" />
    <div className="h-4 w-3/4 rounded bg-white/5 mb-3" />
    <div className="h-3 w-full rounded bg-white/5 mb-2" />
    <div className="h-3 w-5/6 rounded bg-white/5 mb-4" />
    <div className="flex gap-2">
      <div className="h-6 w-16 rounded-full bg-white/5" />
      <div className="h-6 w-16 rounded-full bg-white/5" />
    </div>
  </div>
);

export default SkeletonCard;
