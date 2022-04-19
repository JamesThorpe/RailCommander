<template>

    <v-card density="compact">
        <v-card-title>{{engine.Name}}</v-card-title>
        <v-card-subtitle>Address: {{engine.Address}}</v-card-subtitle>

        <v-card-text>
            
        <v-btn-toggle v-model="engine.Forwards" variant="outlined" rounded="xl">
            <v-btn :value="false">Backwards</v-btn>
            <v-btn :value="true">Forwards</v-btn>
        </v-btn-toggle>


        <input type="range" min="0" max="127" v-model="engine.Speed" />
        <v-slider v-model="engine.Speed" min="0" max="127" step="1" thumb-label></v-slider>
        <v-btn @click="engine.Stop()">Stop</v-btn>
        <v-btn @click="engine.EmergencyStop()">Emergency Stop</v-btn>

        <span v-for="fun in engine.Functions">
            <!-- TODO: see if we can use functiontypes enum here -->
            <toggle-function v-if="fun.Type === 1" :fn="fun" />
            <momentary-function v-if="fun.Type === 0" :fn="fun" />
        </span>
        </v-card-text>
    </v-card>
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