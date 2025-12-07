import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";

export const useAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};
