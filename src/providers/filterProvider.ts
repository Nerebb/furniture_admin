import { buildQuery } from "@/utils/buildQuery";
import { stringify } from 'query-string';
import { CoreAdminContextProps } from "react-admin";
import { BASE_URL_ADMIN, httpClient } from ".";


const FilterProvider: CoreAdminContextProps['dataProvider'] = {
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
                const contentRange = headers.get('content-range')?.split('/').pop()

                return {
                    data: json.data,
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
            return ({ data: json.data })
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

export default FilterProvider