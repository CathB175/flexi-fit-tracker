import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Animate in
    const timer = setTimeout(() => {
      setVisible(false); // Animate out
      setTimeout(onClose, 500); // Allow fade-out to finish before unmounting
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 bg-brand-primary text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-500 ease-in-out z-50 ${
        visible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-5'
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
