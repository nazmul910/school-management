import dynamic from "next/dynamic";

const ReviewStudent = dynamic(() => import("@/components/student/MyReviews"));

export default function ReviewStudentPage() {
  return <ReviewStudent />;
}
