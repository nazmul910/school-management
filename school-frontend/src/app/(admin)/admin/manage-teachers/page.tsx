import dynamic from "next/dynamic";

const ManageTeachers = dynamic(
  () => import("@/components/admin/ManageTeachers")
);

export default function ManageTeachersPage() {
  return <ManageTeachers />;
}
