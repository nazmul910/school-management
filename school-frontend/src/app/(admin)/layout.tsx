"use client";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "../../utils/ProtectedRoute";
import "../globals.css";
import { AuthProvider } from "../providers/AuthContext";
import { UserProvider } from "../providers/UserContext";
import QueryProvider from "../providers/QueryProvider";
import SmoothScroll from "@/components/common/SmoothScroll";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <AuthProvider>
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserProvider>
                <QueryProvider>
                  <section className="flex min-h-screen items-start">
                    <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                    <section
                      className={`flex-1 z-50 min-h-screen overflow-auto transition-margin duration-300 ease-in-out ${
                        isOpen ? "ml-64" : "ml-28"
                      }`}
                    >
                      <div className="container mx-auto pt-20">
                        {children}
                        <ToastContainer />
                      </div>
                    </section>
                  </section>
                </QueryProvider>
              </UserProvider>
            </ProtectedRoute>
          </AuthProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
