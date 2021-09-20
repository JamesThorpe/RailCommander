<template>
    <h1>Rail Commander</h1>

    <track-plan :layout="layout" />
</template>

<script>
    "use strict";

    import Socket from "/js/SocketHandler.js"
    import TrackPlan from "./TrackPlan/TrackPlan.vue"
    import Api from "/js/api.js"

    export default {
        components: {
            "track-plan": TrackPlan
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
        }
    }
</script>