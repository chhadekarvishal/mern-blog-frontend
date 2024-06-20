import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hideToast } from "@/redux/slices/toastSlice";

const ToastNotification = () => {
  const dispatch = useDispatch();
  const { message, type, isVisible } = useSelector((state) => state.toast);

  React.useEffect(() => {
    if (isVisible) {
      if (type === "success") {
        toast.success(message, {
          onClose: () => dispatch(hideToast()),
        });
      } else if (type === "error") {
        toast.error(message, {
          onClose: () => dispatch(hideToast()),
        });
      }
    }
  }, [isVisible, message, type, dispatch]);

  return <ToastContainer />;
};

export default ToastNotification;
