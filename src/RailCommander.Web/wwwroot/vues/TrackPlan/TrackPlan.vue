<template>
    <svg width="900" height="400" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
        <g v-for="straight in LayoutSections" v-bind:transform="'translate(' + (straight.x * 32) + ',' + (straight.y*32) + ')'">
            <track-straight v-if="straight.type === 'straight'" :state="straight.state"></track-straight>
        </g>
        
    </svg>
</template>
<script>
    import Straight from '/vues/TrackPlan/Straight.vue'
    module.exports = {
        components: {
            'track-straight': Straight
        },
        props: ['LayoutSections']
    }
</script>