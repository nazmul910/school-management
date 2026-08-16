import dynamic from "next/dynamic";

const TeacherProfile = dynamic(
  () => import("@/components/admin/AdminProfile")
);

export default function AdminProfilePage() {
  return <TeacherProfile />;
}
