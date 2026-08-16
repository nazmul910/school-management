import dynamic from "next/dynamic";

const StudentProfile = dynamic(
  () => import("@/components/student/StudentProfile")
);

export default function StudentProfilePage() {
  return <StudentProfile />;
}
