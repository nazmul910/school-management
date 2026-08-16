import dynamic from "next/dynamic";

const AllUsers = dynamic(() => import("@/components/admin/AllUsers"));

export default function AllUsersPage() {
  return <AllUsers />;
}
