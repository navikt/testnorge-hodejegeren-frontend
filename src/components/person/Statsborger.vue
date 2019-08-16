<template>
    <pre class="Statsborger">
        {{statsborger}}
    </pre>
</template>

<script>
    export default {
        name: "Statsborger",
        props: {
            'data': Array
        },
        computed: {
            statsborger: function () {
                let retval = {};
                let p = this.data;
                if (p.length > 0) {
                    p = p[0];
                    retval = {
                        statsborgerTilDato: p.statsborgerTilDato,
                        statsborger: p.statsborger,
                        statsborgerFraDato: p.statsborgerFraDato,
                        statsborgerKilde: p.statsborgerKilde,
                        statsborgerRegistrertAv: p.statsborgerRegistrertAv
                    }
                }
                return (Object.entries(retval).length !== 0) ? JSON.stringify(retval, null, 4) : null
            }
        }
    }
</script>

<style scoped>

</style>