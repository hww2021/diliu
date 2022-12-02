import api from "./request.js";
import { stringify } from "qs";

export async function getData(data) {
  const params = {
    ...data,
    o: "-updated_at",
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
    status: item.is_active,
  }));
  return { userData, count };
}
