<template>
    <path v-if="position === 'reverse' || !trackState" d="M 0, 16 Q 16 16, 32 0" fill="transparent" />
    <path v-if="position === 'normal' || !trackState" d="M 0, 16 h 32" />
    <path v-if="position === 'normal' && trackState" d="M32 0 28 4" />
</template>
<script>
    module.exports = {
        props: ['position', 'trackState']
    }
</script>