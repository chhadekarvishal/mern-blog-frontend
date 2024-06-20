import Cookies from "js-cookie";

// Function to store token in cookie
export const storeToken = (token) => {
  Cookies.set("token", token, { expires: 7 }); // Token expires in 7 days
};

// Function to retrieve token from cookie
export const getToken = () => {
  return Cookies.get("token");
};

// Function to remove token from cookie
export const removeToken = () => {
  Cookies.remove("token");
};
