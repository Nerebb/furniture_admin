import { buildQuery } from "@/utils/buildQuery";
import { stringify } from 'query-string';
import { DataProvider } from "react-admin";
import { BASE_URL_ADMIN, httpClient } from ".";
import { OrderSearch, ResponseOrder } from "../../@type";


export type Product = {
    id: string,
    name: string
    price: number
    description?: string,
    available: number
    cateIds?: number[],
    roomIds?: number[]
    colors: string[],
    avgRating: number,

    creatorId: string,
    imageUrl?: string[],
    createdDate: string,
    updatedAt: string,
    totalProduct: number,
    totalSale: number,
    totalRating: number,
    totalComments: number,
    isFeatureProduct: boolean,
}

const OrderProvider: DataProvider = {
    getList: (resource, params) => {
        try {
            const ServerAllowedQuery = {
                //Search
                id: params.filter.id,
                ownerId: params.filter.ownerId,
                subTotal: params.filter.subTotal,
                total: params.filter.total,
                shippingFee: params.filter.shippingFee,
                billingAddress: params.filter.billingAddress,
                shippingAddress: params.filter.shippingAddress,
                status: params.filter.status,
                createdDate: params.filter.createdDate,
                updatedAt: params.filter.updatedAt,

                //Sort
                filter: params.sort.field,
                sort: params.sort.order,

                //Paginating
                limit: params.pagination.perPage,
                skip: params.pagination.perPage * (params.pagination.page - 1)

            } satisfies OrderSearch

            const url = buildQuery(`${BASE_URL_ADMIN}/${resource}`, ServerAllowedQuery)

            return httpClient(url)
                .then(({ headers, json }) => {
                    if (!json.data || !json.data.length) throw new Error("No product found")
                    const contentRange = headers.get('content-range')?.split('/').pop()
                    const data = json.data.map((i: ResponseOrder) => ({
                        ...i,
                        subTotal: Number(i.subTotal),
                        total: Number(i.total),
                    }))
                    return {
                        data,
                        total: contentRange ? JSON.parse(contentRange).totalRecord : 1,
                    }
                })
        } catch (error: any) {
            return Promise.reject(error.message)
        }
    },

    getOne: (resource, params) => {
        const userId = params.meta.userId
        if (!userId) throw Promise.reject("Order OwnerId missing")
        return httpClient(`${BASE_URL_ADMIN}/${resource}/${params.id}?userId=${userId}`).then(({ json }) => ({
            data: { ...json.data, subTotal: Number(json.data.subTotal), total: Number(json.data.total) },
        }))
    },

    getMany: (resource, params) => {
        const url = buildQuery(`${BASE_URL_ADMIN}/${resource}`, { id: params.ids });
        return httpClient(url).then(({ json }) => {
            return { data: { ...json.data, subTotal: Number(json.data.subTotal), total: Number(json.data.total) } }
        });
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${BASE_URL_ADMIN}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.data,
            total: parseInt(headers.get('content-range')?.split('/').pop() ?? "", 10) ?? "",
        }));
    },

    create: (resource, params) => {

        return httpClient(`${BASE_URL_ADMIN}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...json.data },
        }))
    },

    update: (resource, params) => {
        return httpClient(`${BASE_URL_ADMIN}/${resource}/${params.data.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => {
            return { data: json.data }
        })
    },

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${BASE_URL_ADMIN}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json.data }));
    },

    delete: (resource, params) => {
        return httpClient(`${BASE_URL_ADMIN}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => {
            return { data: json.data }
        })
    },

    deleteMany: (resource, params) => {
        const url = buildQuery(`${BASE_URL_ADMIN}/${resource}`, { id: params.ids })
        return httpClient(url, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: [] }))
    },
}

export default OrderProvider