<template>
    <path v-if="!extended" d="M 0, 16 h 32" />
    <path v-if="extended" d="M -7, 16, h 46" />
</template>
<script>
    module.exports = {
        props:['extended']
    }
</script>