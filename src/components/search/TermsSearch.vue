<template>
    <div>
        <b-form-group :description="query.description" :label="query.label"
                      :label-for="'field' + index">
            <b-form-input :id="'field' + index"
                          v-model="query.field_name['terms']"></b-form-input>
        </b-form-group>

        <b-list-group>
            <b-list-group-item v-for="(content, i) in query.content['terms']" :key="i.toString()">
                <b-form-group>
                    <b-form-input v-model="query.content['terms'][i]"></b-form-input>
                </b-form-group>
            </b-list-group-item>
        </b-list-group>

        <b-button variant="primary" @click="add_value_input">
            <font-awesome-icon icon="plus"></font-awesome-icon>
        </b-button>
        <b-button v-if="query.content.length > 0" variant="danger" @click="remove_value_input">
            <font-awesome-icon icon="minus"></font-awesome-icon>
        </b-button>
    </div>
</template>

<script>
    export default {
        name: "TermsSearch",
        props: {
            'query': Object,
            'index': String
        },
        methods: {
            add_value_input: function () {
                this.query.content.push('')
            },

            remove_value_input: function () {
                this.query.content.pop()
            }
        }
    }
</script>

<style scoped>

</style>