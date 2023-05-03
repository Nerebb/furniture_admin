import { buildQuery } from "@/utils/buildQuery";
import { stringify } from 'query-string';
import { DataProvider } from "react-admin";
import { BASE_URL_ADMIN, httpClient } from ".";
import { FilterSearch } from "../../@type";

export type Filter = {
    id: string
    label: string
}

const FilterProvider: DataProvider = {
    getList: (resource, params) => {
        try {
            const AllowedFilters = {
                filter: params.sort.field === "id" && resource === 'color' ? 'hex' : params.sort.field,
                sort: params.sort.order,
                limit: params.pagination.perPage
            } satisfies FilterSearch

            const url = buildQuery(`${BASE_URL_ADMIN}/${resource}`, AllowedFilters)

            return httpClient(url)
                .then(({ headers, json }) => {
                    const contentRange = headers.get('content-range')?.split('/').pop()

                    return {
                        data: json.data,
                        total: contentRange ? JSON.parse(contentRange).totalRecord : 1,
                    }
                })
        } catch (error: any) {
            return Promise.reject(error.message)
        }
    },

    getOne: (resource, params) => {
        try {
            const url = `${BASE_URL_ADMIN}/${resource}?id=${params.id}`

            return httpClient(url).then(({ json }) => ({
                data: json.data,
            }))
        } catch (error: any) {
            return Promise.reject(error.message)
        }
    },

    getMany: (resource, params) => {
        try {
            const url = buildQuery(`${BASE_URL_ADMIN}/${resource}`, { id: params.ids });
            return httpClient(url).then(({ json }) => {
                if (params.ids.length <= 1) return ({ data: [json.data] }) //Sever response with only 1 record
                return ({ data: json.data })
            }).catch((error) => {
                return Promise.reject(error.message)
            });
        } catch (error: any) {
            return Promise.reject(error.message)
        }
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
        try {
            return httpClient(`${BASE_URL_ADMIN}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({ data: json.data }))
        } catch (error: any) {
            return Promise.reject(error.message)
        }
    },

    update: (resource, params) => {
        try {
            return httpClient(`${BASE_URL_ADMIN}/${resource}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({ data: json.data }))
        } catch (error: any) {
            return Promise.reject(error.message)
        }
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
        try {
            const url = buildQuery(`${BASE_URL_ADMIN}/${resource}`, { id: params.id })
            return httpClient(url, {
                method: 'DELETE',
            }).then(({ json }) => {
                return ({ data: json.data })
            })
                .catch(error => Promise.reject(error.message));
        } catch (error: any) {
            return Promise.reject(error.message)
        }
    },

    deleteMany: (resource, params) => {
        try {
            const url = buildQuery(`${BASE_URL_ADMIN}/${resource}`, { id: params.ids })
            return httpClient(url, {
                method: 'DELETE',
            }).then(({ status, json }) => {
                return ({ data: [] })
            })
                .catch(error => Promise.reject(error.message));
        } catch (error: any) {
            return Promise.reject(error.message)
        }
    },
}

export default FilterProvider