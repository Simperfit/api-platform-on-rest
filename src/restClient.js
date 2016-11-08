import {
    GET_LIST,
    GET_MATCHING,
    GET_ONE,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'admin-on-rest';

const API_URL = 'http://localhost/app_dev.php';

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = '';
    const { queryParameters } = fetchUtils;
    const options = {};
    console.log(resource, params, fetchUtils);
    switch (type) {
        case GET_LIST: {
            url = `${API_URL}/${resource}`;
            break;
        }
        case GET_MATCHING: {
            const query = {
                filter: JSON.stringify(params.filter),
            };
            url = `${API_URL}/${resource}?${queryParameters(query)}`;
            break;
        }
        case GET_ONE:
            url = `${API_URL}/${resource}/${params.id}`;
            break;
        case GET_MANY_REFERENCE: {
            const query = {
                filter: JSON.stringify({ id: params.ids }),
            };
            url = `${API_URL}/${resource}?${queryParameters(query)}`;
            break;
        }
        case UPDATE:
            url = `${API_URL}/${resource}/${params.id}`;
            options.method = 'PUT';
            options.body = JSON.stringify(params.data);
            break;
        case CREATE:
            url = `${API_URL}/${resource}`;
            options.method = 'POST';
            options.body = JSON.stringify(params.data);
            break;
        case DELETE:
            url = `${API_URL}/${resource}/${params.id}`;
            options.method = 'DELETE';
            break;
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} REST response
 */
const convertHTTPResponseToREST = (response, type, resource, params) => {
    const { headers, json } = response;
    switch (type) {
        case GET_LIST:
            return {
                data: json.map((x) => {
                    x.id = x.uuid;
                    return x;
                }),
                total: parseInt(json.length, 10),
            };
        case CREATE:
            return { ...params.data, id: json.uuid };
        default:
            return json;
    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a REST response
 */
export default (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);
    console.log(options);
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToREST(response, type, resource, params));
};
