export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                // logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    }).catch( error => {
        console.log(error);
    });
}

export function yearsToArray(data) {
    return data !== undefined ? data["year"] : [];
}

export function mobileToArray(data) {
    return data !== undefined ? data["mobile"] : [];
}

export function broadbandToArray(data) {
    return data !== undefined ? data["broadband"] : [];
}

export function shareToArray(data) {
    return data !== undefined ? data["share"] : [];
}

export function dataToArray(data, dataName){
    return data !== undefined ? data[dataName] : [];
}
