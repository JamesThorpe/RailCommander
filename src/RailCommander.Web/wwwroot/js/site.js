"use strict";

import socket from "/js/SocketHandler.js"
import "/js/socket-console-logger.js"
socket.open();


const options = {

    moduleCache: {
        vue: Vue
    },

    async getFile(url) {

        const res = await fetch(url);
        if (!res.ok)
            throw Object.assign(new Error(url + ' ' + res.statusText), { res });
        return await res.text();
    },

    addStyle(textContent) {

        const style = Object.assign(document.createElement('style'), { textContent });
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
    },
}
const { loadModule } = window['vue3-sfc-loader'];
Vue.createApp({
    data() {
        return {
            test: 3
        }
    },
    components: {
        'my-app': Vue.defineAsyncComponent(() => loadModule('/vues/Test.vue', options))
    }
}).mount('#app');




