"use client";

import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser(decoded);
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      }
    }
    setLoading(false);
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const handleLogout = (router: any) => {
  console.log("Logging out...");
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      localStorage.removeItem("accessToken");
      toast.success("Logout Successful");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      toast.error("Logout Failed Token Not Found");
    }
  }
};
