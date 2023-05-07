import { AuthProvider } from "react-admin";
import { BASE_URL_ADMIN, httpClient } from ".";
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { Role } from "@prisma/client";
export interface SignedUserData extends JwtPayload {
    userId: string,
    role: Role,
    provider: string,
}
export const authProvider = {
    // authentication
    login: (({ loginId, password }) => {
        return httpClient(`${BASE_URL_ADMIN}/auth/customLogin`, {
            method: "POST",
            body: JSON.stringify({ loginId, password })
        })
            .then(async (response) => {
                const { role, access_token } = JSON.parse(response.body)
                if (role !== 'admin') throw new Error("User is not admin")
                localStorage.setItem("access_token", access_token)
                return { redirectTo: `/` };
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