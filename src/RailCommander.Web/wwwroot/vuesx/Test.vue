<template>
    <div>{{ greeting }}</div>
    <other-vue v-bind:data="test"></other-vue>
</template>
<script>
    import other from '/vues/Other.vue'
    module.exports = {
        components: {
            'other-vue': other
        },
        data: function () {
            return {
                greeting: "Hello World!",
                test: {
                    x: 5, y: 10
                }
            }
        }
    }

</script>