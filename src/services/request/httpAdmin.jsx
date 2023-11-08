import axios from "axios";
import Cookie from "js-cookie";

const http = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    TokenCybersoft: process.env.REACT_APP_TOKEN,
  },
});

http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      token: Cookie.get("ACCESS_TOKEN_ADMIN"),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;

// import axios from "axios";

// const token = JSON.parse(localStorage.getItem("currentFiverUser"));

// const http = axios.create({
//   baseURL: process.env.REACT_APP_PUBLIC_API_URL,
//   timeout: 30000,
//   headers: {
//     TokenCybersoft: process.env.REACT_APP_TOKEN,
//     token: token?.token,
//   },
// });

// http.interceptors.request.use((request) => {
//   const user = JSON.parse(localStorage.getItem("currentFiverUser"));

//   if (user) {
//     request.headers.Authorization = `Bearer ${user.token}`;
//   }
//   return request;
// });
// export default http;
