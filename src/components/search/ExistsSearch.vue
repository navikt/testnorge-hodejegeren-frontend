<template>
    <div>
        <b-form-group :label-for="'value' + index">
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
    </div>
</template>

<script>
    export default {
        name: "ExistsSearch",
        props: {
            'query': Object,
            'index': String,
            'groups': Object,
        }
    }
</script>

<style scoped>

</style>