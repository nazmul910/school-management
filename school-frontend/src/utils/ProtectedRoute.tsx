// components/ProtectedRoute.tsx
"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

type JwtPayload = {
  role: string;
  exp: number;
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  //   const auth = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Access denied. Please log in.");
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!allowedRoles.includes(decoded.role)) {
        console.log(decoded.role);

        toast.error("You are not authorized to access this page.");
        router.back();
        return;
      }

      setIsAuthorized(true);
    } catch (error) {
      toast.error("Invalid token. Please login again.");
      router.push("/login");
    }
  }, []);

  if (!isAuthorized) return null;

  return <>{children}</>;
}
