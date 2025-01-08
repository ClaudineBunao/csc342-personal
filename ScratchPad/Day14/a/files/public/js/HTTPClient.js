function processJSONResponse(res) {
    if (!res.ok) {
        //example: 404
        throw new Error(`This request was not successful: ${res.statusText} (${res.status})`);
    }
    return res.json();
};

function handleError(err) {
    console.error('Error in fetch', err);
    throw err;
};

export default {
    get: (url) => {
        return fetch(url)
            .then(processJSONResponse)  //if success
            .catch(handleError);    //if fail, offline or server is down etc
    },
    post: (url, data) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',      //sent data is json input
            },
            body: JSON.stringify(data),     
        })
        .then(processJSONResponse)
        .catch(handleError);
    },
};