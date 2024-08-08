import React, { createContext, useContext, useState, ReactNode } from "react";
import { Toast } from "@components/Toast"; // Importe seu componente Toast aqui

interface ToastContextProps {
  showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const showToast = (message: string, duration: number = 3000) => {
    setMessage(message);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, duration); // Duração do toast
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={message} visible={visible} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
