import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import Swal from "sweetalert2";
const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecurity();

  const {
    data: allOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

  // Check for payment success/cancel in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const canceled = params.get("canceled");

    if (canceled === "true") {
      Swal.fire({
        icon: "info",
        title: "Payment Cancelled",
        text: "Your payment was cancelled. You can try again anytime.",
        confirmButtonColor: "#f97316",
      });
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

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

  const shouldShowPayButton = (order) => {
    return (
      order.orderStatus?.toLowerCase() === "accepted" &&
      order.paymentStatus?.toLowerCase() === "pending"
    );
  };

  const handlePayment = async (order) => {
    try {
      const cost = order.price * order.quantity;

      // Show loading
      Swal.fire({
        title: "Processing...",
        text: "Redirecting to payment gateway",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await axiosSecure.post("/create-checkout-session", {
        cost,
        orderId: order._id,
      });

      // Redirect to Stripe checkout
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Failed to initiate payment. Please try again.",
        confirmButtonColor: "#f97316",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
      <>
        <title>My-Orders</title>
      </>
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

        {allOrders.length === 0 ? (
          <div className="rounded-lg shadow-md p-8 sm:p-12 text-center bg-gray-800">
            <p className="text-gray-400 text-base sm:text-lg">
              No orders found
            </p>
          </div>
        ) : (
          <div className="rounded-lg shadow-md overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-3 lg:px-6 py-4 text-left text-sm md:text-base lg:text-lg font-bold text-gray-200 uppercase tracking-wider">
                      Meal
                    </th>
                    <th className="px-3 lg:px-6 py-4 text-left text-sm md:text-base lg:text-lg font-bold text-gray-200 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 lg:px-6 py-4 text-center text-sm md:text-base lg:text-lg font-bold text-gray-200 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-3 lg:px-6 py-4 text-center text-sm md:text-base lg:text-lg font-bold text-gray-200 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-3 lg:px-6 py-4 text-center text-sm md:text-base lg:text-lg font-bold text-gray-200 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-3 lg:px-6 py-4 text-left text-sm md:text-base lg:text-lg font-bold text-gray-200 uppercase tracking-wider">
                      Order Time
                    </th>
                    <th className="px-3 lg:px-6 py-4 text-left text-sm md:text-base lg:text-lg font-bold text-gray-200 uppercase tracking-wider">
                      Chef
                    </th>
                    <th className="px-3 lg:px-6 py-4 text-left text-sm md:text-base lg:text-lg font-bold text-gray-200 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-3 lg:px-6 py-4 text-center text-sm md:text-base lg:text-lg font-bold text-gray-200 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="px-3 lg:px-6 py-5">
                        <div className="font-semibold text-white text-base md:text-lg lg:text-xl">
                          {order.mealName}
                        </div>
                        <div className="text-sm md:text-base text-gray-400 mt-1">
                          ID: {order.foodId}
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-5">
                        <span
                          className={`px-3 py-2 rounded-full text-sm md:text-base font-semibold capitalize inline-block ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-3 lg:px-6 py-5 text-center">
                        <div className="font-semibold text-white text-lg md:text-xl lg:text-2xl">
                          ${order.price}
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-5 text-center">
                        <div className="font-semibold text-white text-base md:text-lg lg:text-xl">
                          {order.quantity}
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-5 text-center">
                        <div className="font-bold text-orange-600 text-lg md:text-xl lg:text-2xl">
                          ${(order.price * order.quantity).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-5">
                        <div className="text-sm md:text-base lg:text-lg text-white whitespace-nowrap">
                          {formatDate(order.orderTime)}
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-5">
                        <div className="font-semibold text-white text-base md:text-lg">
                          {order.chefName}
                        </div>
                        <div className="text-sm md:text-base text-gray-400 truncate max-w-xs mt-1">
                          {order.chefId}
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-5">
                        <span
                          className={`px-3 py-2 rounded-full text-sm md:text-base font-semibold capitalize inline-block ${getPaymentColor(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-3 lg:px-6 py-5 text-center">
                        {shouldShowPayButton(order) ? (
                          <button
                            onClick={() => handlePayment(order)}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm md:text-base whitespace-nowrap"
                          >
                            Pay Now
                          </button>
                        ) : (
                          <span className="text-gray-500 text-sm">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Summary Card */}
        {allOrders.length > 0 && (
          <div className="mt-6 rounded-lg shadow-md p-4 sm:p-6 bg-gray-800 border border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              Order Summary
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
                <p className="text-xs sm:text-sm text-gray-300 mb-1">
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
              <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-300 mb-1">Pending</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                  {
                    allOrders.filter(
                      (o) => o.orderStatus?.toLowerCase() === "pending"
                    ).length
                  }
                </p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-300 mb-1">
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
