import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecurity();
  const [isVerifying, setIsVerifying] = useState(true);

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
        }).then(() => {
          navigate("/dashboard/my-orders");
        });
        return;
      }

      try {
        const res = await axiosSecure.post("/verify-payment", {
          sessionId,
          orderId,
        });

        if (res.data.success) {
          setIsVerifying(false);
          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `
              <p>Your payment has been processed successfully.</p>
              <p class="mt-2 text-gray-600">Amount: $${res.data.payment.amount}</p>
              <p class="text-gray-600">Order: ${res.data.payment.mealName}</p>
            `,
            confirmButtonColor: "#10b981",
            confirmButtonText: "View My Orders",
          }).then(() => {
            navigate("/dashboard/my-orders");
          });
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: "Failed to verify payment. Please contact support.",
          confirmButtonColor: "#f97316",
        }).then(() => {
          navigate("/dashboard/my-orders");
        });
      }
    };

    verifyPayment();
  }, [searchParams, navigate, axiosSecure]);

  if (isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-4"></div>
        <p className="text-white text-xl">Verifying your payment...</p>
        <p className="text-gray-400 mt-2">Please wait a moment</p>
      </div>
    );
  }

  return null;
};

export default PaymentSuccess;
