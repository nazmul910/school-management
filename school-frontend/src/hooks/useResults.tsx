"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useResults(query: Record<string, any> = {}) {
  const axios = useAxios();
  const queryClient = useQueryClient();

  // All results
  const { data: resultsData, isLoading, refetch } = useQuery({
    queryKey: ["results", query],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (query.class && query.class !== "all") params.append("class", query.class);
      if (query.examType) params.append("examType", query.examType);
      if (query.examYear) params.append("examYear", query.examYear);
      if (query.roll) params.append("roll", query.roll);

      const qs = params.toString();
      const url = qs ? `/results?${qs}` : "/results";
      const res = await axios.get(url);
      return res.data;
    },
  });

  // Top 10 results by class
  const { data: top10Data, isLoading: isTop10Loading, refetch: refetchTop10 } = useQuery({
    queryKey: ["results-top-10", query.year || "2025"],
    queryFn: async () => {
      const res = await axios.get(`/results/top-10?year=${query.year || "2025"}`);
      return res.data;
    },
  });

  const addResult = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axios.post("/results", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["results"] });
      queryClient.invalidateQueries({ queryKey: ["results-top-10"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  const updateResult = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      const res = await axios.put(`/results/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["results"] });
      queryClient.invalidateQueries({ queryKey: ["results-top-10"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  const deleteResult = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`/results/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["results"] });
      queryClient.invalidateQueries({ queryKey: ["results-top-10"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  return {
    resultsData,
    top10Data,
    isLoading,
    isTop10Loading,
    refetch,
    refetchTop10,
    addResult,
    updateResult,
    deleteResult,
  };
}
