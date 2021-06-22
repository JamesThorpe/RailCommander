<template>
    <svg width="900" height="400" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
        <g v-for="block in Blocks" stroke="#00f" stroke-width="20">
            <track-section v-for="section in block.trackSections" :section="section" :trackState="false"></track-section>
        </g>
        <g v-for="block in Blocks" stroke="#fff" stroke-width="16">
            <track-section v-for="section in block.trackSections" :section="section" :trackState="false"></track-section>
        </g>
        <g v-for="block in Blocks" :stroke="getSectionColour(block.state)" stroke-width="10">
            <track-section v-for="section in block.trackSections" :section="section" :trackState="true"></track-section>
        </g>
    </svg>
</template>
<script>
    import Track from '/vues/TrackPlan/Track.vue'
    module.exports = {
        components: {
            'track-section': Track
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
        props: ['Blocks']
    }
</script>