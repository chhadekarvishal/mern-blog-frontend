import React from "react";
import { useNotification } from "@/context/NotificationContext";

const NotificationBanner = () => {
  const { notification } = useNotification();

  if (!notification.visible) return null;

  const bannerStyles = {
    position: "fixed",
    top: "0",
    width: "100%",
    zIndex: "1000",
    padding: "10px",
    backgroundColor:
      notification.type === "success"
        ? "green"
        : notification.type === "error"
        ? "red"
        : "yellow",
    color: "white",
    textAlign: "center",
  };

  return <div style={bannerStyles}>{notification.message}</div>;
};

export default NotificationBanner;
