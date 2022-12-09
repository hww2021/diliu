import api from "./request.js";
import { stringify } from "qs";

export async function getData(data) {
  const params = {
    ...data,
    o: "-updated_at",
    q: data.q === "" ? undefined : data.q,
    id: data.id === "" ? undefined : data.id,
    site: data.site == "" ? undefined : data.site,
    group_id: data.group_id === "" ? undefined : data.group_id,
    is_active:
      data.is_active === "" || data.is_active === undefined
        ? undefined
        : data.is_active === 0
        ? false
        : true,
  };
  const { results, count } = await api.get(
    `/services/uaa/api/v2/users?${stringify(params)}`
  );
  const userData = results.map((item) => ({
    id: item.id,
    name: item.full_name,
    firstName: item.first_name,
    lastName: item.last_name,
    username: item.username,
    phone: item.phone,
    email: item.email,
    siteVal: item.site_ids,
    role: item.groups.map((item) => item.name).join("、"),
    groups: item.groups,
    note: item.note,
    status: item.is_active,
  }));
  return { userData, count };
}

export function changeStatus(id, type) {
  return api.post(`/services/uaa/api/v2/users/${id}/${type}`);
}

export function BatchChangeStatus(type, params) {
  return api.post(`/services/uaa/api/v2/users/${type}`, params);
}

export function add(params) {
  return api.post("/services/uaa/api/v2/users", params);
}

export function edit(params, id) {
  return api.put(`/services/uaa/api/v2/users/${id}`, params);
}

export function del(id) {
  return api.delete("/services/uaa/api/v2/users/" + id);
}
