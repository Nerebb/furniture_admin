import { buildQuery } from "@/utils/buildQuery";
import { stringify } from 'query-string';
import { CoreAdminContextProps } from "react-admin";
import { BASE_URL_ADMIN, httpClient } from ".";

type Product = {
    id: string,
    name: string
    price: number
    description?: string,
    available: number
    cateIds?: number[],
    roomIds?: number[]
    colors: string[],
    avgRating: number,
    totalSale: number,
    totalRating: number,
    creatorId: string,
    imageUrl?: string[],
    createdDate: string,
    updatedAt: string,
    totalProduct: number,
}

const ProductProvider: CoreAdminContextProps['dataProvider'] = {
    getList: (resource, params) => {
        //sort
        const filter = params.sort.field === "id" && resource === 'color' ? 'hex' : params.sort.field
        const sort = params.sort.order

        //paginating
        const limit = params.pagination.perPage
        const curPage = params.pagination.page

        const url = buildQuery(`${BASE_URL_ADMIN}/${resource}`, { filter, sort, limit, curPage })

        return httpClient(url)
            .then(({ headers, json }) => {
                const contentRange = json.data[0].totalProduct
                // headers.set('content-range', contentRange)
                const data = json.data.map((i: any) => ({
                    id: i.id,
                    name: i.name,
                    price: i.price,
                    description: i.description,
                    available: i.available,
                    cateIds: i.cateIds.map((i: any) => i.id),
                    roomIds: i.roomIds.map((i: any) => i.id),
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
                    total: contentRange ? JSON.parse(contentRange).totalRecord : 1,
                }
            })
    },

    getOne: (resource, params) =>
        httpClient(`${BASE_URL_ADMIN}/${resource}?id=${params.id}`).then(({ json }) => ({
            data: json.data,
        })),

    getMany: (resource, params) => {
        const url = buildQuery(`${BASE_URL_ADMIN}/${resource}`, { id: params.ids });
        return httpClient(url).then(({ json }) => {
            return { data: json.data.map((i: any) => ({ id: i.id, name: i.label })) }
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

    create: (resource, params) =>
        httpClient(`${BASE_URL_ADMIN}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    update: (resource, params) => {
        return httpClient(`${BASE_URL_ADMIN}/${resource}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(async () => {
            return await httpClient(`${BASE_URL_ADMIN}/${resource}?id=${params.data}`).then(({ json }) => ({
                data: json.data,
            }))
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
        const url = buildQuery(`${BASE_URL_ADMIN}/${resource}`, { id: params.id })
        return httpClient(url, {
            method: 'DELETE',
        }).then(async () => {
            return await httpClient(`${BASE_URL_ADMIN}/${resource}`)
                .then(({ headers, json }) => ({
                    data: json.data,
                    total: parseInt(headers.get('content-range')?.split('/').pop() ?? "", 10) ?? "",
                }))
        });
    },

    deleteMany: (resource, params) => {
        const url = buildQuery(`${BASE_URL_ADMIN}/${resource}`, { id: params.ids })
        return httpClient(url, {
            method: 'DELETE',
        }).then(async () => {
            return await httpClient(`${BASE_URL_ADMIN}/${resource}`)
                .then(({ headers, json }) => ({
                    data: json.data,
                    total: parseInt(headers.get('content-range')?.split('/').pop() ?? "", 10) ?? "",
                }))
        });
    },
}

export default ProductProvider