import { useEffect } from 'react';

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full max-h-[80vh] overflow-y-auto text-black">
        <button className="absolute top-2 right-2 text-black hover:text-gray-900" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}