<template>
    <g @click="click" v-bind:transform="'translate(' + (section.x * 32) + ',' + (section.y*32) + ') rotate(' + section.angle + ' 16 16)'">
        <track-straight v-if="section.type === 'straight'" :extended="section.angle % 90 !== 0"></track-straight>
        <track-curve-left v-if="section.type === 'curve-left'"></track-curve-left>
        <track-curve-right v-if="section.type === 'curve-right'"></track-curve-right>
        <track-turnout-left v-if="section.type === 'turnout-left'" :position="section.position" :trackState="trackState" :extended="section.angle % 90 !== 0"></track-turnout-left>
        <track-turnout-right v-if="section.type === 'turnout-right'" :position="section.position" :trackState="trackState" :extended="section.angle % 90 !== 0"></track-turnout-right>
        <track-signal v-if="section.type === 'signal'" :aspect="section.aspect"></track-signal>
        <grid-highlight v-if="section.type === 'grid-highlight'"></grid-highlight>
    </g>
</template>
<script language="ts">
    import Straight from './Straight.vue'
    import CurveLeft from './CurveLeft.vue'
    import CurveRight from './CurveRight.vue'
    import TurnoutLeft from './TurnoutLeft.vue'
    import TurnoutRight from './TurnoutRight.vue'
    import Signal from './Signal.vue'
    import GridHighlight from './GridHighlight.vue'
    export default {
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
        emits:['click'],
        methods: {
            click: function (e) {
                this.section.clicked();
            }
        }
    }

</script>