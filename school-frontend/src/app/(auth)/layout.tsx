import "@/app/globals.css";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../providers/AuthContext";
import QueryProvider from "../providers/QueryProvider";
export const metadata: Metadata = {
  title: "Dawah Quran Academy",
  description:
    "Learn Quran online with expert tutors, interactive lessons, and personalized guidance.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            {children}
            <ToastContainer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
