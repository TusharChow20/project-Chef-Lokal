import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../../Hooks/useAuth";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecurity();

  const { data: allOrders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

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
      preparing: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-white";
  };

  const getPaymentColor = (status) => {
    const colors = {
      pending: "bg-orange-100 text-orange-800",
      paid: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            My Orders
          </h1>
          <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm sm:text-base w-fit">
            {allOrders.length} {allOrders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>

        {/* Empty State */}
        {allOrders.length === 0 ? (
          <div className=" rounded-lg shadow-md p-8 sm:p-12 text-center">
            <p className="text-gray-500 text-base sm:text-lg">
              No orders found
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {allOrders.map((order) => (
              <div
                key={order._id}
                className=" rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="block md:hidden p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base font-bold text-white flex-1 pr-2">
                      {order.mealName}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-100">Price:</span>
                      <span className="font-semibold text-white text-xl">
                        ${order.price}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-100">Quantity:</span>
                      <span className="font-semibold text-white">
                        {order.quantity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-100">Total:</span>
                      <span className="font-bold text-orange-600">
                        ${(order.price * order.quantity).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-100">Chef:</span>
                      <span className="font-semibold text-white">
                        {order.chefName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-100">Chef ID:</span>
                      <span className="text-gray-500 text-xs break-all">
                        {order.chefId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-100">Order Time:</span>
                      <span className="text-white text-xs">
                        {formatDate(order.orderTime)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-100">Payment:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getPaymentColor(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop View - Table Layout (>= md) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className=" border-b">
                      <tr>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                          Meal
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">
                          Qty
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                          Order Time
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                          Chef
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-lg font-semibold text-gray-200 uppercase tracking-wider">
                          Payment
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover: transition-colors">
                        <td className="px-4 lg:px-6 py-4">
                          <div className="font-semibold text-white text-sm">
                            {order.mealName}
                          </div>
                          <div className="text-lg text-gray-500">
                            ID: {order.foodId}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-lg font-semibold capitalize inline-block ${getStatusColor(
                              order.orderStatus
                            )}`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-center">
                          <div className="font-semibold text-white text-2xl">
                            ${order.price}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-center">
                          <div className="font-semibold text-white text-sm">
                            {order.quantity}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-center">
                          <div className="font-bold text-orange-600 text-xl">
                            ${(order.price * order.quantity).toFixed(2)}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <div className="text-lg text-white whitespace-nowrap">
                            {formatDate(order.orderTime)}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <div className="font-semibold text-white text-sm">
                            {order.chefName}
                          </div>
                          <div className="text-lg text-gray-500 truncate max-w-xs">
                            {order.chefId}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-lg font-semibold capitalize inline-block ${getPaymentColor(
                              order.paymentStatus
                            )}`}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Card */}
        {allOrders.length > 0 && (
          <div className="mt-6  rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              Order Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4  rounded-lg">
                <p className="text-xs sm:text-sm text-gray-100 mb-1">
                  Total Orders
                </p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {allOrders.length}
                </p>
              </div>
              <div className="text-center p-3 sm:p-4  rounded-lg">
                <p className="text-xs sm:text-sm text-gray-100 mb-1">
                  Total Spent
                </p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">
                  $
                  {allOrders
                    .reduce(
                      (sum, order) => sum + order.price * order.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="text-center p-3 sm:p-4  rounded-lg">
                <p className="text-xs sm:text-sm text-gray-100 mb-1">Pending</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                  {
                    allOrders.filter(
                      (o) => o.orderStatus?.toLowerCase() === "pending"
                    ).length
                  }
                </p>
              </div>
              <div className="text-center p-3 sm:p-4  rounded-lg">
                <p className="text-xs sm:text-sm text-gray-100 mb-1">
                  Delivered
                </p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
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

export default MyOrders;
