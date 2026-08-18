"use client";

import NoticeBox from "@/app/(admin)/admin/manage-notices/NoticeBox";
import useNotices from "@/hooks/useNotices";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { TNotice } from "@/types/notice.type";
import { IoNotificationsOutline } from "react-icons/io5";

export default function NoticeBoard() {
  const { noticesData, isLoading, refetch } = useNotices();
  const notices = noticesData?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <DashboardTitle blackText="Notice" greenText="Board" className="text-center" />

      <div className="my-8 space-y-4">
        {notices.length > 0 ? (
          notices.map((notice: TNotice) => (
            <NoticeBox
              key={notice?._id}
              notice={notice}
              refetch={refetch}
              isAdmin={false}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="w-16 h-16 rounded-2xl bg-[#B4E1EB]/30 text-[#78A4CB] flex items-center justify-center text-3xl mb-3">
              <IoNotificationsOutline />
            </div>
            <h3 className="text-lg font-bold text-[#1e3a5f]">No notices at the moment</h3>
            <p className="text-xs text-gray-400 mt-1">New school notices will appear here when published.</p>
          </div>
        )}
      </div>
    </section>
  );
}
