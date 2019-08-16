<template>
    <pre class="Migrasjon">
        {{_migrasjon}}
    </pre>
</template>

<script>
    export default {
        name: "Migrasjon",
        props: {
            'data': Array
        },
        computed: {
            _migrasjon: function () {
                let retval = {};
                let p = this.data;
                if (p.length > 0) {
                    p = p[0];
                    retval = {
                        migrasjonRegistrertAv: p.migrasjonRegistrertAv,
                        migrasjonTilDato: p.migrasjonTilDato,
                        migrasjon: p.migrasjon,
                        migrasjonFraDato: p.migrasjonFraDato,
                        migrasjonKilde: p.migrasjonKilde,
                        migrasjonLand: p.migrasjonLand
                    }
                }
                return (Object.entries(retval).length !== 0) ? JSON.stringify(retval, null, 4) : null
            }
        }
    }
</script>

<style scoped>

</style>