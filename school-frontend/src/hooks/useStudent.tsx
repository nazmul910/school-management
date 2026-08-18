"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useStudent(filters: Record<string, any> = {}) {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const { data: studentData, isLoading, refetch } = useQuery({
    queryKey: ["students", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.class && filters.class !== "all") {
        params.append("class", filters.class);
      }
      if (filters.section && filters.section !== "all") {
        params.append("section", filters.section);
      }
      if (filters.group && filters.group !== "all") {
        params.append("group", filters.group);
      }
      if (filters.roll) {
        params.append("roll", filters.roll);
      }
      if (filters.searchTerm) {
        params.append("searchTerm", filters.searchTerm);
      }

      const queryString = params.toString();
      const url = queryString ? `/students?${queryString}` : "/students";
      const res = await axios.get(url);
      return res.data;
    },
  });

  const addStudent = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axios.post("/students", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  const updateStudent = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      const res = await axios.put(`/students/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  const deleteStudent = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`/students/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  return {
    studentData,
    isLoading,
    refetch,
    addStudent,
    updateStudent,
    deleteStudent,
  };
}
