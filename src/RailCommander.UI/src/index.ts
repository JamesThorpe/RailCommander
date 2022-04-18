import { createApp } from 'vue'

import RailCommander from './vues/RailCommander.vue'
import "./styles/site.less"

createApp({
    components: {
        "rail-commander": RailCommander
    },
    template: "<rail-commander />"
}).mount("#app");