<template>
    <pre class="foreldreansvar">
        {{foreldreansvar}}
    </pre>
</template>

<script>
    export default {
        name: "Foreldreansvar",
        props: {
            'data': Array
        },
        computed: {
            foreldreansvar: function () {
                let retval = {};
                let p = this.data;
                if (p.length > 0) {
                    p = p[0];
                    retval = {
                        foreldreAnsvar: p.foreldreAnsvar,
                        foreldreAnsvarFraDato: p.foreldreAnsvarFraDato,
                        foreldreAnsvarTilDato: p.foreldreAnsvarTilDato,
                        foreldreAnsvarKilde: p.foreldreAnsvarKilde,
                        forreldreAnsvarRegistrertAv: p.forreldreAnsvarRegistrertAv
                    }
                }
                return (Object.entries(retval).length !== 0) ? JSON.stringify(retval, null, 4) : null
            },
        }
    }
</script>

<style scoped>

</style>