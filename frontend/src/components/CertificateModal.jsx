import { useState } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

const CertificateModal = ({ isOpen, onClose, certificateLink, title }) => {
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Convert raw GitHub URL to Google Docs Viewer for proper display
  const getViewerUrl = (url) => {
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  const viewerUrl = getViewerUrl(certificateLink);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-slate-800/50">
          <h2 className="text-lg font-semibold text-white truncate">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
            aria-label="Close modal"
          >
            <HiOutlineXMark size={24} />
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden flex items-center justify-center bg-slate-950">
          {pdfError ? (
            <div className="text-center p-8">
              <p className="text-slate-400 mb-4">Unable to display PDF in browser</p>
              <a
                href={certificateLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Open Certificate
              </a>
            </div>
          ) : (
            <>
              {isPdfLoading && (
                <div className="absolute">
                  <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <iframe
                src={viewerUrl}
                className="w-full h-full border-0"
                onLoad={() => setIsPdfLoading(false)}
                onError={() => {
                  setIsPdfLoading(false);
                  setPdfError(true);
                }}
                title={`${title} Certificate`}
                allow="autoplay"
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-800/50 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            {pdfError ? "Download to view full certificate" : "Powered by Google Docs Viewer"}
          </p>
          <a
            href={certificateLink}
            download
            className="px-4 py-2 bg-accent text-slate-950 font-semibold rounded-lg hover:bg-accent-light transition-colors"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
