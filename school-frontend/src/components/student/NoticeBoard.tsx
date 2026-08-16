"use client";
import NoticeBox from "@/app/(admin)/admin/manage-notices/NoticeBox";
import useNotices from "@/hooks/useNotices";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { TNotice } from "@/types/notice.type";

export default function NoticeBoard() {
  const { noticesData, noticesLoading, noticesRefetch } = useNotices();

  if (noticesLoading) return <LoadingSpinner />;
  return (
    <section>
      <DashboardTitle blackText="Notice" greenText="Board" className="mt-10" />

      <div className="my-5 space-y-5">
        {noticesData.data &&
          noticesData.data.map((notice: TNotice) => (
            <NoticeBox
              key={notice?._id}
              notice={notice}
              refetch={noticesRefetch}
              isAdmin={false}
            />
          ))}
      </div>
    </section>
  );
}
