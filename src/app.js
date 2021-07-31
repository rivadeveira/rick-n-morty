import router from "./router";
import "./styles.css";

document.addEventListener("DOMContentLoaded", function() {
    router(window.location.hash);
    window.addEventListener("hashchange", (ev) => {
        router(window.location.hash);
    })
});