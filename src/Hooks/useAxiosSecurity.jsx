// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

import axios from "axios";
import React from "react";
const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecurity = () => {
  return axiosSecure;
};

export default useAxiosSecurity;
