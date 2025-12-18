import axiosClient from "./axiosClient";

export interface LoginPayload {
    username: string;
    password: string;
}
export const authApi = {

    login(data: LoginPayload) {
        return axiosClient.post("/api/auth/login", data);
    },

    getCurrentUser() {
        return axiosClient.get("/rest/user/current");
    },

    logout() {
        return axiosClient.post("/rest/logout");
    },

}