<template>
    <div class="PersonStatus">
        <p>
            {{status.personStatus}}
            <br>
            {{status.personStatusKilde}}
        </p>
    </div>
</template>

<script>
    export default {
        name: "PersonStatus",
        props: {
            'data': Array
        },
        computed: {
            status: function () {
                let retval = {};
                let p = this.data;
                if (p.length > 0) {
                    p = p[0];
                    retval = {
                        personStatus: p.personStatus,
                        personStatusFraDato: p.personStatusFraDato,
                        personStatusTilDato: p.personStatusTilDato,
                        personStatusKilde: p.personStatusKilde
                    };
                }
                return (Object.entries(retval).length !== 0) ? retval : null;
            },
        }
    }
</script>

<style scoped>

</style>