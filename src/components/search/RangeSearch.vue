<template>
    <div @change="set_data" @input="set_data">
        <FieldSelector :groups="groups" :index="index" :query="query" :field_name="query.field_name"></FieldSelector>

        <b-list-group>
            <b-list-group-item>
                <b-form-group label="After (inclusive)" label-for="gte">
                    <b-form-input :state="valid" id="gte" type="date" v-model="selected_values.gte"></b-form-input>
                </b-form-group>
            </b-list-group-item>
            <b-list-group-item>
                <b-form-group label="Before (inclusive)" label-for="lte">
                    <b-form-input :state="valid" id="lte" type="date" v-model="selected_values.lte"></b-form-input>
                </b-form-group>
            </b-list-group-item>
        </b-list-group>

    </div>
</template>

<script>

    import FieldSelector from "@/components/search/FieldSelector";
    export default {
        name: "RangeSearch",
        components: {FieldSelector},
        props: {
            'query': Object,
            'index': String,
            'groups': Object,
        },
        methods: {
            set_data: function () {
                this.query.content = this.range_query
            }
        },
        computed: {
            range_query: function () {
                let result = {};
                Object.keys(this.selected_values).forEach(key => {
                        if (this.selected_values[key] !== '') {
                            if (key === 'format') {
                                result[key] = this.selected_values[key];
                            } else {
                                result[key] = this.selected_values[key]

                            }
                        }
                    }
                );
                return result;
            },

            valid: function () {
                if (this.selected_values.gte !== '' && this.selected_values.lte !== '') {
                    let gte = new Date(this.selected_values.gte);
                    let lte = new Date(this.selected_values.lte);
                    if (gte > lte) {
                        return false;
                    }
                }
                return null;
            }
        },
        data() {
            return {
                range_parameter: '',
                selected_date: '',
                selected_values: {
                    'format': 'yyyy-MM-dd',
                    'gte': '',
                    'gt': '',
                    'lte': '',
                    'lt': ''
                }
            }
        },
    }
</script>

<style scoped>

</style>