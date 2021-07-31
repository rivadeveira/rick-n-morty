//remove children and clear events
export function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export function updateActiveLink(href) {
    [...document.querySelectorAll(`#menu .nav__item a.nav__link`)].forEach(e => e.classList = "nav__link");
    document.querySelector(`#menu .nav__item a.nav__link[href="${href}"]`).classList = "nav__link nav__link--active"
}