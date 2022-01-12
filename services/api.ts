import axios from "./axios";

export const fetchUserList = (username: string) => {
  return axios.get(`/users/${username}/animelist`, {
    params: { limit: 10, sort: "list_score", fields: "list_status" },
  });
};
