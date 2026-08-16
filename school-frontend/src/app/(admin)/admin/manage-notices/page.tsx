import dynamic from "next/dynamic";

const ManageNotice = dynamic(
  () => import("@/components/admin/ManageNotices")
);

export default function MangaeNoticePage() {
  return <ManageNotice />;
}
