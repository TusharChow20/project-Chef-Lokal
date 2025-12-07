import React, { useState } from "react";
import {
  ShoppingCart,
  CreditCard,
  Wallet,
  Smartphone,
  Building2,
  Banknote,
  CheckCircle,
  Trash2,
  Plus,
  Minus,
  MapPin,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useAxiosSecurity from "../../Hooks/useAxiosSecurity";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecurity();
  const [quantity, setQuantity] = useState(1);

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

  const subtotal = mealData ? mealData.price * quantity : 0;
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const onSubmit = async (data) => {
    //<p><strong>Payment:</strong> ${
    // paymentMethods.find((m) => m.id === selectedPayment)?.name
    //}</p>
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Confirm Your Order?",
      html: `
        <div class="text-left">
          <p><strong>Meal:</strong> ${mealData.foodName}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Total:</strong> $${total.toFixed(2)}</p>
          
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Place Order!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        // Prepare order data
        const orderData = {
          mealId: id,
          mealName: mealData.foodName,
          mealImage: mealData.foodImage,
          chefName: mealData.chefName,
          price: mealData.price,
          quantity: quantity,
          subtotal: subtotal,
          deliveryFee: deliveryFee,
          tax: tax,
          total: total,
          deliveryInfo: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
          },
          orderDate: new Date().toISOString(),
          status: "pending",
        };

        // Post to database
        const response = await axiosSecure.post("/orders", orderData);

        if (response.data.insertedId) {
          // Success - Navigate to payment page
          Swal.fire({
            icon: "success",
            title: "Order Placed Successfully!",
            text: "Redirecting to payment page...",
            timer: 2000,
            showConfirmButton: false,
          });

          // Navigate to payment page after 2 seconds
          setTimeout(() => {
            navigate(`/payment/${response.data.insertedId}`, {
              state: { orderData },
            });
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
            {/* Cart Item */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  Your Order
                </h2>

                <div className="flex flex-col md:flex-row gap-4 p-4 bg-base-200 rounded-lg justify-center items-center">
                  <img
                    src={mealData.foodImage}
                    alt={mealData.foodName}
                    className="w-44 h-44 object-cover rounded-lg mx-auto"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{mealData.foodName}</h3>
                    <p className="text-sm text-gray-400">
                      by {mealData.chefName}
                    </p>
                    <p className="text-white font-bold mt-2 text-xl">
                      ${mealData.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row justify-center items-end">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(-1)}
                        className="btn btn-sm btn-circle "
                      >
                        <Minus className="w-6 h-6" />
                      </button>
                      <span className="font-bold w-10 text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(1)}
                        className="btn btn-sm btn-circle "
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6" />
                  Delivery Information
                </h2>

                <div className="space-y-4 text-xl text-white">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name *
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={`input input-bordered w-full ${
                        errors.name ? "input-error" : ""
                      }`}
                      {...register("name", {
                        required: "Full name is required",
                      })}
                    />
                    {errors.name && (
                      <span className="text-error text-xs mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+880 1234-567890"
                      className={`input input-bordered w-full ${
                        errors.phone ? "input-error" : ""
                      }`}
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9+\-\s()]+$/,
                          message: "Invalid phone number",
                        },
                      })}
                    />
                    {errors.phone && (
                      <span className="text-error text-xs mt-1">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className={`input input-bordered w-full ${
                        errors.email ? "input-error" : ""
                      }`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <span className="text-error text-xs mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Delivery Address *
                      </span>
                    </label>
                    <textarea
                      className={`textarea textarea-bordered h-10 w-full ${
                        errors.address ? "textarea-error" : ""
                      }`}
                      placeholder="Street address, apartment, suite, etc."
                      {...register("address", {
                        required: "Delivery address is required",
                        minLength: {
                          value: 10,
                          message: "Address must be at least 10 characters",
                        },
                      })}
                    ></textarea>
                    {errors.address && (
                      <span className="text-error text-xs mt-1">
                        {errors.address.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-4">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Delivery Fee</span>
                    <span className="font-semibold">
                      ${deliveryFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax (8%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
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
                    🔒 Your payment information is secure and encrypted
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
