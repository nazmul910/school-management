import "@/app/globals.css";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../providers/AuthContext";
import QueryProvider from "../providers/QueryProvider";
import SmoothScroll from "@/components/common/SmoothScroll";

export const metadata: Metadata = {
  title: "School Management System | Authentication",
  description: "Secure login and authentication portal for students, teachers, and administrators.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <QueryProvider>
            <AuthProvider>
              {children}
              <ToastContainer />
            </AuthProvider>
          </QueryProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
