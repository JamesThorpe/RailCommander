<template>
    <g v-if="!extended">
        <path v-if="position === 'reverse' || !trackState" d="M 0, 16 Q 16 16, 32 0" fill="transparent" />
        <path v-if="position === 'normal' || !trackState" d="M 0, 16 h 32" />
        <path v-if="position === 'normal' && trackState" d="M32 0 28 4" />
    </g>
    <g v-if="extended">
        <path v-if="position === 'reverse' || !trackState" d="M -7, 16 Q 16 16, 28 4" fill="transparent" />
        <path v-if="position === 'normal' || !trackState" d="M -7, 16 h 53" />
        <path v-if="position === 'reverse' && trackState" d="M46 16 28 16" />
    </g>
</template>
<script>
    module.exports = {
        props: ['position', 'trackState', 'extended']       
    }
</script>