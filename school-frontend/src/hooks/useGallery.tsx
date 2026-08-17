"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useGallery(category?: string) {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const { data: galleryData, isLoading, refetch } = useQuery({
    queryKey: ["gallery", category],
    queryFn: async () => {
      const url = category && category !== "all" && category !== "সকল"
        ? `/gallery?category=${encodeURIComponent(category)}`
        : "/gallery";
      const res = await axios.get(url);
      return res.data;
    },
  });

  const addGalleryItem = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axios.post("/gallery", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  const updateGalleryItem = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      const res = await axios.put(`/gallery/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  const deleteGalleryItem = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`/gallery/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  return {
    galleryData,
    isLoading,
    refetch,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
  };
}
