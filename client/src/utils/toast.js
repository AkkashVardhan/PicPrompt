import { toast } from "react-toastify";

export const showToast = (message) => {
  return toast(message, {
    style: {
      background: "#1a1a1a",
      color: "#fff",
      borderRadius: "8px",
      fontSize: "14px",
      padding: "12px 16px",
      position: "relative",
      overflow: "hidden",
    },
    className: "toast-with-progress",
    icon: false,
    autoClose: 3000,
    progressStyle: { background: "rgba(255, 255, 255, 0.7)" },
    hideProgressBar: false,
  });
};
