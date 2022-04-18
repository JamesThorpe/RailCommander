<template>
    <div class="engine-control">
        <div>Address: <span>{{engine.Address}}</span></div>
        <label class="switch">
            <input type="checkbox" v-model="engine.Forwards" />
            <span class="switch-on">Forwards</span>
            <span class="switch-off">Backwards</span>
        </label>
        <input type="range" min="0" max="127" v-model="engine.Speed" />

        <button @click="engine.Stop">Stop</button>
        <button @click="engine.EmergencyStop">Emergency Stop</button>

        <span v-for="fun in engine.Functions">
            <!-- TODO: see if we can use functiontypes enum here -->
            <toggle-function v-if="fun.Type === 1" :fn="fun" />
            <momentary-function v-if="fun.Type === 0" :fn="fun" />
        </span>
    </div>
</template>

<script language="ts">
    
    import ToggleFunction from './ToggleFunction.vue';
    import MomentaryFunction from './MomentaryFunction.vue'

    export default {
        components: {
            'toggle-function': ToggleFunction,
            'momentary-function': MomentaryFunction
        },
        props: ['engine']
    }

</script>