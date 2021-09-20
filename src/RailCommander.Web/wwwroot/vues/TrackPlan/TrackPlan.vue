<template>
    <svg width="900" height="400" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
        <g v-for="block in layout.blocks" stroke="#888" stroke-width="14">
            <track-section v-for="section in block.sections" :section="section" :trackState="false"></track-section>
        </g>
        <g v-for="block in layout.blocks" stroke="#fff" stroke-width="10">
            <track-section v-for="section in block.sections" :section="section" :trackState="false"></track-section>
        </g>
        <g v-for="block in layout.blocks" :stroke="getSectionColour(block.state)" stroke-width="5">
            <track-section v-for="section in block.sections" :section="section" :trackState="true"></track-section>
        </g>
    </svg>
</template>
<script>
    "use strict";
    
    import Track from '/vues/TrackPlan/Track.vue'

    export default {
        components: {
            "track-section": Track
        },
        methods: {
            getSectionColour: function (sectionState) {
                switch (sectionState) {
                    case "unreserved":
                        return "#000";
                    case "reserved":
                        return "#e0b509";
                    case "occupied":
                        return "#a10a0a";
                }
            }
        },
        props: ['layout']
    }
    
</script>