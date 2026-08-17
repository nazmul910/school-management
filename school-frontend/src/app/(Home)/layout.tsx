import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import "../globals.css";
import { AuthProvider } from "../providers/AuthContext";
import QueryProvider from "../providers/QueryProvider";
import { UserProvider } from "../providers/UserContext";
import NavbarNew from "@/components/layout/NavbarNew";
import ScrollToTop from "@/utils/ScrollButton";

export const metadata: Metadata = {
  title: "আইডিয়াল মডেল স্কুল ও কলেজ | Ideal Model School & College",
  description:
    "আধুনিক ও মানসম্মত শিক্ষা ব্যবস্থা, অভিজ্ঞ শিক্ষকমণ্ডলী, ডিজিটাল ক্লাসরুম ও ফলাফল নিয়ে পরিচালিত বাংলাদেশের অন্যতম শীর্ষস্থানীয় বিদ্যালয়।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
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
      </body>
    </html>
  );
}
