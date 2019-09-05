<template>
    <div class="FormSelector">
        <b-form-group :description="query.description" :label="query.label"
                      :label-for="'field' + index">
            <b-row>
                <b-col>
                    <b-form-select :id="'data-select' + index" v-model="query.field_name">
                        <option :value="null">Please select a field or write the fully qualified field name in the input
                            to the right
                        </option>
                        <optgroup :label="k" v-for="(k, index) in Object.keys(groups)" :key="index">
                            <option v-for="(opt, i) in groups[k]" :value="create_name(opt.name, k)" :key="i">
                                {{opt.name}}
                            </option>
                        </optgroup>
                    </b-form-select>
                </b-col>
                <b-col>
                    <b-form-input :id="'field' + index"
                                  v-model="query.field_name"></b-form-input>
                </b-col>
            </b-row>
        </b-form-group>
    </div>
</template>

<script>
    export default {
        name: "FieldSelector",
        props: {
            'query': Object,
            'groups': Object,
            'index': String,
        },
        data() {
            return {
                parent_name: '',
                name: ''
            }
        },
        methods: {
            create_name: function (name, parent_name) {
                if (parent_name === 'relasjon' || parent_name === 'person' || parent_name === 'dokument') {
                    return parent_name + '.' + name;
                }
                return name;
            }
        },
    }
</script>

<style scoped>

</style>