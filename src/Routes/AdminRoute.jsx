import React from "react";
import useRole from "../Hooks/useRole";
import { useAuth } from "../Hooks/useAuth";

const AdminOnlyRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <span>Loading...............</span>;
  }
  if (role !== "admin") {
    return <span>Forbidden</span>;
  }
  return children;
};

export default AdminOnlyRoute;
