"use client";

import AllUsersTableRow from "@/app/(admin)/admin/all-users/AllUsersTableRow";
import useUsers from "@/hooks/useUsers";
import { TUser } from "@/types/user.type";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoMdPerson } from "react-icons/io";

const AllUsers = () => {
  const { usersData, usersLoading, usersRefetch } = useUsers();

  const users = usersData?.data || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1e3a5f] flex items-center gap-2.5">
            <IoMdPerson className="text-[#78A4CB]" />
            <span>User Account Management</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Manage and control the status of all registered student and admin accounts.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#B4E1EB]/60 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-lg text-[#1e3a5f]">Total Users ({users.length})</h2>
        </div>

        {usersLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium">Loading...</div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#1e3a5f] text-white text-xs uppercase tracking-wider">
                  <th className="p-4 text-center">#</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4 text-center">Role</th>
                  <th className="p-4 text-center">Account Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user: TUser, index: number) => (
                  <AllUsersTableRow
                    key={user._id}
                    index={index}
                    user={user}
                    refetch={usersRefetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
              <HiOutlineUserGroup className="text-5xl text-[#78A4CB]" />
            </div>
            <h3 className="text-xl font-bold text-[#1e3a5f] mb-1">No users found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
