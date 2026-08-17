"use client";
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useOnlineCount() {
  const axios = useAxios();

  const { data: onlineData, isLoading, refetch } = useQuery({
    queryKey: ["onlineCount"],
    queryFn: async () => {
      const res = await axios.get("/students/online-count");
      return res.data;
    },
    refetchInterval: 15000, // Polling presence every 15s
  });

  const onlineCount = onlineData?.data?.onlineStudents ?? 25;

  return {
    onlineCount,
    isLoading,
    refetch,
  };
}
