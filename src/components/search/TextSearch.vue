<template>
    <div>
        <b-form-group :description="query.description" :label="query.label"
                      :label-for="'field' + index">
            <b-form-input :id="'field' + index"
                          v-model="query.field_name"></b-form-input>
        </b-form-group>
        <b-form-group :label-for="'value' + index">
            <b-form-input :id="'value' + index"
                          v-model="query.content"></b-form-input>
        </b-form-group>
    </div>
</template>

<script>
    export default {
        name: "TextSearch",
        props: {
            'query': Object,
            'index': String
        }
    }
</script>

<style scoped>

</style>