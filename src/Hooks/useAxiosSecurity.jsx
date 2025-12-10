// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

import axios from "axios";
import React, { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router";
const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecurity = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  // console.log(user?.accessToken);

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user]);
  return axiosSecure;
};

export default useAxiosSecurity;
