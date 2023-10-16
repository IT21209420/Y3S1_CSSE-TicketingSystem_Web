import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

/**
 * Provides a context for displaying toast messages.
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The JSX element.
 */
export const ToastContextProvider = ({ children }) => {
  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastContainer autoClose={2000} />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
