import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // baseURL: "https://quran-academy-backend.onrender.com/api/v1",
});

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
