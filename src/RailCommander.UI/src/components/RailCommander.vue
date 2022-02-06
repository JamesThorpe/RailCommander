<template>
    <h1>Rail Commander</h1>

    <!--
    <track-plan :layout="layout" />
        -->
    <locomotive v-for="loco in layout.locos" :loco="loco" />
</template>

<script lang="ts">
    import Vue from 'vue';
    import Api from '../api/api'
    import { Layout } from '../api/types';

    interface Data {
        layout?: Layout
    }

    export default Vue.extend({
        data(): Data {
            return {
                layout: undefined
            };
        },
        created() {
            this.initialise();
        },
        methods: {
            async initialise() {
                this.layout = await Api.LoadLayoutData();

            }
        }

    });

    /*

    import Socket from "/js/SocketHandler.js"
    import TrackPlan from "./TrackPlan/TrackPlan.vue"
    import Api from "/js/api.js"
    import Locomotive from "./EngineControl/Locomotive.vue"
    

    export default {
        components: {
            "track-plan": TrackPlan,
            "locomotive": Locomotive
        },
        data () {
            return {
                layout: {
                    
                }
            }
        },
        mounted: async function () {
            Socket.open();
            this.layout = await Api.loadLayoutAsync();
            Socket.bindLayout(this.layout);
        }
    }
    */
</script>