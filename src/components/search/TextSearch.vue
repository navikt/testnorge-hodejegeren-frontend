<template>
    <div>
        <FieldSelector :groups="groups" :index="index" :query="query" :field_name="query.field_name"></FieldSelector>
        <b-form-group :label-for="'value' + index">
            <b-form-input :id="'value' + index"
                          v-model="query.content"></b-form-input>
        </b-form-group>
    </div>
</template>

<script>
    import FieldSelector from "@/components/search/FieldSelector";
    export default {
        name: "TextSearch",
        components: {FieldSelector},
        props: {
            'query': Object,
            'index': String,
            'groups': Object,
        },
    }
</script>

<style scoped>

</style>