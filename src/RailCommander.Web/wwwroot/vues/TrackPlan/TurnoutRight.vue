<template>
    <g v-if="!extended">
        <transition name="fade">
            <path v-if="position === 'reverse' || !trackState" d="M 0, 16 Q 16 16, 32 32" fill="transparent" />
        </transition>
        <transition name="fade">
            <path v-if="position === 'normal' || !trackState" d="M 0, 16 h 32" />
        </transition>
        <transition name="fade">
            <path v-if="position === 'normal' && trackState" d="M32 32 28 28" />
        </transition>
    </g>
    <g v-if="extended">
        <transition name="fade">
            <path v-if="position === 'reverse' || !trackState" d="M -7, 16 Q 16 16, 28 28" fill="transparent" />
        </transition>
        <transition name="fade">
            <path v-if="position === 'normal' || !trackState" d="M -7, 16 h 53" />
        </transition>
        <transition name="fade">
            <path v-if="position === 'reverse' && trackState" d="M46 16 28 16" />
        </transition>
    </g>
</template>
<script>
    module.exports = {
        props: ['position', 'trackState', 'extended']
    }
</script>