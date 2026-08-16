import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useTeachers = () => {
  const axiosSecure = useAxios();
  const {
    data: teachersData = [],
    isLoading: teachersLoading,
    refetch: teachersRefetch,
  } = useQuery({
    queryKey: ["teachersData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teachers");
      return res.data;
    },
    enabled: typeof window !== "undefined",
  });
  return { teachersData, teachersLoading, teachersRefetch };
};

export default useTeachers;
