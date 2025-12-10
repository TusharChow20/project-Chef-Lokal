import React, { useState } from "react";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUser = () => {
  const axiosSecure = useAxiosSecurity();
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: allUsers,
    isLoading: isUsersLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", "all"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/allUser`);
      return res.data;
    },
  });

  const handleMakeFraud = async (user) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `Do you want to mark <strong>${user.displayName}</strong> as fraud?<br><small class="text-gray-500">${user.email}</small>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, mark as fraud!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        const response = await axiosSecure.patch(`/users/${user.email}`, {
          userStatus: "fraud",
        });

        if (response.data.modifiedCount > 0) {
          await Swal.fire({
            title: "Success!",
            text: `${user.displayName} has been marked as fraud.`,
            icon: "success",
            confirmButtonColor: "#3b82f6",
          });

          refetch();
        } else {
          throw new Error("Failed to update user status");
        }
      } catch (error) {
        console.error("Error marking user as fraud:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to mark user as fraud. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const shouldShowFraudButton = (user) => {
    return user?.role !== "admin" && user?.userStatus !== "fraud";
  };

  if (isUsersLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <title>Manage Users</title>
      <div className=" rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 ">
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-blue-100 text-sm mt-1">
            Manage all users and their roles
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  User Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  User Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  User Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {allUsers?.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/40";
                        }}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-100">
                          {user.displayName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-100">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "chef"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user?.userStatus === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user?.userStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {shouldShowFraudButton(user) ? (
                      <button
                        onClick={() => handleMakeFraud(user)}
                        disabled={isLoading}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                      >
                        {isLoading ? "Processing..." : "Make Fraud"}
                      </button>
                    ) : user.role === "admin" ? (
                      <span className="text-gray-400 italic">Admin user</span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Already Fraud
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {allUsers?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
