import {start as initCharacters} from "./pages/characters";
import {start as initEpisodes} from "./pages/episodes";
import { removeAllChildNodes } from "./utils";
const containerPage = document.querySelector("#content");
export default function router(route) {
    removeAllChildNodes(containerPage);
    switch(route) {
        case "#":
            return initEpisodes();
        case "#/episodios":
            return initEpisodes();
        case "#/personajes":
            return initCharacters();
        default: {
            history.pushState(null, "", "/#/personajes");
            return initEpisodes();
        }
    }
}


