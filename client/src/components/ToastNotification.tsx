import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ErrorMessage = (msg: string) => {
  toast.error(msg, {
    hideProgressBar: true,
    position: "top-center",
    autoClose: 5000,
  });
};

export const InfoMessage = (msg: string) => {
  toast.info(msg, {
    hideProgressBar: true,
    position: "top-center",
    autoClose: 3000,
  });
};

export const SuccessMessage = (msg: string) => {
  toast.success(msg, {
    hideProgressBar: true,
    position: "top-center",
    autoClose: 1000,
  });
};

export const WarningMessage = (msg: string) => {
  toast.dismiss();
  toast.warn(msg, {
    hideProgressBar: true,
    position: "top-center",
    autoClose: 5000,
  });
};

const ToastNotification: React.FC = () => {
  return <ToastContainer pauseOnFocusLoss={true} />;
};

export default ToastNotification;
