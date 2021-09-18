"use strict";

const options = {
    moduleCache: {
        vue: Vue
    },
    async getFile(url) {
        const res = await fetch(url, { cache: "reload" });
        if (!res.ok)
            throw Object.assign(new Error(url + " " + res.statusText), { res });

        url = /.*?\.js|.mjs|.css|.less|.vue$/.test(url) ? url : `${url}.vue`
        const type = /.*?\.js|.mjs$/.test(url) ? ".mjs" : /.*?\.vue$/.test(url) ? '.vue' : /.*?\.css$/.test(url) ? '.css' : '.vue';
        const getContentData = asBinary => fetch(url).then(res => !res.ok ? Promise.reject(url) : asBinary ? res.arrayBuffer() : res.text())
        return { getContentData: getContentData, type: type }

    },
    addStyle(textContent) {

        const style = Object.assign(document.createElement("style"), { textContent });
        const ref = document.head.getElementsByTagName("style")[0] || null;
        document.head.insertBefore(style, ref);
    },
}
const { loadModule } = window["vue3-sfc-loader"];
const railCommander = Vue.defineAsyncComponent(() => loadModule("/vues/RailCommander.vue", options));

const app = Vue.createApp({
    components: {
        "rail-commander": railCommander
    },
    template: "<rail-commander />"
});
app.mount("#app");
