<template>
    <h1>Rail Commander</h1>
    <track-plan :layout="RailCommander.Layout" />

    <engine v-for="engine in RailCommander.Engines" :engine="engine" />
</template>

<script language="ts">

    import rc from "../api/RailCommander"
    import TrackPlan from "./TrackPlan/TrackPlan.vue"
    import Engine from "./EngineControl/Engine.vue"


    export default {
        components: {
            "track-plan": TrackPlan,
            "engine": Engine
        },
        data() {
            return {
                RailCommander: rc
            }
        },
        mounted: async function () {
            this.RailCommander.loadLayoutAsync();
        }
    }    
</script>