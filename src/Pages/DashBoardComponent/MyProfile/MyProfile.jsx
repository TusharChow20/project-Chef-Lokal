import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import { useAuth } from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { role } = useRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecurity();

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  // Fetch role change requests for this user
  const {
    data: roleChangeRequests,
    isLoading: isLoadingRequests,
    refetch,
  } = useQuery({
    queryKey: ["roleChangeRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/role_change_req?email=${user.email}`);
      return res.data;
    },
  });

  const handleRoleChangeReq = async (roleType) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: `Become a ${
        roleType.charAt(0).toUpperCase() + roleType.slice(1)
      }?`,
      text: `Are you sure you want to request ${roleType} access?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: roleType === "chef" ? "#f97316" : "#a855f7",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    });

    // If user confirms
    if (result.isConfirmed) {
      try {
        const entryTime = new Date().toISOString();

        const roleUpdate = {
          userName: user.displayName,
          userEmail: user.email,
          requestType: roleType,
          requestStatus: "pending",
          requestTime: entryTime,
        };

        await axiosSecure.post("/role_change_req", roleUpdate);

        // Show success message
        Swal.fire({
          title: "Request Submitted!",
          text: `Your ${roleType} role request has been submitted successfully. Please wait for admin approval.`,
          icon: "success",
          confirmButtonColor: roleType === "chef" ? "#f97316" : "#a855f7",
          confirmButtonText: "OK",
        });

        // Refetch role change requests to update button states
        refetch();
      } catch (error) {
        // Show error message if request fails
        Swal.fire({
          title: "Error!",
          text: "Failed to submit request. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
          confirmButtonText: "OK",
        });
      }
    }
  };

  // Check if user has pending requests
  const hasChefRequest = roleChangeRequests?.some(
    (req) => req.requestType === "chef" && req.requestStatus === "pending"
  );

  const hasAdminRequest = roleChangeRequests?.some(
    (req) => req.requestType === "admin" && req.requestStatus === "pending"
  );

  if (isLoading || isLoadingRequests) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        {/* Profile Card */}
        <div className="rounded-lg shadow-md overflow-hidden">
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
                <span className="text-gray-200 md:text-xl font-medium">
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

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-100 font-medium md:text-xl">
                  User ID:
                </span>
                <span className="text-gray-100 text-lg font-mono wrap-anywhere text-end">
                  {userInfo?._id}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            {/* Action Buttons */}
            {role === "user" && (
              <>
                {userInfo?.userStatus === "fraud" ? (
                  // FRAUD BLOCK UI
                  <div className="mt-6 text-center bg-red-600/20 border border-red-500 px-4 py-6 rounded-xl">
                    <h2 className="text-xl font-bold text-red-400 mb-2">
                      Account Restricted
                    </h2>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Your account has been flagged for suspicious activity. You
                      cannot request Chef or Admin roles at this time.
                    </p>
                  </div>
                ) : (
                  // NORMAL BUTTONS WHEN ACTIVE
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleRoleChangeReq("chef")}
                      disabled={hasChefRequest}
                      className={`text-xl font-semibold py-3 rounded-lg transition duration-200 shadow-md ${
                        hasChefRequest
                          ? "bg-gray-400 cursor-not-allowed text-gray-700"
                          : "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg"
                      }`}
                    >
                      {hasChefRequest ? "Request Pending" : "Be a Chef"}
                    </button>

                    <button
                      onClick={() => handleRoleChangeReq("admin")}
                      disabled={hasAdminRequest}
                      className={`text-xl font-semibold py-3 rounded-lg transition duration-200 shadow-md ${
                        hasAdminRequest
                          ? "bg-gray-400 cursor-not-allowed text-gray-700"
                          : "bg-purple-100 hover:bg-purple-300 text-black hover:shadow-lg"
                      }`}
                    >
                      {hasAdminRequest ? "Request Pending" : "Be an Admin"}
                    </button>
                  </div>
                )}
              </>
            )}

            {role === "chef" && (
              <div>
                {/* Chef ID */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-100 font-medium md:text-xl">
                    Chef ID:
                  </span>
                  <span className="text-gray-100 text-lg font-mono break-all text-end">
                    {userInfo?.chefId}
                  </span>
                </div>

                {/* Admin Request Button */}
                <button
                  onClick={() => handleRoleChangeReq("admin")}
                  disabled={hasAdminRequest || userInfo.userStatus === "fraud"}
                  className={`text-xl font-semibold py-3 rounded-lg transition duration-200 shadow-md w-full ${
                    hasAdminRequest || userInfo.userStatus === "fraud"
                      ? "bg-gray-400 cursor-not-allowed text-gray-700"
                      : "bg-purple-100 hover:bg-purple-300 text-black hover:shadow-lg"
                  }`}
                >
                  {userInfo.userStatus === "fraud"
                    ? "Access Restricted"
                    : hasAdminRequest
                    ? "Request Pending"
                    : "Be an Admin"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
