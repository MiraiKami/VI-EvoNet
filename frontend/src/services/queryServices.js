import {handleResponse} from "../helpers/helper";

const BACKEND_URL = "http://127.0.0.1:5000";

export async function queryGov(country) {
    const response = await fetch(`${BACKEND_URL}/gov/${country}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store',
        headers: {'Content-Type':  'application/json'}
    });
    return handleResponse(response);
}

export async function queryOng(year) {
    const response = await fetch(`${BACKEND_URL}/ong/${year}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store',
        headers: {'Content-Type':  'application/json'}
    });
    return handleResponse(response);
}

export async function queryYears() {
    const response = await fetch(`${BACKEND_URL}/ong/getYears`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store',
        headers: {'Content-Type':  'application/json'}
    });
    return handleResponse(response);
}
