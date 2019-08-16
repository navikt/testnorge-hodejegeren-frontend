<template>
    <pre class="Doed">
        {{doed}}
    </pre>
</template>

<script>
    export default {
        name: "Doed",
        props: {
            'data': Array
        },
        computed: {
            doed: function () {
                let retval = {};
                let p = this.data;
                if (p.length > 0) {
                    p = p[0];
                    retval = {
                        datoDod: p.datoDod,
                        dodDatoReg: p.dodDatoReg,
                        dodKilde: p.dodKilde,
                        dodRegistrertAv: p.dodRegistrertAv
                    }
                }
                return (Object.entries(retval).length !== 0) ? JSON.stringify(retval, null, 4) : null
            }
        }
    }
</script>

<style scoped>

</style>