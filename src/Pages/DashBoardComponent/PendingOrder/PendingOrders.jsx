import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import { useAuth } from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const PendingOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecurity();
  const queryClient = useQueryClient();

  const { data: userInfo, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: allOrders = [], isLoading: isOrdersLoading } = useQuery({
    queryKey: ["orders", userInfo?.chefId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${userInfo.chefId}`);
      return res.data;
    },
    enabled: !!userInfo?.chefId,
  });

  // Mutation for updating order status
  const updateOrderMutation = useMutation({
    mutationFn: async ({ orderId, newStatus }) => {
      const res = await axiosSecure.patch(`/orders/update/${orderId}`, {
        orderStatus: newStatus,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", userInfo?.chefId]);
      Swal.fire({
        icon: "success",
        title: "Order Updated!",
        text: "Order status has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update order status. Please try again.",
      });
      console.error("Update error:", error);
    },
  });

  const handleStatusChange = (orderId, newStatus, actionName) => {
    Swal.fire({
      title: `${actionName} Order?`,
      text: `Are you sure you want to ${actionName.toLowerCase()} this order?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${actionName}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrderMutation.mutate({ orderId, newStatus });
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const getPaymentColor = (status) => {
    const colors = {
      pending: "bg-orange-100 text-orange-800",
      paid: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const isButtonDisabled = (order, buttonType) => {
    const status = order.orderStatus?.toLowerCase();
    
    if (status === "cancelled" || status === "delivered") {
      return true;
    }

    switch (buttonType) {
      case "cancel":
        return status !== "pending";
      case "accept":
        return status !== "pending";
      case "deliver":
        return status !== "accepted";
      default:
        return false;
    }
  };

  if (isUserLoading || isOrdersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Pending Orders
          </h1>
          <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm sm:text-base w-fit">
            {allOrders.length} {allOrders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>

        {/* Empty State */}
        {allOrders.length === 0 ? (
          <div className="rounded-lg shadow-md p-8 sm:p-12 text-center bg-gray-800">
            <p className="text-gray-400 text-base sm:text-lg">
              No orders found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allOrders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 hover:shadow-xl transition-shadow"
              >
                {/* Food Name */}
                <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-3">
                  {order.mealName}
                </h3>

                {/* Order Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Price:</span>
                    <span className="text-orange-500 font-semibold text-lg">
                      ${order.price}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Quantity:</span>
                    <span className="text-white font-semibold">
                      {order.quantity}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Total:</span>
                    <span className="text-orange-600 font-bold text-lg">
                      ${(order.price * order.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Payment:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getPaymentColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Customer:</p>
                    <p className="text-white text-sm break-all">
                      {order.userEmail}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-1">Address:</p>
                    <p className="text-white text-sm">{order.userAddress}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-1">Order Time:</p>
                    <p className="text-white text-sm">
                      {formatDate(order.orderTime)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4 border-t border-gray-700">
                  <button
                    onClick={() =>
                      handleStatusChange(order._id, "accepted", "Accept")
                    }
                    disabled={
                      isButtonDisabled(order, "accept") ||
                      updateOrderMutation.isPending
                    }
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
                      isButtonDisabled(order, "accept")
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Accept Order
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(order._id, "delivered", "Deliver")
                    }
                    disabled={
                      isButtonDisabled(order, "deliver") ||
                      updateOrderMutation.isPending
                    }
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
                      isButtonDisabled(order, "deliver")
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    Mark as Delivered
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(order._id, "cancelled", "Cancel")
                    }
                    disabled={
                      isButtonDisabled(order, "cancel") ||
                      updateOrderMutation.isPending
                    }
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
                      isButtonDisabled(order, "cancel")
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Card */}
        {allOrders.length > 0 && (
          <div className="mt-6 rounded-lg shadow-md p-4 sm:p-6 bg-gray-800 border border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              Orders Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-300 mb-1">
                  Total Orders
                </p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {allOrders.length}
                </p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-300 mb-1">Pending</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-500">
                  {
                    allOrders.filter(
                      (o) => o.orderStatus?.toLowerCase() === "pending"
                    ).length
                  }
                </p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-300 mb-1">
                  Accepted
                </p>
                <p className="text-xl sm:text-2xl font-bold text-blue-500">
                  {
                    allOrders.filter(
                      (o) => o.orderStatus?.toLowerCase() === "accepted"
                    ).length
                  }
                </p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-300 mb-1">
                  Delivered
                </p>
                <p className="text-xl sm:text-2xl font-bold text-green-500">
                  {
                    allOrders.filter(
                      (o) => o.orderStatus?.toLowerCase() === "delivered"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingOrders;