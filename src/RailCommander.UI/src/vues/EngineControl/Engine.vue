<template>

    <v-card density="compact" variant="outlined" class="ma-2">
        <v-card-title>{{engine.Name}}</v-card-title>
        <v-card-subtitle>Address: {{engine.Address}}</v-card-subtitle>

        <v-card-text>
            
        
            <v-row>
                <v-col cols="2">
                    <v-btn-toggle v-model="engine.Forwards" rounded="xl" color="primary" mandatory>
                        <v-btn :value="false" icon="fa fa-circle-left"></v-btn>
                        <v-btn :value="true" icon="fa fa-circle-right"></v-btn>
                    </v-btn-toggle>
                </v-col>
                <v-col>
                    <v-slider v-model="engine.Speed" min="0" max="127" step="1" thumb-label class="pt-2"></v-slider>
                </v-col>
                <v-col cols="2">
                    <v-btn @click="engine.Stop()" class="mr-2 mb-2" icon="fa fa-stop"></v-btn>
                    <v-btn @click="engine.EmergencyStop()" class="mb-2" icon="fa fa-circle-stop" color="error"></v-btn>
                </v-col>
            </v-row>
        

        

        <div class="d-flex flex-wrap">
        <div v-for="fun in engine.Functions" class="pl-2 pr-2 mb-2">
            <!-- TODO: see if we can use functiontypes enum here -->
            <toggle-function v-if="fun.Type === 1" :fn="fun" />
            <momentary-function v-if="fun.Type === 0" :fn="fun" />
        </div>
        </div>
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