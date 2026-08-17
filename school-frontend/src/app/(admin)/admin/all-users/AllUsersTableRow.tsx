import useAxios from "@/hooks/useAxios";
import { TUser } from "@/types/user.type";
import Swal from "sweetalert2";

interface IuserData {
  user: TUser;
  refetch: () => void;
  index: number;
}

const AllUsersTableRow = ({ user, refetch, index }: IuserData) => {
  const axiosSecure = useAxios();
  const isApproved = user?.status === "approved";

  const toggleUserStatus = (newStatus: string) => {
    axiosSecure
      .patch(`/users/status/${user._id}`, {
        status: newStatus,
      })
      .then((res) => {
        if (res.data.statusCode === 200 || res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "স্ট্যাটাস আপডেট হয়েছে",
            text: `${user.name} এর অ্যাকাউন্ট ${newStatus === "approved" ? "সক্রিয়" : "ব্লক"} করা হয়েছে।`,
            timer: 1500,
            showConfirmButton: false,
          });
          refetch();
        }
      })
      .catch((error) => {
        Swal.fire("ত্রুটি", error.response?.data?.message || "স্ট্যাটাস পরিবর্তন করা যায়নি।", "error");
      });
  };

  return (
    <tr className="hover:bg-blue-50/20 transition-colors text-sm">
      <td className="p-4 text-center font-mono text-gray-500">{index + 1}</td>
      <td className="p-4 font-bold text-[#1e3a5f]">{user.name}</td>
      <td className="p-4 text-gray-600 font-mono text-xs">{user.email}</td>
      <td className="p-4 text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            user.role === "admin"
              ? "bg-[#1e3a5f] text-[#F9E8A2]"
              : "bg-[#B4E1EB]/50 text-[#1e3a5f]"
          }`}
        >
          {user.role === "admin" ? "অ্যাডমিন" : "শিক্ষার্থী"}
        </span>
      </td>
      <td className="p-4 text-center">
        {user.role === "admin" ? (
          <span className="text-xs text-gray-400 font-semibold">সুরক্ষিত (Protected)</span>
        ) : (
          <select
            value={isApproved ? "approved" : "blocked"}
            onChange={(e) => toggleUserStatus(e.target.value)}
            className={`text-xs font-bold rounded-xl px-3 py-1.5 cursor-pointer focus:outline-none transition-colors ${
              isApproved
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            <option value="approved">অনুমোদিত (Active)</option>
            <option value="blocked">ব্লক (Blocked)</option>
          </select>
        )}
      </td>
    </tr>
  );
};

export default AllUsersTableRow;
