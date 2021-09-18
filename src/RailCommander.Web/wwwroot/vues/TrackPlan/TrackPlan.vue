<template>
    <svg width="900" height="400" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
        <g v-for="block in layout.trackBlocks" stroke="#888" stroke-width="14">
            <track-section v-for="section in block.trackSections" :section="section" :trackState="false"></track-section>
        </g>
    </svg>
</template>
<script>
    "use strict";
    /*
    import Track from '/vues/TrackPlan/Track.vue'

    export default {
        components: {
            "track-section": Track
        }
    }
    */
</script>