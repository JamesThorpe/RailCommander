<template>
    <v-btn @mousedown="fn.Activate()" @mouseup="fn.Deactivate()">{{fn.Name}}</v-btn>
</template>

<script language="ts">
    export default {
        props: ['fn']
    }
</script>