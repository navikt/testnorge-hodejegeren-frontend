<template>
    <div class="Navn">
        {{fullt_navn}}
    </div>
</template>

<script>
    export default {
        name: "Navn",
        props: {
            'data': Array
        },
        data () {
            return {
                navn: function () {
                    let retval = {};
                    let p = this.data;
                    if (p.length > 0) {
                        p = p[0];
                        retval = {
                            slektsNavn: p.slektsNavn,
                            forkortetNavn: p.forkortetNavn,
                            mellomNavn: p.mellomNavn,
                            forNavn: p.forNavn,
                            navnKilde: p.navnKilde,
                            navnRegistrertAv: p.navnRegistrertAv,
                            navnFraDato: p.navnFraDato,
                            navnTilDato: p.navnTilDato,
                            slektsNavnugift: p.slektsNavnugift
                        };
                    }
                    return (Object.entries(retval).length !== 0) ? retval : null
                }
            }
        },
        methods: {

        },
        computed: {
            fullt_navn: function () {
                let d = this.navn();
                return d.forNavn + " " + d.mellomNavn + " " + d.slektsNavn
            }
        }
    }
</script>

<style scoped>

</style>