import React, { createContext, useContext, useState, ReactNode } from "react";
import { Toast } from "@components/Toast";

interface ToastContextProps {
  showToast: {
    error: (message: string, duration?: number) => void;
    success: (message: string, duration?: number) => void;
  };
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<"SUCCESS" | "ERROR">("SUCCESS");
  const [message, setMessage] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const showToast = {
    error: (message: string, duration: number = 3000) => {
      setType("ERROR");
      setMessage(message);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, duration); // Duração do toast
    },
    success: (message: string, duration: number = 3000) => {
      setType("SUCCESS");
      setMessage(message);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, duration); // Duração do toast
    },
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast type={type} message={message} visible={visible} />
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
