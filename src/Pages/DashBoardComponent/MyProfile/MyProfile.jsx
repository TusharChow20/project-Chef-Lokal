import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import { useAuth } from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import Swal from "sweetalert2";
import { Pencil, X, Check, Upload } from "lucide-react";
import axios from "axios";

const MyProfile = () => {
  const { role } = useRole();
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecurity();

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    data: userInfo,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  const {
    data: roleChangeRequests,
    isLoading: isLoadingRequests,
    refetch: refetchRequests,
  } = useQuery({
    queryKey: ["roleChangeRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/role_change_req?email=${user.email}`);
      return res.data;
    },
  });

  // Handle Address Edit
  const handleEditAddress = () => {
    setNewAddress(userInfo?.address || "");
    setIsEditingAddress(true);
  };

  const handleCancelAddressEdit = () => {
    setIsEditingAddress(false);
    setNewAddress("");
  };

  const handleSaveAddress = async () => {
    if (!newAddress.trim() || newAddress.length < 5) {
      Swal.fire({
        icon: "error",
        title: "Invalid Address",
        text: "Address must be at least 5 characters long",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    setIsUpdating(true);
    try {
      // Update in MongoDB
      await axiosSecure.patch(`/users/${user.email}`, {
        address: newAddress,
      });

      Swal.fire({
        icon: "success",
        title: "Address Updated!",
        text: "Your address has been updated successfully",
        confirmButtonColor: "#10b981",
        timer: 2000,
      });

      setIsEditingAddress(false);
      refetch(); // Refresh profile data
    } catch (error) {
      console.error("Address update error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update address. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    }
    setIsUpdating(false);
  };

  // Handle Image Edit
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: "Please select an image smaller than 5MB",
          confirmButtonColor: "#ef4444",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid File Type",
          text: "Please select an image file (JPG, PNG, GIF)",
          confirmButtonColor: "#ef4444",
        });
        return;
      }

      setSelectedImage(file);

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setIsEditingImage(true);
    }
  };

  const handleCancelImageEdit = () => {
    setIsEditingImage(false);
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSaveImage = async () => {
    if (!selectedImage) return;

    setIsUpdating(true);
    try {
      // Upload to ImgBB
      const formData = new FormData();
      formData.append("image", selectedImage);

      const imageUploadResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`,
        formData
      );

      if (!imageUploadResponse.data.success) {
        throw new Error("Image upload failed");
      }

      const newPhotoURL = imageUploadResponse.data.data.url;

      // Update in MongoDB
      await axiosSecure.patch(`/users/${user.email}`, {
        photoURL: newPhotoURL,
      });

      // Update Firebase profile
      await updateUserProfile({
        photoURL: newPhotoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Photo Updated!",
        text: "Your profile photo has been updated successfully",
        confirmButtonColor: "#10b981",
        timer: 2000,
      });

      setIsEditingImage(false);
      setSelectedImage(null);
      setImagePreview(null);
      refetch(); // Refresh profile data
    } catch (error) {
      console.error("Image update error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update profile photo. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    }
    setIsUpdating(false);
  };

  const handleRoleChangeReq = async (roleType) => {
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

        Swal.fire({
          title: "Request Submitted!",
          text: `Your ${roleType} role request has been submitted successfully. Please wait for admin approval.`,
          icon: "success",
          confirmButtonColor: roleType === "chef" ? "#f97316" : "#a855f7",
          confirmButtonText: "OK",
        });

        refetchRequests();
      } catch (error) {
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
      <title>My Profile</title>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 h-24"></div>

          <div className="px-6 pb-6">
            {/* Profile Image with Edit */}
            <div className="flex justify-center -mt-12 mb-4">
              <div className="relative group">
                <img
                  src={imagePreview || userInfo?.photoURL}
                  alt={userInfo?.displayName}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                />

                {!isEditingImage && (
                  <label
                    htmlFor="imageUpload"
                    className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 cursor-pointer shadow-lg transition-all"
                  >
                    <Pencil className="w-4 h-4" />
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                )}

                {isEditingImage && (
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 bg-base-300 p-2 rounded-lg shadow-lg">
                    <button
                      onClick={handleSaveImage}
                      disabled={isUpdating}
                      className="btn btn-success btn-sm text-white"
                    >
                      {isUpdating ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={handleCancelImageEdit}
                      disabled={isUpdating}
                      className="btn btn-error btn-sm text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-6 mt-8">
              <h2 className="text-4xl text-white font-bold">
                {userInfo?.displayName}
              </h2>
              <p className="text-gray-200 mt-1">{userInfo?.email}</p>
            </div>

            {/* Details Grid */}
            <div className="space-y-4 mb-6">
              {/* Address with Edit */}
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-100 md:text-xl font-medium">
                  Address:
                </span>

                {!isEditingAddress ? (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 md:text-xl font-semibold text-end">
                      {userInfo?.address}
                    </span>
                    <button
                      onClick={handleEditAddress}
                      className="btn btn-ghost btn-sm text-orange-500 hover:text-orange-600"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 flex-1 ml-4">
                    <input
                      type="text"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      className="input input-bordered input-sm flex-1"
                      placeholder="Enter new address"
                      disabled={isUpdating}
                    />
                    <button
                      onClick={handleSaveAddress}
                      disabled={isUpdating}
                      className="btn btn-success btn-sm text-white"
                    >
                      {isUpdating ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={handleCancelAddressEdit}
                      disabled={isUpdating}
                      className="btn btn-error btn-sm text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
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
            {role === "user" && (
              <>
                {userInfo?.userStatus === "fraud" ? (
                  <div className="mt-6 text-center bg-red-600/20 border border-red-500 px-4 py-6 rounded-xl">
                    <h2 className="text-xl font-bold text-red-400 mb-2">
                      Account Restricted
                    </h2>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Your account has been flagged for suspicious activity. You
                      cannot request Chef or Admin roles at this time.
                    </p>
                  </div>
                ) : userInfo?.userStatus === "rejected" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <button className="text-xl font-semibold py-3 rounded-lg transition duration-200 shadow-md bg-gray-400 cursor-not-allowed text-gray-700 w-full">
                      Your Request Denied
                    </button>
                  </div>
                ) : (
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
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-100 font-medium md:text-xl">
                    Chef ID:
                  </span>
                  <span className="text-gray-100 text-lg font-mono break-all text-end">
                    {userInfo?.chefId}
                  </span>
                </div>

                <button
                  onClick={() => handleRoleChangeReq("admin")}
                  disabled={hasAdminRequest || userInfo?.userStatus === "fraud"}
                  className={`text-xl font-semibold py-3 rounded-lg transition duration-200 shadow-md w-full ${
                    hasAdminRequest || userInfo?.userStatus === "fraud"
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
