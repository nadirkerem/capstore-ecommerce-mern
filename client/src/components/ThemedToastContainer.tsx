import { toast, ToastOptions, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getToastTheme = (): ToastOptions["theme"] => {
  const theme = document.documentElement.getAttribute("data-theme");
  return theme === "sunset" ? "dark" : "light";
};

type ToastType = "info" | "success" | "error" | "warning";

export const themedToast = (
  type: ToastType,
  message: string,
  options?: ToastOptions,
) => {
  const theme = getToastTheme();
  const toastOptions: ToastOptions = { ...options, theme };

  switch (type) {
    case "info":
      toast.info(message, toastOptions);
      break;
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "warning":
      toast.warn(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};

export default function ThemedToastContainer() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Bounce}
    />
  );
}
