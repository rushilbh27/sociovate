import React, { useEffect } from 'react';
import './Modal.css';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="f-modal-overlay" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div
        className="f-modal"
        onMouseDown={(e) => e.stopPropagation()}
        role="document"
        aria-label={title}
      >
        <header className="f-modal-header">
          <h2>{title}</h2>
          <button aria-label="Close modal" className="f-modal-close" onClick={onClose}>×</button>
        </header>
        <div className="f-modal-body">{children}</div>
      </div>
    </div>
  );
}
