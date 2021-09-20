<template>
    <path v-if="position === 'reverse' || !trackState" d="M 0, 16 Q 16 16, 32 32" fill="transparent" />
    <path v-if="position === 'normal' || !trackState" d="M 0, 16 h 32" />
    <path v-if="position === 'normal' && trackState" d="M32 32 28 28" />
</template>
<script>
    module.exports = {
        props: ['position', 'trackState']
    }
</script>