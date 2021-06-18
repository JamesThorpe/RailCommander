<template>
    
    <path d="
            M 0, 11
            h 32
            v 10
            h -32
            v -10
            z
          "
          :fill="fillColor"
          />
</template>

<script>
    module.exports = {
        props: ['state'],
        computed: {
            fillColor: function () {
                switch (this.state) {
                    case "unreserved":
                        return "#000";
                    case "reserved":
                        return "#ff0";
                    case "occupied":
                        return "#f00";
                }
            }
        }
    }
</script>