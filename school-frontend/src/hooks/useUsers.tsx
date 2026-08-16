import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useUsers = () => {
  const axiosSecure = useAxios();
  const {
    data: usersData = [],
    isLoading: usersLoading,
    refetch: usersRefetch,
  } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
    enabled: typeof window !== "undefined",
  });
  return { usersData, usersLoading, usersRefetch };
};

export default useUsers;
