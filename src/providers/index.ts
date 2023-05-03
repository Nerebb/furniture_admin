import { combineDataProviders, fetchUtils } from "react-admin";
import FilterProvider from "./filterProvider";
import ProductProvider from "./productProvider";
import ReviewProvider from "./reviewProvider";
import UserProvider from "./userProvider";
import OrderProvider from "./orderProvider";

export const BASE_URL_ADMIN = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin`
export const httpClient = (url: string, options?: fetchUtils.Options) => {
    const access_token = localStorage.getItem("access_token")
    if (!access_token) return fetchUtils.fetchJson(url, options)

    const authOps = {
        user: {
            authenticated: true,
            token: access_token
        },
        ...options,
    } satisfies fetchUtils.Options

    return fetchUtils.fetchJson(url, authOps)
};

export const DataProvider = combineDataProviders((resource: string) => {
    switch (resource) {
        case 'room':
        case 'category':
        case 'color':
            return FilterProvider;
        case 'products':
            return ProductProvider;
        case 'user':
            return UserProvider;
        case 'review':
            return ReviewProvider;
        case 'order':
            return OrderProvider;
        default:
            throw new Error('Unknown resource');
    }
});