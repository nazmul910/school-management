import dynamic from "next/dynamic";

const ManageReviews = dynamic(() => import("@/components/admin/ManageReviews"));

export default function ManageReviewsPage() {
  return <ManageReviews />;
}