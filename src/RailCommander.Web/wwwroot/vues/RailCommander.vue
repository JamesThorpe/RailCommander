<template>
    <h1>Rail Commander</h1>

    <track-plan />
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
        mounted: async function () {
            Socket.open();
            console.log(await Api.loadLayoutAsync());
        }
    }
</script>