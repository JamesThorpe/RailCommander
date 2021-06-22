<template>
    <svg width="900" height="400" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
        <g v-for="section in LayoutSections" stroke="#00f" stroke-width="20">
            <track-section :section="section" :trackState="false"></track-section>
        </g>
        <g v-for="section in LayoutSections" stroke="#fff" stroke-width="16">
            <track-section :section="section" :trackState="false"></track-section>
        </g>
        <g v-for="section in LayoutSections" :stroke="getSectionColour(section.state)" stroke-width="10">
            <track-section :section="section" :trackState="true"></track-section>
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
                        return "#ff0";
                    case "occupied":
                        return "#f00";
                }
            }
        },
        props: ['LayoutSections']
    }
</script>