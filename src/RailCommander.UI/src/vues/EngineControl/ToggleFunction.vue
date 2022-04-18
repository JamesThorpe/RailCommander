<template>
	<label>
		<input v-model="fn.On" type="checkbox" />
		<span>{{fn.Name}}</span>
	</label>
</template>

<script language="ts">
    export default {
        props: ['fn']
    }
</script>