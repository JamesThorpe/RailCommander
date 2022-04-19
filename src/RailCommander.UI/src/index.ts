import "./styles/site.scss"
import "vuetify/styles"

import { createApp } from 'vue'
import { createVuetify } from "vuetify"
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import RailCommander from './vues/RailCommander.vue'

const app = createApp({
    components: {
        "rail-commander": RailCommander
    },
    template: "<rail-commander />"
});

const vuetify = createVuetify({
    components,
    directives
});
app.use(vuetify);


app.mount("#app");