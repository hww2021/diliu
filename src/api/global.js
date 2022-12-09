import api from "./request.js";

export function getRoleData() {
  return api.get("/services/uaa/api/v2/groups?no_page=true");
}

export function getSiteData() {
  return api.get("/services/coreapi/sites/tree");
}
