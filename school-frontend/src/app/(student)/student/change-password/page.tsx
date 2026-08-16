import dynamic from "next/dynamic";

const ChangeStudentPassword = dynamic(
  () => import("@/components/student/ChangePassword")
);

export default function ChangeStudentPasswordPage() {
  return <ChangeStudentPassword />;
}
