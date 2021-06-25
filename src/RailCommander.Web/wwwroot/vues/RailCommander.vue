<template>
    <h1>Rail Commander</h1>

    <track-plan />
</template>

<script>
    "use strict";

    import TrackPlan from "./TrackPlan/TrackPlan.vue"
    

    module.exports = {
        components: {
            "track-plan": TrackPlan
        },
        props: ['socket'],
        mounted: function () {
            this.socket.open();
        }
    }
</script>