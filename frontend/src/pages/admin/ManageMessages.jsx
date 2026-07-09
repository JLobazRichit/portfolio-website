import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { HiOutlineTrash, HiOutlineMailOpen, HiOutlineMail } from 'react-icons/hi';
import api from '../../services/api';
import ConfirmDialog from '../../components/ConfirmDialog';
import Modal from '../../components/Modal';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewing, setViewing] = useState(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/messages');
      setMessages(data.data);
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const openMessage = async (msg) => {
    setViewing(msg);
    if (!msg.isRead) {
      try {
        await api.put(`/messages/${msg._id}/read`);
        setMessages((prev) => prev.map((m) => (m._id === msg._id ? { ...m, isRead: true } : m)));
      } catch {
        // silent fail - not critical
      }
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/messages/${deleteTarget}`);
      toast.success('Message deleted');
      setDeleteTarget(null);
      fetchMessages();
    } catch {
      toast.error('Failed to delete message');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Contact Messages</h1>
        <p className="text-slate-400">Messages submitted through the contact form.</p>
      </div>

      {loading ? (
        <p className="text-slate-500 font-mono text-sm">loading_messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-slate-500 font-mono text-sm">no_messages_yet</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`glass-card p-5 flex items-center justify-between gap-4 cursor-pointer ${
                !msg.isRead ? 'border-l-4 border-l-accent' : ''
              }`}
              onClick={() => openMessage(msg)}
            >
              <div className="flex items-center gap-4 min-w-0">
                {msg.isRead ? (
                  <HiOutlineMailOpen className="text-slate-500 shrink-0" size={20} />
                ) : (
                  <HiOutlineMail className="text-accent shrink-0" size={20} />
                )}
                <div className="min-w-0">
                  <p className="text-white font-medium truncate">{msg.subject}</p>
                  <p className="text-sm text-slate-400 truncate">{msg.name} • {msg.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-slate-500 hidden sm:block">
                  {new Date(msg.createdAt).toLocaleDateString('en-IN')}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(msg._id);
                  }}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <HiOutlineTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={!!viewing} onClose={() => setViewing(null)} title={viewing?.subject || 'Message'}>
        {viewing && (
          <div className="space-y-3">
            <p className="text-sm text-slate-400">
              From <span className="text-white">{viewing.name}</span> ({viewing.email})
            </p>
            <p className="text-xs font-mono text-slate-500">
              {new Date(viewing.createdAt).toLocaleString('en-IN')}
            </p>
            <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{viewing.message}</p>
            <a
              href={`mailto:${viewing.email}?subject=Re: ${viewing.subject}`}
              className="btn-gradient w-full justify-center mt-2"
            >
              Reply via Email
            </a>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        message="Delete this message permanently? This cannot be undone."
      />
    </div>
  );
};

export default ManageMessages;
