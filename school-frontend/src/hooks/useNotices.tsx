"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useNotices() {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const { data: noticesData, isLoading, refetch } = useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      const res = await axios.get("/notices");
      return res.data;
    },
  });

  const addNotice = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axios.post("/notices", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  const updateNotice = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      const res = await axios.put(`/notices/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  const deleteNotice = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`/notices/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  return {
    noticesData,
    isLoading,
    refetch,
    addNotice,
    updateNotice,
    deleteNotice,
  };
}
