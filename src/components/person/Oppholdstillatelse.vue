<template>
    <pre class="Oppholdstillatelse">
        {{oppholdstillatelse}}
    </pre>
</template>

<script>
    export default {
        name: "Oppholdstillatelse",
        props: {
            'data': Array
        },
        computed: {
            oppholdstillatelse: function () {
                let retval = {};
                let p = this.data;
                if (p.length > 0) {
                    p = p[0];
                    retval = {
                        oppholdsTillatelse: p.oppholdsTillatelse,
                        oppholdsTillatelseFraDato: p.oppholdsTillatelseFraDato,
                        oppholdsTillatelseKilde: p.oppholdsTillatelseKilde,
                        oppholdsTillatelseTilDato: p.oppholdsTillatelseTilDato,
                        oppholdsTillatelseRegistrertAv: p.oppholdsTillatelseRegistrertAv
                    }
                }
                return (Object.entries(retval).length !== 0) ? JSON.stringify(retval, null, 4) : null
            }
        }
    }
</script>

<style scoped>

</style>