// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

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
        'my-app': Vue.defineAsyncComponent(()=>loadModule('/vues/Test.vue', options))
    }
}).mount('#app')