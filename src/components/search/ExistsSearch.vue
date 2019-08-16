<template>
    <div>
        <b-form-group :label-for="'value' + index">
            <b-form-input :id="'value' + index"
                          v-model="query.content"></b-form-input>
        </b-form-group>
    </div>
</template>

<script>
    export default {
        name: "ExistsSearch",
        props: {
            'query': Object,
            'index': String
        }
    }
</script>

<style scoped>

</style>