"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useReviews(status?: string) {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const { data: reviewsData, isLoading, refetch } = useQuery({
    queryKey: ["reviews", status],
    queryFn: async () => {
      const url = status && status !== "all" ? `/reviews?status=${status}` : "/reviews";
      const res = await axios.get(url);
      return res.data;
    },
  });

  const addReview = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axios.post("/reviews", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  const changeReviewStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "approved" | "pending" }) => {
      const res = await axios.patch(`/reviews/change-status/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  const deleteReview = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  return {
    reviewsData,
    isLoading,
    refetch,
    addReview,
    changeReviewStatus,
    deleteReview,
  };
}
