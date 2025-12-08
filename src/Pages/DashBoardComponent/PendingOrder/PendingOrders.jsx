import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";

const PendingOrders = () => {
  const axiosSecure = useAxiosSecurity();
  const {} = useQuery({
    queryKey: [""],
    queryFn: async () => {
      const res = await axiosSecure.get("");
    },
  });
  return (
    <div>
      <h1>This order is pending</h1>
    </div>
  );
};

export default PendingOrders;
