import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useCourses = () => {
  const axiosSecure = useAxios();
  const {
    data: coursesData = [],
    isLoading: coursesLoading,
    refetch: coursesRefetch,
  } = useQuery({
    queryKey: ["coursesData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses");
      return res.data;
    },
    enabled: typeof window !== "undefined",
  });
  return { coursesData, coursesLoading, coursesRefetch };
};

export default useCourses;
