import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  DollarSign,
  ShoppingBag,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

const PlatformStat = () => {
  const axiosSecure = useAxiosSecurity();

  const { data: allUsers, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users", "all"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/allUser`);
      return res.data;
    },
  });

  const { data: allOrders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["orders", "all"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/all`);
      return res.data;
    },
  });

  const { data: paymentHistory, isLoading: isPaymentsLoading } = useQuery({
    queryKey: ["payments", "all"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory`);
      return res.data;
    },
  });

  const statistics = useMemo(() => {
    if (!allUsers || !allOrders || !paymentHistory) {
      return {
        totalUsers: 0,
        totalPayments: 0,
        ordersPending: 0,
        ordersDelivered: 0,
        totalOrders: 0,
      };
    }

    const totalPayments = paymentHistory.reduce(
      (sum, payment) => sum + (payment.amount || 0),
      0
    );

    const ordersPending = allOrders.filter(
      (order) => order.orderStatus === "pending"
    ).length;

    const ordersDelivered = allOrders.filter(
      (order) => order.orderStatus === "delivered"
    ).length;

    return {
      totalUsers: allUsers.length,
      totalPayments: totalPayments.toFixed(2),
      ordersPending,
      ordersDelivered,
      totalOrders: allOrders.length,
    };
  }, [allUsers, allOrders, paymentHistory]);

  const orderStatusData = useMemo(() => {
    if (!allOrders) return [];

    const pending = allOrders.filter((o) => o.orderStatus === "pending").length;
    const delivered = allOrders.filter(
      (o) => o.orderStatus === "delivered"
    ).length;
    const processing = allOrders.filter(
      (o) => o.orderStatus === "processing"
    ).length;

    return [
      { name: "Pending", value: pending, color: "#f59e0b" },
      { name: "Delivered", value: delivered, color: "#10b981" },
      { name: "Processing", value: processing, color: "#3b82f6" },
    ].filter((item) => item.value > 0);
  }, [allOrders]);

  const revenueData = useMemo(() => {
    if (!paymentHistory) return [];

    const monthlyRevenue = {};

    paymentHistory.forEach((payment) => {
      const date = new Date(payment.paymentDate);
      const monthYear = `${date.toLocaleString("default", {
        month: "short",
      })} ${date.getFullYear()}`;

      if (!monthlyRevenue[monthYear]) {
        monthlyRevenue[monthYear] = 0;
      }
      monthlyRevenue[monthYear] += payment.amount || 0;
    });

    return Object.entries(monthlyRevenue)
      .map(([month, revenue]) => ({
        month,
        revenue: parseFloat(revenue.toFixed(2)),
      }))
      .slice(-6);
  }, [paymentHistory]);

  const userRoleData = useMemo(() => {
    if (!allUsers) return [];

    const roles = allUsers.reduce((acc, user) => {
      const role = user.role || "user";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(roles).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
  }, [allUsers]);

  const isLoading = isUsersLoading || isOrdersLoading || isPaymentsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading statistics...</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, color, trend }) => (
    <div className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center text-green-600 text-sm font-medium">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-300 mb-2">
            Platform Statistics
          </h1>
          <p className="text-gray-200">
            Monitor your platform's performance and growth
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={`$${statistics.totalPayments}`}
            color="from-green-500 to-emerald-600"
            trend="+12.5%"
          />
          <StatCard
            icon={Users}
            title="Total Users"
            value={statistics.totalUsers}
            color="from-blue-500 to-indigo-600"
            trend="+8.2%"
          />
          <StatCard
            icon={Clock}
            title="Pending Orders"
            value={statistics.ordersPending}
            color="from-amber-500 to-orange-600"
          />
          <StatCard
            icon={CheckCircle}
            title="Delivered Orders"
            value={statistics.ordersDelivered}
            color="from-purple-500 to-pink-600"
            trend="+15.3%"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Revenue Trend</h2>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Last 6 Months
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 5 }}
                  activeDot={{ r: 7 }}
                  fill="url(#colorRevenue)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Order Status Pie Chart */}
          <div className="rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Order Status</h2>
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xl font-medium">
                Current
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Roles Bar Chart */}
          <div className="rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                User Distribution
              </h2>
              <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                By Role
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userRoleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]}>
                  {userRoleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Cards */}
          <div className=" rounded-2xl p-6 shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-6">Quick Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  <span className="font-medium">Total Orders</span>
                </div>
                <span className="text-2xl font-bold">
                  {statistics.totalOrders}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-3" />
                  <span className="font-medium">Avg. Order Value</span>
                </div>
                <span className="text-2xl font-bold">
                  $
                  {statistics.totalOrders > 0
                    ? (
                        statistics.totalPayments / statistics.totalOrders
                      ).toFixed(2)
                    : "0.00"}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  <span className="font-medium">Completion Rate</span>
                </div>
                <span className="text-2xl font-bold">
                  {statistics.totalOrders > 0
                    ? (
                        (statistics.ordersDelivered / statistics.totalOrders) *
                        100
                      ).toFixed(1)
                    : "0"}
                  %
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-3" />
                  <span className="font-medium">Active Users</span>
                </div>
                <span className="text-2xl font-bold">
                  {statistics.totalUsers}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformStat;
