import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useReviews = () => {
  const axiosSecure = useAxios();
  const {
    data: reviewsData = [],
    isLoading: reviewsLoading,
    refetch: reviewsRefetch,
  } = useQuery({
    queryKey: ["reviewsData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
    enabled: typeof window !== "undefined",
  });
  return { reviewsData, reviewsLoading, reviewsRefetch };
};

export default useReviews;
