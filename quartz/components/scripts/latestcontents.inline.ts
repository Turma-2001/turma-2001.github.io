class LatestContents extends HTMLElement {

    constructor() {
        super()
    }

    async connectedCallback() {
        console.log("success")
    }

}


window.customElements.define('latest-contents', LatestContents)