<template>
    <div>
        <b-form-group :description="query.description" :label="query.label"
                      :label-for="'field' + index">
            <b-row>
                <b-col>
                    <b-form-select :id="'data-select' + index" v-model="query.field_name['terms']">
                        <option :value="null">Please select a field or write the fully qualified field name in the input
                            to the right
                        </option>
                        <optgroup :label="k" v-for="(k, index) in Object.keys(groups)" :key="index">
                            <option v-for="(opt, i) in groups[k]" :value="k + '.' + opt.name" :key="i">{{opt.name}}</option>
                        </optgroup>
                    </b-form-select>
                </b-col>
                <b-col>
                    <b-form-input :id="'field' + index"
                                  v-model="query.field_name"></b-form-input>
                </b-col>
            </b-row>
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