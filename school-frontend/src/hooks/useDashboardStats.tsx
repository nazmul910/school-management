"use client";
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useDashboardStats() {
  const axios = useAxios();

  const { data: statsData, isLoading, refetch } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = await axios.get("/dashboard/stats");
      return res.data;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return {
    statsData,
    isLoading,
    refetch,
  };
}
