<template>
    <div class="result">
        <b-tabs>
            <SKD :data="data"></SKD>
            <b-tab title="INST">

            </b-tab>
            <b-tab title="SAM">

            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
    import SKD from "@/components/indexes/SKD";

    export default {
        name: 'Result',
        props: {
            'data': Array
        },
        components: {
            SKD
        },
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    a {
        color: #42b983;
    }
</style>
