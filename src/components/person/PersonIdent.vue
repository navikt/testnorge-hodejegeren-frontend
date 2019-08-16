<template>
    <pre class="PersonIdent">
        {{personIdent}}
    </pre>
</template>

<script>
    export default {
        name: "PersonIdent",
        props: {
            'data': Array
        },
        computed: {
            personIdent: function () {
                let retval = {};
                let p = this.data;
                if (p.length > 0) {
                    p = p[0];
                    retval = {
                        personIdentTilDato: p.personIdentTilDato,
                        personIdentKilde: p.personIdentKilde,
                        personIdentFraDato: p.personIdentFraDato,
                        personIdent: p.personIdent,
                        personIdenttype: p.personIdenttype,
                        personIdentneste: p.personIdentneste
                    }
                }
                return (Object.entries(retval).length !== 0) ? JSON.stringify(retval, null, 4) : null
            }
        }
    }
</script>

<style scoped>

</style>