<template>
    <g @click="click" v-bind:transform="'translate(' + (section.x * 32) + ',' + (section.y*32) + ') rotate(' + section.angle + ' 16 16)'">
        <track-straight v-if="section.type === 'straight'" :extended="section.angle % 90 !== 0"></track-straight>
        <track-curve-left v-if="section.type === 'curve-left'"></track-curve-left>
        <track-curve-right v-if="section.type === 'curve-right'"></track-curve-right>
        <track-turnout-left v-if="section.type === 'turnout-left'" :position="section.position" :trackState="trackState"></track-turnout-left>
        <track-turnout-right v-if="section.type === 'turnout-right'" :position="section.position" :trackState="trackState"></track-turnout-right>
        <track-signal v-if="section.type === 'signal'" :aspect="section.aspect"></track-signal>
        <grid-highlight v-if="section.type === 'grid-highlight'"></grid-highlight>
    </g>
</template>
<script>
    import Straight from '/vues/TrackPlan/Straight.vue'
    import CurveLeft from '/vues/TrackPlan/CurveLeft.vue'
    import CurveRight from '/vues/TrackPlan/CurveRight.vue'
    import TurnoutLeft from '/vues/TrackPlan/TurnoutLeft.vue'
    import TurnoutRight from '/vues/TrackPlan/TurnoutRight.vue'
    import Signal from '/vues/TrackPlan/Signal.vue'
    import GridHighlight from '/vues/TrackPlan/GridHighlight.vue'
    module.exports = {
        components: {
            'track-straight': Straight,
            'track-curve-left': CurveLeft,
            'track-curve-right': CurveRight,
            'track-turnout-left': TurnoutLeft,
            'track-turnout-right': TurnoutRight,
            'track-signal': Signal,
            'grid-highlight': GridHighlight
        },
        props: ['section', 'trackState'],
        methods: {
            click: function () {
                this.section.clicked();
            }
        }
    }

</script>