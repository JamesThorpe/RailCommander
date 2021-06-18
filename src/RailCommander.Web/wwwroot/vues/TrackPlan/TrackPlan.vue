<template>
    <svg width="900" height="400" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
        <g v-for="section in LayoutSections" v-bind:transform="'translate(' + (section.x * 32) + ',' + (section.y*32) + ') rotate(' + section.angle + ' 16 16)'" :stroke="getSectionColour(section.state)" stroke-width="10">
            <track-straight v-if="section.type === 'straight'"></track-straight>
            <track-curve-left v-if="section.type === 'curve-left'"></track-curve-left>
        </g>
    </svg>
</template>
<script>
    import Straight from '/vues/TrackPlan/Straight.vue'
    import CurveLeft from '/vues/TrackPlan/CurveLeft.vue'
    module.exports = {
        components: {
            'track-straight': Straight,
            'track-curve-left': CurveLeft
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