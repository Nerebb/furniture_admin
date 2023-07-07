import { buildQuery } from "@/utils/buildQuery";
import { stringify } from 'query-string';
import { DataProvider } from "react-admin";
import { BASE_URL_ADMIN, httpClient } from ".";
import { ProductSearchSchemaValidate } from "@/utils/schemaValidate";
import { ProductSearch } from "../../@type";


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

const ProductProvider: DataProvider = {
    getList: (resource, params) => {
        try {
            const ServerAllowedQuery = {
                //Search
                name: params.filter.name,
                rating: params.filter.rating,
                isFeatureProduct: params.filter.isFeatureProduct,

                //Sort
                filter: params.sort.field === "id" && resource === 'color' ? 'hex' : params.sort.field,
                sort: params.sort.order,

                //Paginating
                limit: params.pagination.perPage,
                skip: params.pagination.perPage * (params.pagination.page - 1)

            } satisfies ProductSearch

            const url = buildQuery(`${BASE_URL_ADMIN}/${resource}`, ServerAllowedQuery)

            return httpClient(url)
                .then(({ headers, json }) => {
                    if (!json.data || !json.data.length) throw new Error("No product found")
                    const contentRange = json.data[0].totalProduct
                    const data = json.data.map((i: any) => ({
                        id: i.id,
                        name: i.name,
                        price: i.price,
                        description: i.description,
                        available: i.available,
                        cateIds: i.cateIds,
                        roomIds: i.roomIds,
                        colors: i.colors,
                        avgRating: i.avgRating,
                        totalSale: i.totalSale,
                        totalRating: i.totalRating,
                        creatorId: i.creatorId,
                        imageUrl: i.imageUrl,
                        createdDate: new Date(i.createdDate),
                        updatedAt: new Date(i.updatedAt),
                        totalProduct: i.totalProduct
                    }))
                    return {
                        data,
                        total: contentRange ? contentRange : 1,
                    }
                })
        } catch (error: any) {
            return Promise.reject(error.message)
        }
    },

    getOne: (resource, params) =>
        httpClient(`${BASE_URL_ADMIN}/${resource}/${params.id}`)
            .then(({ json }) => {
                console.log("PRODUCT-GETONE", json)
                return { data: json.data }
            }),

    getMany: (resource, params) => {
        const url = buildQuery(`${BASE_URL_ADMIN}/${resource}`, { id: params.ids })
        return httpClient(url).then(({ json }) => ({ data: json.data }))
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
        console.log("PRODUCT-CREATE", params)
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
        }).then(({ json }) => ({ data: json.data }))
    },

    deleteMany: (resource, params) => {
        const url = buildQuery(`${BASE_URL_ADMIN}/${resource}`, { id: params.ids })
        return httpClient(url, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: [] }))
    },
}

export default ProductProvider