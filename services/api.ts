import axios from "./axios";

export const fetchUserList = (username: string) => {
  return axios.get(`/users/${username}/animelist`, {
    params: { limit: 1000, sort: "list_score", fields: "list_status" },
  });
};
