import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useMails = () => {
  const axiosSecure = useAxios();
  const {
    data: mailsData = [],
    isLoading: mailsLoading,
    refetch: mailsRefetch,
  } = useQuery({
    queryKey: ["mailsData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/mails");
      return res.data;
    },
    enabled: typeof window !== "undefined",
  });
  return { mailsData, mailsLoading, mailsRefetch };
};

export default useMails;
