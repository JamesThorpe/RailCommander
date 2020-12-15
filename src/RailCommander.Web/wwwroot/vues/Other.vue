<template>
    <div>some other vue: {{ data.x * data.y }}</div>
</template>
<script>
    module.exports = {
        data: function () {
            return {
                
            }
        },
        props: ['data']
    }

</script>