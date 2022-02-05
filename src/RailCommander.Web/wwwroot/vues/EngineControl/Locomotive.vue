<template>
    <div class="loco-control">
        <div>Address: <span>{{loco.Address}}</span></div>
        <input type="range" min="0" max="127" v-model="loco.Speed" /><span>{{loco.Speed}}</span>
        <button @click="loco.Stop">Stop</button>
        <button @click="loco.EmergencyStop">Emergency Stop</button>
    </div>
</template>

<script>
    "use strict";


    export default {
        props: ['loco']
    }

</script>