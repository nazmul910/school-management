"use client";
import StudentSidebar from "@/components/layout/StudentSidebar";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "../globals.css";
import { AuthProvider } from "../providers/AuthContext";
import { UserProvider } from "../providers/UserContext";
import ProtectedRoute from "@/utils/ProtectedRoute";
import QueryProvider from "../providers/QueryProvider";

export default function Sidebar({ children }: { children: React.ReactNode }) {
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
    <html>
      <body>
        <AuthProvider>
          <ProtectedRoute allowedRoles={["student"]}>
            <UserProvider>
              <QueryProvider>
                <section className="flex min-h-screen items-start">
                  <StudentSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                  <section
                    className={`flex-1 z-50 min-h-screen overflow-auto transition-margin duration-300 ease-in-out ${
                      isOpen ? "ml-64" : "ml-28"
                    }`}
                  >
                    <div className="container mx-auto">
                      {children}
                      <ToastContainer />
                    </div>
                  </section>
                </section>
              </QueryProvider>
            </UserProvider>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
