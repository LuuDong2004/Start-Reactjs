import axiosClient from "./axiosClient";

export const helloApi = {
  hello() {
    return axiosClient.get("/api/hello");
  },
};
