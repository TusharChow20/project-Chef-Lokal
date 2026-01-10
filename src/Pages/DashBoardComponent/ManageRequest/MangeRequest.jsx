import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import Swal from "sweetalert2";

const ManageRequest = () => {
  const axiosSecure = useAxiosSecurity();
  //   const queryClient = useQueryClient();
  const [processingId, setProcessingId] = useState(null);

  const { data: reqData = [], isLoading } = useQuery({
    queryKey: ["role_change_req_all"],
    queryFn: async () => {
      const res = await axiosSecure.get("/role_change_req/all");
      return res.data;
    },
  });

  //   const updateRequestMutation = useMutation({
  //     mutationFn: async ({ requestId, action }) => {
  //       const res = await axiosSecure.patch(`/role_change_req/${requestId}`, {
  //         action,
  //       });
  //       return res.data;
  //     },
  //     onSuccess: (data, variables) => {
  //       queryClient.invalidateQueries(["role_change_req_all"]);
  //       setProcessingId(null);

  //       // Success message based on action
  //       if (variables.action === "approve") {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Request Approved!",
  //           html: data.chefId
  //             ? `User role updated successfully<br><strong>Chef ID:</strong> ${data.chefId}`
  //             : "User role updated successfully",
  //           confirmButtonColor: "#10b981",
  //           timer: 3000,
  //           timerProgressBar: true,
  //         });
  //       } else {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Request Rejected",
  //           text: "The role change request has been rejected",
  //           confirmButtonColor: "#ef4444",
  //           timer: 2500,
  //           timerProgressBar: true,
  //         });
  //       }
  //     },
  //     onError: (error, variables) => {
  //       setProcessingId(null);

  //       Swal.fire({
  //         icon: "error",
  //         title: "Operation Failed",
  //         text:
  //           error.response?.data?.message ||
  //           "Failed to process request. Please try again.",
  //         confirmButtonColor: "#ef4444",
  //       });
  //     },
  //   });

  const handleAction = async (request, action) => {
    // console.log(request);

    const actionText = action === "approve" ? "approve" : "reject";
    const actionColor = action === "approve" ? "#10b981" : "#ef4444";

    const result = await Swal.fire({
      title: `${
        actionText.charAt(0).toUpperCase() + actionText.slice(1)
      } Request?`,
      html: `
        <div class="text-left space-y-2">
          <p><strong>User:</strong> ${request.userName}</p>
          <p><strong>Email:</strong> ${request.userEmail}</p>
          <p><strong>Requested Role:</strong> ${request.requestType}</p>
        </div>
        <p class="mt-4">Are you sure you want to ${actionText} this request?</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: actionColor,
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${actionText}!`,
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      setProcessingId(request._id);

      if (action === "approve") {
        // APPROVE → update user role + remove request
        const payload = { requestType: request.requestType };

        await axiosSecure.patch(`/users/${request.userEmail}`, payload);
        await axiosSecure.delete(`/role_change_req/${request._id}`);

        Swal.fire({
          icon: "success",
          title: "Approved!",
          text: `Role updated to ${request.requestType} and request removed.`,
        });
      } else {
        await axiosSecure.patch(`/users/${request.userEmail}`, {
          userStatus: "rejected",
        });
        await axiosSecure.delete(`/role_change_req/${request._id}`);

        Swal.fire({
          icon: "info",
          title: "Rejected!",
          text: `User request marked as rejected.`,
        });
      }
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    const icons = {
      pending: <Clock className="w-4 h-4" />,
      approved: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
      >
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <title>Manage Request</title>
      <div className="mb-6">
        <h1 className="text-3xl font-bold ">Manage Role Change Requests</h1>
        <p className="text-gray-100 mt-2">Total Requests: {reqData.length}</p>
      </div>

      <div className=" rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-400">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Request Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Request Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {reqData.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-200"
                  >
                    No role change requests found
                  </td>
                </tr>
              ) : (
                reqData.map((request) => (
                  <tr key={request._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium ">
                        {request.userName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-200">
                        {request.userEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                        {request.requestType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.requestStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      {formatDate(request.requestTime)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {request.requestStatus === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAction(request, "approve")}
                            disabled={processingId === request._id}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {processingId === request._id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Processing...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleAction(request, "reject")}
                            disabled={processingId === request._id}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">
                          No actions available
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageRequest;
