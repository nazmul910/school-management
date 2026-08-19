import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://school-management-h9j9.onrender.com/api/v1",
});

//https://school-management-h9j9.onrender.com/    http://localhost:5000

const useAxios = () => {
  return axiosSecure;
};

axiosSecure.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = token;
    }
  }
  return config;
});

export default useAxios;
