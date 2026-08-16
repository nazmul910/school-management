import dynamic from "next/dynamic";

const NoticeStudent = dynamic(
  () => import("@/components/student/NoticeBoard")
);

export default function NoticeStudentPage() {
  return <NoticeStudent />;
}
