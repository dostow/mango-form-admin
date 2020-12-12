import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = process.env.REACT_APP_API_URL + "/store";
const apiKey = process.env.REACT_APP_API_KEY;
const headers = new Headers();
headers.set("x-dostow-group-access-key", apiKey);

const defaultOptions = { headers };
const httpClient = (url, options = {}) => {
  const mergedOptions = { ...options, ...defaultOptions };
  const token = localStorage.getItem("token");
  if (token) {
    mergedOptions.headers.set("Authorization", `Bearer ${token}`);
    return fetchUtils.fetchJson(url, mergedOptions);
  }
};

export default {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    // const { field, order } = params.sort;
    const query = {
      //   sort: JSON.stringify([field, order]),
      //   range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      size: perPage,
      skip: (page - 1) * perPage,
    };
    // if (params.include != null) {
    //   query.include = include;
    // }
    if (params.filter) {
      query.q = JSON.stringify(params.filter);
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => ({
      data: json.data,
      total: parseInt(json.total_count, 10),
    }));
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    return Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`).then(({ json }) => json)
      )
    ).then((results) => ({
      data: results,
    }));
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
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get("content-range").split("/").pop(), 10),
    }));
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "DELETE",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },
};
