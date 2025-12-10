import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecurity();

  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");
      const orderId = searchParams.get("order_id");

      if (!sessionId || !orderId) {
        Swal.fire({
          icon: "error",
          title: "Invalid Payment",
          text: "Payment verification failed. Missing session information.",
          confirmButtonColor: "#f97316",
        });
        return navigate("/dashboard/my-orders");
      }

      try {
        const res = await axiosSecure.post("/verify-payment", {
          sessionId,
          orderId,
        });

        if (res.data.success) {
          setPaymentDetails(res.data.payment);
          setIsVerifying(false);

          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: "Your payment has been verified.",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: "Failed to verify payment. Please contact support.",
          confirmButtonColor: "#f97316",
        });
        navigate("/dashboard/my-orders");
      }
    };

    verifyPayment();
  }, [searchParams, axiosSecure, navigate]);

  if (isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-4"></div>
        <p className="text-white text-xl">Verifying your payment...</p>
        <p className="text-gray-400 mt-2">Please wait a moment</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-300 mb-2">
          Your payment has been processed successfully.
        </p>

        <p className="text-gray-400 mb-1">Amount: ${paymentDetails?.amount}</p>
        <p className="text-gray-400 mb-6">Order: {paymentDetails?.mealName}</p>

        <button
          onClick={() => navigate("/dashboard/my-orders")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Track Your Order
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
