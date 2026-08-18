import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import "../globals.css";
import { AuthProvider } from "../providers/AuthContext";
import QueryProvider from "../providers/QueryProvider";
import { UserProvider } from "../providers/UserContext";
import NavbarNew from "@/components/layout/NavbarNew";
import ScrollToTop from "@/utils/ScrollButton";
import SmoothScroll from "@/components/common/SmoothScroll";

export const metadata: Metadata = {
  title: "Uttar Betdoba Fatema Halim High School & College | Excellence in Modern Education",
  description:
    "A premier educational institution dedicated to academic excellence, digital classrooms, experienced faculty, and comprehensive student development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <QueryProvider>
            <UserProvider>
              <AuthProvider>
                <NavbarNew />
                {children}
                <ScrollToTop />
                <Footer />
              </AuthProvider>
            </UserProvider>
          </QueryProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
