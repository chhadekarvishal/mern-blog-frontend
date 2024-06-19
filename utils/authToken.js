// Function to store token in localStorage
export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

// Function to retrieve token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Function to remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem("token");
};
