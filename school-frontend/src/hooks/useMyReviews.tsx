import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useMyReviews = () => {
  const axiosSecure = useAxios();
  const {
    data: myReviewsData = [],
    isLoading: myReviewsLoading,
    refetch: myReviewsRefetch,
  } = useQuery({
    queryKey: ["myReviewsData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews/my-reviews");
      return res.data;
    },
    enabled: typeof window !== "undefined",
  });
  return { myReviewsData, myReviewsLoading, myReviewsRefetch };
};

export default useMyReviews;
