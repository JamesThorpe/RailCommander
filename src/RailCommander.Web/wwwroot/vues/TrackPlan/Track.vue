<template>
    <g @click="click" v-bind:transform="'translate(' + (section.x * 32) + ',' + (section.y*32) + ') rotate(' + section.angle + ' 16 16)'">
        <track-straight v-if="section.type === 'straight' && !single"></track-straight>
        <track-curve-left v-if="section.type === 'curve-left' && !single"></track-curve-left>
        <track-turnout-left v-if="section.type === 'turnout-left' && !single" :position="section.position" :trackState="trackState"></track-turnout-left>
        <track-signal v-if="section.type === 'signal' && single" :aspect="section.aspect"></track-signal>
    </g>
</template>
<script>
    import Straight from '/vues/TrackPlan/Straight.vue'
    import CurveLeft from '/vues/TrackPlan/CurveLeft.vue'
    import TurnoutLeft from '/vues/TrackPlan/TurnoutLeft.vue'
    import Signal from '/vues/TrackPlan/Signal.vue'

    module.exports = {
        components: {
            'track-straight': Straight,
            'track-curve-left': CurveLeft,
            'track-turnout-left': TurnoutLeft,
            'track-signal': Signal
        },
        props: ['section', 'trackState', 'single'],
        methods: {
            click: function () {
                this.section.clicked();
            }
        }
    }

</script>