import React, { useState } from "react";
import {
  ShoppingCart,
  CheckCircle,
  Plus,
  Minus,
  MapPin,
  Mail,
  CreditCard,
  DollarSign,
  User,
  Clock,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useAxiosSecurity from "../../Hooks/useAxiosSecurity";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../../Hooks/useAuth";

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecurity();
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const userEmail = user?.email;

  const { data: mealData, isLoading } = useQuery({
    queryKey: ["mealDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/mealDetails/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateQuantity = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const totalPrice = mealData ? mealData.price * quantity : 0;

  const onSubmit = async (data) => {
    const result = await Swal.fire({
      title: "Confirm Your Order?",
      html: `
        <div class="text-left">
          <p><strong>Meal:</strong> ${mealData.foodName}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Your total price is:</strong> <span style="color: #3085d6; font-size: 1.2em;">${totalPrice}</span></p>
          <p style="margin-top: 10px;">Do you want to confirm the order?</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm Order!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const orderData = {
          foodId: id,
          mealName: mealData.foodName,
          price: mealData.price,
          quantity: quantity,
          chefId: mealData.chefId,
          paymentStatus: "Pending",
          userEmail: userEmail,
          userAddress: data.address,
          orderStatus: "pending",
          orderTime: new Date().toISOString(),
        };

        const orderResponse = await axiosSecure.post("/orders", orderData);

        if (orderResponse.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Order Placed Successfully!",
            text: `Your order has been confirmed. Order ID: ${orderResponse.data.insertedId}`,
            confirmButtonColor: "#3085d6",
          });

          setTimeout(() => {
            navigate("/my-orders");
          }, 2000);
        }
      } catch (error) {
        console.error("Order error:", error);
        Swal.fire({
          icon: "error",
          title: "Order Failed",
          text:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
          confirmButtonColor: "#3085d6",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  if (!mealData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Meal not found</h2>
          <button
            onClick={() => navigate("/meals")}
            className="btn btn-primary"
          >
            Back to Meals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <ShoppingCart className="w-10 h-10 text-primary animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Complete Your Order
          </h1>
        </div>
        <p className="text-gray-400 text-lg">Review your items and checkout</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details Card */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  Order Details
                </h2>

                <div className="space-y-4 text-xl text-white">
                  {/* Meal Name - Auto-filled */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-semibold">
                        <ShoppingCart className="w-4 h-4" />
                        Meal Name
                      </span>
                    </label>
                    <input
                      type="text"
                      value={mealData.foodName}
                      readOnly
                      className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                    />
                  </div>

                  {/* Price - Auto-filled */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-semibold tex">
                        <DollarSign className="w-4 h-4" />
                        Price (per item)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={`$ ${mealData.price}`}
                      readOnly
                      className="input input-bordered w-full bg-base-200 text-2xl cursor-not-allowed"
                    />
                  </div>

                  {/* Quantity - User selects */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-semibold">
                        <Plus className="w-4 h-4" />
                        Quantity
                      </span>
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => updateQuantity(-1)}
                        className="btn btn-circle "
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        readOnly
                        className="input input-bordered w-24 text-center text-3xl font-bold"
                      />
                      <button
                        type="button"
                        onClick={() => updateQuantity(1)}
                        className="btn btn-circle "
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                      <span className="text-gray-400 ml-auto">
                        Total:{" "}
                        <span className="text-primary font-bold text-3xl text-white">
                          ${totalPrice}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Chef ID - Auto-filled */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-semibold ">
                        <User className="w-4 h-4" />
                        Chef ID
                      </span>
                    </label>
                    <input
                      type="text"
                      value={mealData.chefId}
                      readOnly
                      className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                    />
                  </div>

                  {/* User Email - Auto-filled */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-semibold">
                        <Mail className="w-4 h-4" />
                        Your Email
                      </span>
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      readOnly
                      className="input input-bordered w-full text-xl bg-base-200 cursor-not-allowed"
                    />
                  </div>

                  {/* User Address - User must enter */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-semibold ">
                        <MapPin className="w-4 h-4" />
                        Delivery Address *
                      </span>
                    </label>
                    <textarea
                      className={`textarea textarea-bordered h-24 w-full text-xl ${
                        errors.address ? "textarea-error" : ""
                      }`}
                      placeholder="Enter your complete delivery address (House/Flat, Road, Area, City)"
                      {...register("address", {
                        required: "Delivery address is required",
                        minLength: {
                          value: 15,
                          message: "Address must be at least 15 characters",
                        },
                      })}
                    ></textarea>
                    {errors.address && (
                      <span className="text-error text-xs mt-1 ">
                        {errors.address.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-semibold">
                        <Clock className="w-4 h-4" />
                        Order Status
                      </span>
                    </label>
                    <input
                      type="text"
                      value="Pending"
                      readOnly
                      className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-semibold">
                        <Clock className="w-4 h-4" />
                        Order Time
                      </span>
                    </label>
                    <input
                      type="text"
                      value={new Date().toLocaleString()}
                      readOnly
                      className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-4">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Order Summary</h2>

                {/* Meal Image */}
                <div className="mb-4">
                  <img
                    src={mealData.foodImage}
                    alt={mealData.foodName}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Meal</span>
                    <span className="font-semibold">{mealData.foodName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Chef</span>
                    <span className="font-semibold">{mealData.chefName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Price per Item</span>
                    <span className="font-semibold">${mealData.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Quantity</span>
                    <span className="font-semibold">{quantity}</span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Price</span>
                    <span className="text-primary">${totalPrice}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-2 space-y-1">
                    <p>
                      • Order Status:{" "}
                      <span className="text-warning">Pending</span>
                    </p>
                    <p>
                      • Payment Status:{" "}
                      <span className="text-warning">Pending</span>
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full text-white btn-lg gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Place Order
                </button>

                <div className="mt-4 p-4 bg-base-200 rounded-lg">
                  <p className="text-xs text-center text-gray-400">
                    🔒 Your order information is secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Order;
