import api from "./request.js";

export function login(params) {
  return api.post("/services/uaa/api/v2/auth/login", params);
}

export function logout() {
  return api.post("/services/uaa/api/v2/auth/logout");
}

export function getAccount() {
  return api.get("/services/uaa/api/v2/users/me");
}
