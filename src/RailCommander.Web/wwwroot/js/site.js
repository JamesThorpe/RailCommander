"use strict";

import socket from "/js/SocketHandler.js"
import "/js/socket-console-logger.js"
import layout from "/js/Layout.js"
socket.open();


const options = {

    moduleCache: {
        vue: Vue
    },

    async getFile(url) {

        const res = await fetch(url, {cache:"reload"});
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
    
    data: function() {
        return {
            layout
        }
    },
    
    components: {
        'trackplan': Vue.defineAsyncComponent(() => loadModule('/vues/TrackPlan/TrackPlan.vue', options))
    },
    template:'<trackplan :layout="layout"></trackplan>'
}).mount('#app');