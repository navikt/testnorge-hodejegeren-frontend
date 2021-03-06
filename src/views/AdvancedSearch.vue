<template>
    <b-container class="advancedSearch">
        <div v-b-toggle="'search_bar'">
            <h4 style="cursor: pointer">Search</h4>
        </div>
        <b-collapse v-if="loggedIn" id="search_bar" role="tabpanel" visible>
            <b-row>
                <b-col :cols="show_debug ? 8 : 12">
                    <b-list-group>
                        <b-form @submit="onSubmit" @input="make_query(query_statement)">
                            <b-list-group-item v-for="(query, index) in form.queries" :key="index.toString()">
                                <b-row>
                                    <b-col cols="10">
                                        <div class="pointer" v-b-toggle="'item-' + index.toString()">
                                            <h4 style="cursor: pointer">{{query.display_name}}</h4>
                                        </div>
                                        <b-collapse :id="'item-' + index.toString()" role="tabpanel" visible>
                                            <TextSearch v-if="query.field_type === 'text'" :query="query"
                                                        :index="index.toString()" :groups="text_fields">
                                            </TextSearch>
                                            <ExistsSearch v-if="query.field_type === 'exists'" :query="query"
                                                          :index="index.toString()" :groups="all_fields">
                                            </ExistsSearch>
                                            <TermsSearch v-if="query.field_type === 'terms'" :query="query"
                                                         :index="index.toString()" :groups="text_fields">
                                            </TermsSearch>
                                            <RangeSearch v-if="query.field_type === 'range'" :query="query"
                                                         :index="index.toString()" :groups="date_fields">
                                            </RangeSearch>
                                        </b-collapse>
                                    </b-col>
                                    <b-col>
                                        <b-button class="float-right" variant="danger" @click="remove_query(index)">
                                            <font-awesome-icon icon="minus"></font-awesome-icon>
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </b-list-group-item>
                            <b-dropdown class="float-right" right split @click="add_query"
                                        :text="'Add ' + active_query_type + ' query'" variant="primary">
                                <b-dropdown-item @click="active_query_type = item"
                                                 v-for="(item, index) in Object.keys(query_types)"
                                                 :key="index">{{item}}
                                </b-dropdown-item>
                            </b-dropdown>
                        </b-form>
                    </b-list-group>
                </b-col>
                <b-col v-if="show_debug">
                    <div class="border border-secondary" v-if="current_error !== null">
                        <p>
                            {{error_texts[current_error.response.status]}}
                        </p>
                    </div>
                    <div class="border border-secondary">
                        <br>
                        <pre v-if="debug.show_query">{{JSON.stringify(query_statement, null, 4)}}</pre>
                        <pre v-else-if="debug.show_data_model">{{JSON.stringify(data_model, null, 4)}}</pre>
                        <pre v-else-if="debug.show_field_output">{{JSON.stringify(all_fields, null, 4)}}</pre>
                    </div>
                </b-col>
            </b-row>
        </b-collapse>
        <Result v-if="loggedIn" :data="data"></Result>
    </b-container>
</template>


<script>

    import axios from 'axios';
    import TextSearch from "@/components/search/TextSearch";
    import ExistsSearch from "@/components/search/ExistsSearch";
    import TermsSearch from "@/components/search/TermsSearch";
    import Result from "@/components/indexes/Result";
    import RangeSearch from "@/components/search/RangeSearch";
    import {mapGetters} from 'vuex'

    export default {
        components: {RangeSearch, Result, TermsSearch, ExistsSearch, TextSearch},
        data() {
            return {
                data_model: null,
                result_size: 20,
                result_from: 0,
                debug: {
                    show_query: true,
                    show_data_model: false,
                    show_field_output: false
                },
                data: null,
                form: {
                    queries: []
                },
                active_query_type: 'Match',
                query_types: {
                    'Match': {
                        description: 'Match single value to field.',
                        return_type: 'Bool',
                        query_type_name: 'match'
                    },
                    'Match phrase': {
                        description: 'Match entire value to a field.',
                        return_type: 'Scored',
                        query_type_name: 'match_phrase'
                    },
                    'Match phrase prefix': {
                        description: 'Match entire value to a field, matches on start of words.',
                        return_type: 'Scored',
                        query_type_name: 'match_phrase_prefix'
                    },
                    // 'Query string query': {
                    //     description: 'Match multiple words to a field. Can be joined by operators AND and OR.',
                    //     return_type: 'Scored',
                    //     example: 'this AND that OR thus',
                    //     query_type_name: 'query_string_query'
                    // },
                    // 'Term': {
                    //     description: 'Find documents which contain the exact term specified in the field specified.',
                    //     return_type: 'Bool',
                    //     query_type_name: 'term'
                    // },
                    // 'Terms': {
                    //     description: 'Find documents which contain any of the exact terms specified in the field specified.',
                    //     return_type: 'Bool',
                    //     query_type_name: 'terms'
                    // },
                    'Range': {
                        description: 'Find documents where the field specified contains values (dates, numbers, or strings) in the range specified',
                        return_type: 'Bool',
                        query_type_name: 'range'
                    },
                    'Exists': {
                        description: 'Find documents where the field specified contains any non-null (Null, field does not exist, empty array) value.',
                        return_type: 'Bool',
                        query_type_name: 'exists'
                    }
                },
                current_error: null,
                error_texts: {
                    204: 'Could not find any data matching the query',
                    400: 'Could not find any data matching the query',
                    500: 'Internal server error, something went wrong, please contact the administrators on #team_zynt or #dolly'
                },
            }
        },
        computed: {

            ...mapGetters('login', {
                auth: 'loginInfo',
                loggedIn: 'isLoggedIn'
            }),

            show_debug: function () {
                return this.debug.show_query || this.debug.show_data_model || this.debug.show_field_output
            },

            possible_field_names: function () {
                if (!this.data_model) {
                    return {}
                }
                return this.remap_fields();
            },

            text_fields: function () {
                return this.get_fields('text')
            },

            date_fields: function () {
                return this.get_fields('date')
            },

            all_fields: function () {
                let text = this.get_fields('text');
                let date = this.get_fields('date');
                let result = text;
                Object.keys(text).forEach(k => {
                    if (date.hasOwnProperty(k)) {
                        result[k] = {...text[k], ...date[k]};
                    }
                });

                return result
            },

            query_statement: function () {
                let q = {
                    'bool': {
                        'must': []
                    }
                };

                this.form.queries.forEach(function (query) {
                    let field_name = query.field_name;
                    let query_type = query.type.toLowerCase();
                    let content = query.content;
                    q['bool']['must'].push({
                        [query_type]: {
                            [field_name]: content
                        }
                    });
                });

                return q
            }
        },
        methods: {
            add_query: function () {
                let type = this.query_types[this.active_query_type].query_type_name;
                let field_name = '';
                let content = '';
                let description = this.query_types[this.active_query_type].description;
                let label = this.query_types[this.active_query_type].label;
                let display_name = this.active_query_type;
                let field_type = '';
                switch (type) {
                    case "match":
                    case "match_phrase":
                    case "match_phrase_prefix":
                    case "query_string_query":
                    case "term":
                        field_type = 'text';
                        break;
                    case "exists":
                        field_type = 'exists';
                        field_name = 'field';
                        break;
                    case "terms":
                        content = [''];
                        // field_type = 'terms';
                        break;
                    case "range":
                        field_type = 'range';
                        content = {};
                        break;
                    default:
                        return;
                }

                let input_field = {
                    field_name,
                    content,
                    description,
                    label,
                    type,
                    field_type,
                    display_name
                };
                this.form.queries.push(
                    input_field
                )
            },

            remove_query: function (index) {
                this.form.queries.splice(index, 1);
                if (this.form.queries.length === 0) {
                    this.data = null
                }
            },

            onSubmit: function (event) {

                event.preventDefault();

                let query = this.query_statement;
                this.make_query(query);
                if (this.data !== '') {
                    this.$router.push({name: 'result', params: {'data': this.data}})
                }
            },
            make_query: function (query) {
                this.current_error = null;
                axios.post('http://34.95.110.244/api/v1/skd/_search' + '?size=' + this.result_size + '&from=' + this.result_from, query,
                    {
                        auth: this.auth
                    })
                    .then(response => {
                        this.data = response.data;
                        if (response.status === 204) {
                            this.current_error = {
                                response: {
                                    status: 204
                                }
                            };
                            this.data = null
                        }
                    }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    this.current_error = error
                })
            },
            request_model: function () {
                axios.get('http://34.95.110.244/api/v1/_mapping',
                    {
                        auth: this.auth
                    })
                    .then(response => {
                        this.data_model = response.data
                    })
                    .catch(reason => {
                        // eslint-disable-next-line no-console
                        console.log(reason)
                    })
            },

            extract_fields: function (person) {
                let result = {};
                Object.keys(person).forEach(pk => {
                    if (pk === 'telefon') {
                        result[pk] = {};
                        Object.keys(person[pk]['properties']).forEach(tlf_k => {
                            result[pk][tlf_k] = person[pk]['properties'][tlf_k]['properties']
                        })
                    } else {
                        result[pk] = person[pk]['properties']
                    }
                });
                return result;
            },
            remap_fields: function () {
                let result = {};
                Object.keys(this.data_model).forEach(k => {
                    result[k] = {};
                    let data_begins = this.data_model[k]['mappings']['_doc']['properties'];
                    switch (k.toLowerCase()) {
                        case 'skd':
                            result[k]['dokument'] = data_begins['dokument']['properties'];
                            result[k]['relasjon'] = data_begins['relasjon']['properties'];
                            // eslint-disable-next-line no-case-declarations
                            let person = data_begins['person']['properties'];
                            result[k]['person'] = this.extract_fields(person);
                            break;
                        case 'relasjon':
                            // result[k] = data_begins['relasjoner']['properties'];
                            break;
                        case 'person':
                            break;
                        case 'dokument':
                            break;
                        case 'inst':
                        case 'sam':
                            result[k] = data_begins;
                            break;

                    }
                });
                return result;
            },
            find_field: function (type, fields, k) {
                let result = {};
                if (k === 'skd') {
                    Object.keys(fields[k]).forEach(skd_key => {
                        result[skd_key] = [];
                        if (skd_key === 'person') {
                            Object.keys(fields[k][skd_key]).forEach(person_key => {
                                if (person_key === 'telefon') {
                                    Object.keys(fields[k][skd_key][person_key]).forEach(tlf_type_key => {
                                            Object.keys(fields[k][skd_key][person_key][tlf_type_key]).forEach(tlf_values => {
                                                if (fields[k][skd_key][person_key][tlf_type_key][tlf_values].hasOwnProperty('type') &&
                                                    fields[k][skd_key][person_key][tlf_type_key][tlf_values]['type'] === type)
                                                    result['person'].push({
                                                        'name': person_key + '.' + tlf_type_key + '.' + tlf_values
                                                    });
                                            })
                                        }
                                    )
                                } else {
                                    if (fields[k][skd_key][person_key]) {
                                        Object.keys(fields[k][skd_key][person_key]).forEach(person_value_key => {
                                            if (fields[k][skd_key][person_key][person_value_key].hasOwnProperty('type')
                                                && fields[k][skd_key][person_key][person_value_key]['type'] === type) {
                                                result['person'].push({
                                                    'name': person_key + '.' + person_value_key
                                                });
                                            }
                                        })
                                    }
                                }
                            })
                        } else {
                            Object.keys(fields[k][skd_key]).forEach(skd_field_key => {
                                if (fields[k][skd_key][skd_field_key].hasOwnProperty('type')
                                    && fields[k][skd_key][skd_field_key]['type'] === type) {
                                    result[skd_key].push({
                                        'name': skd_field_key
                                    });
                                }
                            })
                        }
                    })
                } else {
                    result[k] = [];
                    Object.keys(fields[k]).forEach(key => {
                        if (fields[k][key]['type'] === type) {
                            result[k].push({
                                'name': key
                            })
                        }
                    })
                }
                return result;
            },
            get_fields: function (type) {
                if (!this.data_model) {
                    return {}
                }
                let result = {};
                let fields = this.remap_fields();
                Object.keys(fields).forEach(k => {
                    if (k === 'person' || k === 'relasjon' || k === 'dokument') {
                        return {}
                    }
                    result = {...result, ...this.find_field(type, fields, k)}
                });

                return result;
            }
        },
        watch: {
            loggedIn: function () {
                if (this.loggedIn) {
                    this.request_model()
                }
            }
        },
    }
</script>