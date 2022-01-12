import axios from "axios";
export const URL = "https://api.myanimelist.net/v2";

const instance = axios.create({
  baseURL: URL,
  headers: {
    "X-MAL-CLIENT-ID": process.env.CLIENT_ID || "",
    "Content-Type": "application/json",
  },
});

export default instance;
