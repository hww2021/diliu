import axios from "axios";
import qs from "qs";
import store from "@/store";
import router from "../router";

const instance = axios.create({
  baseURL: "https://local.turingvideo.cn",
  timeout: 5000,
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: "brackets" });
  },
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(success, fail);

function success(response) {
  const { data } = response || {};
  return Promise.resolve(data);
}

function fail(error) {
  const { response } = error;
  const { status, data } = response || {};
  if (status === 401) {
    localStorage.removeItem("token");
    store.commit("setIsLogin", false);
    router.replace({ name: "Login" });
  }
  return Promise.reject({
    status,
    message: (data && data.error_message) || "服务端错误",
  });
}

export default instance;
