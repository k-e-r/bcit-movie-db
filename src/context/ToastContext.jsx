import { createContext, useRef, useState } from "react";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);
  const closeTimerRef = useRef(null);

  const showToast = (message) => {
    clearTimeout(timerRef.current);
    clearTimeout(closeTimerRef.current);

    setToast({
      id: Date.now(),
      message,
      isClosing: false,
    });

    closeTimerRef.current = setTimeout(() => {
      setToast((prev) =>
        prev ? { ...prev, isClosing: true } : null
      );
    }, 19700);

    timerRef.current = setTimeout(() => {
      setToast(null);
    }, 20000);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};