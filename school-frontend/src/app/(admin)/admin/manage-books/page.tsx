import dynamic from "next/dynamic";

const ManageBooks = dynamic(
  () => import("@/components/admin/ManageBooks")
);

export default function ManageBooksPage() {
  return <ManageBooks />;
}
