<template>
    <pre class="Adresse">
        {{adresse}}
    </pre>
</template>

<script>
    export default {
        name: "Adresse",
        props: {
            'data': Array
        },
        computed: {
            adresse: function () {
                let retval = {};
                let p = this.data;
                if (p.length > 0) {
                    p = p[0];
                    retval = {
                        boBydel: p.boBydel,
                        bomatrBruksnr: p.bomatrBruksnr,
                        booffaBokstav: p.booffaBokstav,
                        boAdresse: p.boAdresse,
                        boAdresseTilDato: p.boAdresseTilDato,
                        bomatrFestenr: p.bomatrFestenr,
                        boAdressetillegg: p.boAdressetillegg,
                        booffaGateKode: p.booffaGateKode,
                        boPostnr: p.boPostnr,
                        bomatrGardsnr: p.bomatrGardsnr,
                        boKodeLand: p.boKodeLand,
                        boAdresseKilde: p.boAdresseKilde,
                        booffaBolignr: p.booffaBolignr,
                        booffaHusnr: p.booffaHusnr,
                        boKommune: p.boKommune,
                        bomatrUndernr: p.bomatrUndernr,
                        boAdresseFraDato: p.boAdresseFraDato
                    }
                }
                return (Object.entries(retval).length !== 0) ? JSON.stringify(retval, null, 4) : null
            }
        }

    }
</script>

<style scoped>

</style>