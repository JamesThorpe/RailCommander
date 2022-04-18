<template>
    <button @mousedown="fn.Activate" @mouseup="fn.Deactivate">{{fn.Name}}</button>
</template>

<script language="ts">
    export default {
        props: ['fn']
    }
</script>