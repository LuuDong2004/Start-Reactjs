import axiosClient from "./axiosClient";

export interface LoginPayload {
    username: string;
    password: string;
}

export const authApi = {

    login(data: LoginPayload) {
        const formData = new URLSearchParams();
        formData.append("username", data.username);
        formData.append("password", data.password);

        return axiosClient.post("/login", formData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            withCredentials: true,
        });
    },
    getCurrentUser() {
        return axiosClient.get("/rest/user/current");
    },

    logout() {
        return axiosClient.post("/rest/logout");
    },

}