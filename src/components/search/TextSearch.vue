<template>
    <div>
        <b-form-group :description="query.description" :label="query.label"
                      :label-for="'field' + index">
            <b-row>
                <b-col>
                    <b-form-select :id="'data-select' + index" v-model="query.field_name">
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
            'index': String,
            'groups': Object,
        },
        methods: {
            is_option_group(possible_group) {
                return possible_group instanceof Object;
            }
        }
    }
</script>

<style scoped>

</style>