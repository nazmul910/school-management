import dynamic from "next/dynamic";

const ChangePassword = dynamic(
  () => import("@/components/admin/ChangePassword")
);

export default function ChangePasswordPage() {
  return <ChangePassword />;
}
