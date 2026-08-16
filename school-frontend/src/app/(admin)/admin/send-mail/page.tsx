import dynamic from "next/dynamic";

const SentMail = dynamic(() => import("@/components/admin/SendMail"));

export default function SentMailsPage() {
  return <SentMail />;
}