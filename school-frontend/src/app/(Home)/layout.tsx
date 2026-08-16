import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import type { Metadata } from "next";
import "../globals.css";
import { AuthProvider } from "../providers/AuthContext";
import QueryProvider from "../providers/QueryProvider";
import { UserProvider } from "../providers/UserContext";
import NavbarNew from "@/components/layout/NavbarNew";
import ScrollToTop from "@/utils/ScrollButton";

export const metadata: Metadata = {
  title: "Dawah Quran Academy",
  description:
    "Learn Quran online with expert tutors, interactive lessons, and personalized guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <UserProvider>
            <AuthProvider>
              {/* <Navbar /> */}
              <NavbarNew/>
              {children}
              <ScrollToTop/>
              <Footer />
            </AuthProvider>
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
