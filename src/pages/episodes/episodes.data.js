import config from "../../config";

let responseData;

export async function getEpisodes(criteria = "", onScroll = false) {
    let composeEndpoint = `${config.urlAPI}episode/`;
    if (onScroll) {
        composeEndpoint = responseData.info.next;
    } else if (criteria) {
        composeEndpoint += `?episode=${criteria}`
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

export async function getEpisodeCharacters(epId) {
    const characterIds = getResponseData().results
        .find(el => el.id === epId)
        .characters.map(ch => ch.slice( (ch.lastIndexOf("/")) + 1 ) ); 
           
    let composeEndpoint = `${config.urlAPI}character/${characterIds}`;
    return fetch(`${composeEndpoint}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data?.error) {
                throw new Error(data.error);
            } else {
                //setResponseData(data)
                return data;
            }
        })
        .catch(err => {
            //setResponseData(null);
            return [];
        })
}