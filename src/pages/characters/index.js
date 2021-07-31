import { getCharacters, getResponseData } from "./characters.data";
import { removeAllChildNodes, updateActiveLink } from "../../utils";
import "./characters.css"; 
import html from "./characters.html"; 
let containerPage = document.querySelector("#content");

export async function start() {
    updateActiveLink("/#/personajes");
    const data = await getCharacters();
    renderView(data);   
}

function renderView(data = null) {
    containerPage.insertAdjacentHTML('beforeend', html);
    containerPage.querySelector("#character-form").addEventListener("submit", submitSearch);
    containerPage.querySelector("#character-list").addEventListener("scroll", scrolling);
    if (data && data.length) {
        let listContainer = containerPage.querySelector("#character-list");
        const listCompose = renderCharacters(data, containerPage).join("");
        listContainer.insertAdjacentHTML('beforeend', listCompose);
    } else {
        renderEmptyResults(containerPage);
    }
}

function renderCharacters(listData, container) {
    container.querySelector("#message-empty").classList = "hide";
    return listData.map(item => {
        return `<li class="character__item">
            <figure class="character__picture">
                <img class="character__photo" src="${item.image}" alt="${item.species} ${item.gender}" />
                <figcaption class="character__name">${item.name}<figcaption>
            </figure>
            <p class="character__status-text">
                <span data-status="${item.status}" class="character__status character__status--${item.status === 'Alive' ? 'alive' : item.status === 'Dead' ? 'dead' : ''}" title="${item.status}"></span>
                ${item.status}
            </p>
        </li>`;
    })
}

function renderEmptyResults(container) {
    container.querySelector("#message-empty").classList = "";
}

/** EVENTS **/
async function submitSearch(event) {
    const { target } = event;
    event.preventDefault();
    const data = await getCharacters(target.elements.criteria.value);
    let listContainer = containerPage.querySelector("#character-list");
    removeAllChildNodes(listContainer);
    if (data.length) {
        const listCompose = renderCharacters(data, containerPage).join("");
        listContainer.insertAdjacentHTML('beforeend', listCompose);
    } else {
        renderEmptyResults(containerPage);
    }
}

function scrolling(event) {
    const { target: boxScroll } = event 
    if (Math.ceil(boxScroll.offsetHeight + boxScroll.scrollTop) >= boxScroll.scrollHeight) {
        scrollNext(event);
    }
}

async function scrollNext(event) {
    const nextPageURL = getResponseData().info?.next;
    if (nextPageURL) {
        const data = await getCharacters("", true);
        let listContainer = containerPage.querySelector("#character-list");
        const listCompose = renderCharacters(data, containerPage).join("");
        listContainer.insertAdjacentHTML('beforeend', listCompose);
    }

}
/* END EVENTS */