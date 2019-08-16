<template>
    <pre class="Personinfo">
        {{personinfo}}
    </pre>
</template>

<script>
    export default {
        name: "Personinfo",
        props: {
            'data': Array
        },
        computed: {
            personinfo: function () {
                let retval = {};
                let p = this.data;
                if (p.length > 0) {
                    p = p[0];
                    retval = {
                        personFodtKommune: p.personFodtKommune,
                        personFraDato: p.personFraDato,
                        personKjonn: p.personKjonn,
                        personKilde: p.personKilde,
                        personDatofodt: p.personDatofodt,
                        personFodtLand: p.personFodtLand,
                        personTilDato: p.personTilDato
                    }
                }
                return (Object.entries(retval).length !== 0) ? JSON.stringify(retval, null, 4) : null
            }
        }
    }
</script>

<style scoped>

</style>