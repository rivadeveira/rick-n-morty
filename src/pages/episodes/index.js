import { getEpisodeCharacters, getEpisodes, getResponseData } from "./episodes.data";
import { removeAllChildNodes, updateActiveLink } from "../../utils";
import "./episodes.css"; 
import html from "./episodes.html"; 
let containerPage = document.querySelector("#content");

export async function start() {
    updateActiveLink("/#/episodios");
    const data = await getEpisodes();
    renderView(data);   
}

function renderView(data = null) {
    containerPage.insertAdjacentHTML('beforeend', html);
    containerPage.querySelector("#episode-form").addEventListener("submit", submitSearch);
    containerPage.querySelector("#episode-list").addEventListener("scroll", scrolling);
    containerPage.querySelector("#episode-characters > #close-dialog").addEventListener("click", closeCharacterModal);  

    if (data && data.length) {
        let listContainer = containerPage.querySelector("#episode-list");
        const listCompose = renderEpisodes(data, containerPage).join("");
        listContainer.insertAdjacentHTML('beforeend', listCompose);
        const btnsCharacters = listContainer.querySelectorAll("button[data-ep]");
        [...btnsCharacters].forEach(el => el.addEventListener("click", viewCharacters))
    } else {
        renderEmptyResults(containerPage);
    }
}

function renderEpisodes(listData, container) {
    container.querySelector("#message-empty").classList = "hide";
    return listData.map(item => {
        return `<li class="episode__item">
            <div class="episode__info">
                <p class="episode__name">${item.name}</p>
                <time class="episode__time" datetime="${new Date(item.air_date)}">${item.air_date}</time>
            </div>
            <button data-ep="${item.id}" class="episode__cta">Ver personajes</button>
        </li>`;
    })
}



function renderEmptyResults(container) {
    container.querySelector("#message-empty").classList = "";
}

function renderEpisodeCharacters(data) {
    return data.map(item => {
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
    });
}

/** EVENTS **/

async function viewCharacters(event) {
    const {ep: epId} = event.target.dataset;
    const charactersData = await getEpisodeCharacters(+epId);
    let dialogContainer = containerPage.querySelector("#episode-characters");
    let listContainer = containerPage.querySelector("#episode-characters-list");
    const listCompose = renderEpisodeCharacters(charactersData).join("");
    listContainer.insertAdjacentHTML('beforeend', listCompose);  
    dialogContainer.classList = "episodes__characters episodes__characters--show"
}

function closeCharacterModal(event) {
    let dialogContainer = containerPage.querySelector("#episode-characters");
    let listContainer = containerPage.querySelector("#episode-characters-list");
    dialogContainer.classList = "episodes__characters";
    removeAllChildNodes(listContainer) ;
}

async function submitSearch(event) {
    const { target } = event;
    event.preventDefault();
    const data = await getEpisodes(target.elements.criteria.value);
    let listContainer = containerPage.querySelector("#episode-list");
    removeAllChildNodes(listContainer);
    if (data.length) {
        const listCompose = renderEpisodes(data, containerPage).join("");
        listContainer.insertAdjacentHTML('beforeend', listCompose);
        const btnsCharacters = listContainer.querySelectorAll("button[data-ep]");
        [...btnsCharacters].forEach(el => el.addEventListener("click", viewCharacters))
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
        const data = await getEpisodes("", true);
        let listContainer = containerPage.querySelector("#episode-list");
        const listCompose = renderEpisodes(data, containerPage).join("");
        listContainer.insertAdjacentHTML('beforeend', listCompose);
    }

}
/* END EVENTS */