import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useNotices = () => {
  const axiosSecure = useAxios();
  const {
    data: noticesData = [],
    isLoading: noticesLoading,
    refetch: noticesRefetch,
  } = useQuery({
    queryKey: ["noticesData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/notices");
      console.log(res)
      return res.data;
    },
    enabled: typeof window !== "undefined",
  });
  return { noticesData, noticesLoading, noticesRefetch };
};

export default useNotices;
