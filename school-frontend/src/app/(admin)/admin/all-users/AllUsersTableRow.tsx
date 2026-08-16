import useAxios from "@/hooks/useAxios";
import { TUser } from "@/types/user.type";
import { toast } from "react-toastify";

interface IuserData {
  user: TUser;
  refetch: () => void;
  index: number;
}

const AllUsersTableRow = ({ user, refetch, index }: IuserData) => {
  const axiosSecure = useAxios();
  const isApproved = user?.status === "approved";

  const toggleUserStatus = () => {
    axiosSecure
      .patch(`/users/status/${user._id}`, {
        status: !isApproved ? "approved" : "blocked",
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          toast.success(
              `${user.name} status updated to ${
                !isApproved ? "approved" : "blocked"
              }!`
          );
          refetch();
        }
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to update user status"
        );
      });
  };

  return (
    <tr className="text-xs sm:text-base bg-white dark:bg-black border-b dark:border-zinc-700 h-12">
      <th className="w-10">{index + 1}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <select
          disabled={user.role === "admin"}
          value={isApproved ? "approved" : "blocked"}
          onChange={() => toggleUserStatus()}
          className={`text-xs text-white sm:text-sm rounded-lg px-1 max-w-24 cursor-pointer disabled:hidden disabled:cursor-not-allowed ${
            isApproved
              ? "bg-green-500 hover:bg-green-600 focus:bg-green-600"
              : "bg-red-500 hover:bg-red-600 focus:bg-red-600"
          }`}
        >
          <option value="approved" className="bg-green-500 text-white">
            Approved
          </option>
          <option value="blocked" className="bg-red-500 text-white">
            Blocked
          </option>
        </select>
      </td>
    </tr>
  );
};

export default AllUsersTableRow;
