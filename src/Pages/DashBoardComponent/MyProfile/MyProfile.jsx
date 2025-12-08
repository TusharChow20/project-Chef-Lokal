import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import { useAuth } from "../../../Hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecurity();

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        {/* Profile Card */}
        <div className=" rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-orange-400 to-red-500 h-24"></div>

          <div className="px-6 pb-6">
            {/* Profile Image */}
            <div className="flex justify-center -mt-12 mb-4">
              <img
                src={userInfo?.photoURL}
                alt={userInfo?.displayName}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>

            {/* User Info */}
            <div className="text-center mb-6">
              <h2 className="text-4xl text-white font-bold text-gray-800">
                {userInfo?.displayName}
              </h2>
              <p className="text-gray-200 mt-1">{userInfo?.email}</p>
            </div>

            {/* Details Grid */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-100 md:text-xl font-medium">
                  Address:
                </span>
                <span className="text-gray-300 md:text-xl font-semibold text-end">
                  {userInfo?.address}
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-200  md:text-xl font-medium">
                  Role:
                </span>
                <span className="px-3 py-1 bg-white font-bold text-black md:text-xl rounded-full text-sm capitalize">
                  {userInfo?.role}
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-100 md:text-xl font-medium">
                  Status:
                </span>
                <span
                  className={`px-3 py-1 rounded-full md:text-xl font-semibold capitalize ${
                    userInfo?.userStatus === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {userInfo?.userStatus}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-100 font-medium md:text-xl">
                  User ID:
                </span>
                <span className="text-gray-100 text-lg font-mono wrap-anywhere text-end">
                  {userInfo?._id}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg">
                Be a Chef
              </button>
              <button className="bg-purple-100 hover:bg-purple-300 text-black text-xl font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg">
                Be an Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
