import config from "../../config";

let responseData;

export async function getCharacters(criteria = "", onScroll = false) {
    let composeEndpoint = `${config.urlAPI}character/`;
    if (onScroll) {
        composeEndpoint = responseData.info.next;
    } else if (criteria) {
        composeEndpoint += `?name=${criteria}`
    }
    return fetch(`${composeEndpoint}`)
        .then(response => {
            return response.json();
        } 
        )
        .then(data => {
            if (data?.error) {
                throw new Error(data.error);
            } else {
                setResponseData(data)
                return data.results;
            }
        })
        .catch(err => {
            setResponseData(null);
            return [];
        })
}

function setResponseData(input) {
    responseData = input;
}
export function getResponseData() {
    return responseData;
}