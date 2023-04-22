import { combineDataProviders, fetchUtils } from "react-admin";
import FilterProvider from "./filterProvider";
import ProductProvider from "./productProvider";

export const BASE_URL_ADMIN = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin`
export const httpClient = fetchUtils.fetchJson;

export const DataProvider = combineDataProviders((resource: string) => {
    switch (resource) {
        case 'room':
        case 'category':
        case 'color':
            return FilterProvider;
        case 'products':
            return ProductProvider;
        default:
            throw new Error('Unknown resource');
    }
});