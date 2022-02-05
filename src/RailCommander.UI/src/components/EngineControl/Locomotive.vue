<template>
    <div class="loco-control">
        <div>Address: <span>{{loco.Address}}</span></div>
        <label class="switch">
            <input type="checkbox" v-model="loco.Forwards" />
            <span class="switch-on">Forwards</span>
            <span class="switch-off">Backwards</span>
        </label>
        <input type="range" min="0" max="127" v-model="loco.Speed" />

        <button @click="loco.Stop">Stop</button>
        <button @click="loco.EmergencyStop">Emergency Stop</button>

        <span v-for="fun in loco.Functions">
            <toggle-function v-if="fun.Type == 'toggle'" :fn="fun" />
            <momentary-function v-if="fun.Type === 'momentary'" :fn="fun" />
        </span>
    </div>
</template>

<script>
    "use strict";

    import ToggleFunction from './ToggleFunction.vue';
    import MomentaryFunction from './MomentaryFunction.vue'

    export default {
        components: {
            'toggle-function': ToggleFunction,
            'momentary-function': MomentaryFunction
        },
        props: ['loco']
    }

</script>