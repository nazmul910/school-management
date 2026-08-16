"use client";
import AllUsersTableRow from "@/app/(admin)/admin/all-users/AllUsersTableRow";
import useUsers from "@/hooks/useUsers";
import { TUser } from "@/types/user.type";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { HiOutlineUserGroup } from "react-icons/hi";

const AllUsers = () => {
  const { usersData, usersLoading, usersRefetch } = useUsers();
  if (usersLoading) return <LoadingSpinner />;

  return (
    <section>
      <DashboardTitle
        blackText="All"
        greenText="Users" 
        className="text-center mt-10"
      />
      <div className="mt-5">
        {usersData.data && usersData.data.length > 0 ? (
          <table className="text-center text-black w-full">
            <thead>
              <tr className="bg-light text-white h-12">
                <th>Sl</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {usersData.data.map((user: TUser, index: number) => (
                <AllUsersTableRow
                  key={user._id}
                  index={index}
                  user={user}
                  refetch={usersRefetch}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
              <HiOutlineUserGroup className="text-5xl text-primary" />
            </div>

            <h3 className="text-2xl font-bold text-primary mb-2">
              কোনো ইউজার পাওয়া যায়নি
            </h3>

            <p className="text-gray-500 max-w-md leading-7">
              এই মুহূর্তে কোনো ইউজার নেই।
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllUsers;
