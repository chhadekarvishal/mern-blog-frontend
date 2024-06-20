"use client";

// import { Provider } from "react-redux";
// import store from "../redux/store";

// const Providers = ({ children }) => {
//   return <Provider store={store}>{children}</Provider>;
// };

// export default Providers;
// app/provider.js
import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import ToastNotification from "@/components/ToastNotification";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <ToastNotification />
    </Provider>
  );
};

export default Providers;
