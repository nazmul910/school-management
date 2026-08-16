import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useBooks = () => {
  const axiosSecure = useAxios();
  const {
    data: booksData = [],
    isLoading: booksLoading,
    refetch: booksRefetch,
  } = useQuery({
    queryKey: ["booksData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
    enabled: typeof window !== "undefined",
  });
  return { booksData, booksLoading, booksRefetch };
};

export default useBooks;
