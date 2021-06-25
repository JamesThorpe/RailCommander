"use strict";

import socket from "/js/SocketHandler.js"

const options = {
    moduleCache: {
        vue: Vue
    },
    async getFile(url) {
        const res = await fetch(url, { cache: "reload" });
        if (!res.ok)
            throw Object.assign(new Error(url + " " + res.statusText), { res });
        return await res.text();
    },
    addStyle(textContent) {

        const style = Object.assign(document.createElement("style"), { textContent });
        const ref = document.head.getElementsByTagName("style")[0] || null;
        document.head.insertBefore(style, ref);
    },
}
const { loadModule } = window["vue3-sfc-loader"];
Vue.createApp({
    data: function() {
        return {
            socket
        }
    },
    components: {
        "rail-commander": Vue.defineAsyncComponent(() => loadModule("/vues/RailCommander.vue", options))
    },
    template: "<rail-commander :socket='socket' />"
}).mount("#app");