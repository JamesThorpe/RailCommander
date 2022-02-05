<template>
    <button @mousedown="fn.Activate" @mouseup="fn.Deactivate" v-model="fn.On">{{fn.Name}}</button>
</template>

<script>
    "use strict";
    export default {
        props: ['fn']
    }
</script>