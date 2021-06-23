<template>
    <svg width="900" height="400" @mousemove="mousemove" @mouseleave="mouseleave" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
        <g v-for="block in layout.trackBlocks" stroke="#888" stroke-width="14">
            <track-section v-for="section in block.trackSections" :section="section" :trackState="false"></track-section>
        </g>
        <g v-for="block in layout.trackBlocks" stroke="#fff" stroke-width="10">
            <track-section v-for="section in block.trackSections" :section="section" :trackState="false"></track-section>
        </g>
        <g v-for="block in layout.trackBlocks" :stroke="getSectionColour(block.state)" stroke-width="5">
            <track-section v-for="section in block.trackSections" :section="section" :trackState="true"></track-section>
        </g>

        <g v-for="signal in layout.signals">
            <track-section :section="signal"></track-section>
        </g>

        <g v-for="meta in layout.meta">
            <track-section :section="meta"></track-section>
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
            },
            mousemove: function (e) {
                this.layout.mousemove(e);
            },
            mouseleave: function (e) {
                this.layout.mouseleave(e);
            }
        },
        props: ['layout']
    }
</script>