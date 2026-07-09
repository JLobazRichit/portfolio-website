const ConfirmDialog = ({ isOpen, onCancel, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm glass-card p-6 text-center">
        <p className="text-white mb-6">{message || 'Are you sure you want to delete this item?'}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500/80 hover:bg-red-500 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
