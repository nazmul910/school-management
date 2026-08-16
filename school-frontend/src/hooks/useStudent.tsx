import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useStudent = () => {
  const axiosSecure = useAxios();
  const {
    data: studentData = [],
    isLoading: studentsLoading,
    refetch: studentsRefetch,
  } = useQuery({
    queryKey: ["studentData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/students");
      return res.data;
    },
    enabled: typeof window !== "undefined",
  });
  return { studentData, studentsLoading, studentsRefetch };
};

export default useStudent;
