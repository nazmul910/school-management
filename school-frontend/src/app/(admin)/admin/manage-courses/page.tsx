import dynamic from "next/dynamic";

const ManageCourses = dynamic(
  () => import("@/components/admin/ManageCourses")
);

export default function ManageCoursesPage() {
  return <ManageCourses />;
}
