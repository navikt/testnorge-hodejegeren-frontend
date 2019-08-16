<template>
    <pre class="PersonIdentstatus">
        {{personIdentstatus}}
    </pre>
</template>

<script>
    export default {
        name: "PersonIdentstatus",
        props: {
            'data': Array
        },
        computed: {
            personIdentstatus: function () {
                let retval = {};
                let p = this.data;
                if (p.length > 0) {
                    p = p[0];
                    retval = {
                        personIdentStatusFraDato: p.personIdentStatusFraDato,
                        personIdentStatusKilde: p.personIdentStatusKilde,
                        personIdentStatus: p.personIdentStatus,
                        personIdentStatusTilDato: p.personIdentStatusTilDato
                    }
                }
                return (Object.entries(retval).length !== 0) ? JSON.stringify(retval, null, 4) : null
            }
        }
    }
</script>

<style scoped>

</style>