"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useTeachers() {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const { data: teachersData, isLoading, refetch } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const res = await axios.get("/teachers");
      return res.data;
    },
  });

  const addTeacher = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axios.post("/teachers", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  const updateTeacher = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      const res = await axios.put(`/teachers/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  const deleteTeacher = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`/teachers/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  return {
    teachersData,
    isLoading,
    refetch,
    addTeacher,
    updateTeacher,
    deleteTeacher,
  };
}
