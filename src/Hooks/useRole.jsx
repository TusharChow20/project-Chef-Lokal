import React from "react";
import { useAuth } from "./useAuth";
import useAxiosSecurity from "./useAxiosSecurity";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecurity();
  const { data: role = "", isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role;
    },
  });
  console.log(role);

  return { role, isLoading };
};

export default useRole;
