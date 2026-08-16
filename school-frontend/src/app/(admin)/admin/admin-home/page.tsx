import dynamic from "next/dynamic";

const AdminHome = dynamic(
  () => import("@/components/admin/AdminHome")
);

export default function AdminHomePage() {
  return <AdminHome />;
}
