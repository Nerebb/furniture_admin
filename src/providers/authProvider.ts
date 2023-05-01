import { AuthProvider } from "react-admin";
import { BASE_URL_ADMIN, httpClient } from ".";

export const authProvider = {
    // authentication
    login: (({ loginId, password }) => {
        return httpClient(`${BASE_URL_ADMIN}/auth/customLogin`, {
            method: "POST",
            body: JSON.stringify({ loginId, password })
        })
            .then(response => {
                const { access_token } = JSON.parse(response.body)
                localStorage.setItem("access_token", access_token)
                return { redirectTo: `/user` };
            })
            .catch((error: any) => {
                throw error.message || new Error("Unknown authorization error")
            });
    }),
    logout: () => {
        localStorage.removeItem("access_token")
        return Promise.resolve()
    },
    checkError: error => Promise.resolve(/* ... */),
    checkAuth: () => {
        const access_token = localStorage.getItem("access_token")
        if (!access_token) return Promise.reject("Unauthorize user")
        return Promise.resolve()
    },
    getPermissions: () => {
        const access_token = localStorage.getItem('access_token')
        if (!access_token) return Promise.reject("Unauthorize user")
        return Promise.resolve()
    }
} satisfies Partial<AuthProvider>;