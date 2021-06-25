<template>
    <path d="M 28 4 18 4" stroke="#000" stroke-width="2" />
    <circle cx="28" cy="4" r="4" :fill="getAspectColour()" />
</template>
<script>
    module.exports = {
        props: ['aspect'],
        methods: {
            getAspectColour: function () {
                switch (this.aspect) {
                    case "danger":
                        return "#f02000";
                    case "caution":
                        return "#f0b000";
                    case "clear":
                        return "#29b000";
                }
            }
        }
    }
</script>