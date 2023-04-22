import { GetListParams, GetListResult } from "react-admin";

export interface AnyObject { [key: string]: any }

export enum ApiMethod {
    POST = "POST",
    GET = 'GET',
    PUT = 'PUT',
    DELETE = "DELETE",
}

export type TDataProvider = {
    getList: (params: GetListParams) => Promise<GetListResult<any>>;
}