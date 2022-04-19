<template>
	<v-switch hide-details="true" density="compact" v-model="fn.On" :label="fn.Name"></v-switch>
</template>

<script language="ts">
    export default {
        props: ['fn']
    }
</script>