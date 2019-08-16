<template>
    <pre class="Sivilstand">
        {{sivilstand}}
    </pre>
</template>

<script>
    export default {
        name: "Sivilstand",
        props: {
            'data': Array
        },
        computed: {
            sivilstand: function () {
                let retval = {};
                let p = this.data;
                if (p.length > 0) {
                    p = p[0];
                    retval = {
                        sivilstand: p.sivilstand,
                        sivilstandTilDato: p.sivilstandTilDato,
                        sivilstandFraDato: p.sivilstandFraDato,
                        sivilstandKilde: p.sivilstandKilde,
                        sivilstandRegistrertAv: p.sivilstandRegistrertAv
                    }
                }
                return (Object.entries(retval).length !== 0) ? JSON.stringify(retval, null, 4) : null
            }
        }
    }
</script>

<style scoped>

</style>