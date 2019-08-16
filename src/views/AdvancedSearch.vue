<template>
    <b-container class="advancedSearch">
        <img alt="Vue logo" src="../assets/Logo-syntetiske_testdata.png">
        <div v-b-toggle="'search_bar'" style="cursor: pointer">
            <h4>Search</h4>
        </div>
        <b-collapse v-if="loggedIn" id="search_bar" role="tabpanel" visible>
            <b-row>
                <b-col :cols="debug ? 8 : 12">
                    <b-list-group>
                        <b-form @submit="onSubmit" @input="make_query(query_statement)">
                            <b-list-group-item v-for="(query, index) in form.queries" :key="index.toString()">
                                <b-row>
                                    <b-col cols="10">
                                        <div class="pointer" v-b-toggle="'item-' + index.toString()">
                                            <h4>{{query.display_name}}</h4>
                                        </div>
                                        <b-collapse :id="'item-' + index.toString()" role="tabpanel" visible>
                                            <TextSearch v-if="query.field_type === 'text'" :query="query"
                                                        :index="index.toString()">
                                            </TextSearch>
                                            <ExistsSearch v-if="query.field_type === 'exists'" :query="query"
                                                          :index="index.toString()">
                                            </ExistsSearch>
                                            <TermsSearch v-if="query.field_type === 'terms'" :query="query"
                                                         :index="index.toString()">
                                            </TermsSearch>
                                            <RangeSearch v-if="query.field_type === 'range'" :query="query"
                                                         :index="index.toString()">
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
                            <b-button type="submit" variant="success">Submit</b-button>
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
                <b-col v-if="debug">
                    <div class="border border-secondary">
                        <br>
                        <pre>{{JSON.stringify(query_statement, null, 4)}}</pre>
                    </div>
                    <div class="border border-secondary" v-if="current_error !== null">
                        <p>
                            {{error_texts[current_error.response.status]}}
                        </p>
                    </div>
                </b-col>
            </b-row>
        </b-collapse>
        <Result  v-if="loggedIn" :data="data"></Result>
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
                debug: false,
                data: [],
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
                    'Query string query': {
                        description: 'Match multiple words to a field. Can be joined by operators AND and OR.',
                        return_type: 'Scored',
                        example: 'this AND that OR thus',
                        query_type_name: 'query_string_query'
                    },
                    'Term': {
                        description: 'Find documents which contain the exact term specified in the field specified.',
                        return_type: 'Bool',
                        query_type_name: 'term'
                    },
                    'Terms': {
                        description: 'Find documents which contain any of the exact terms specified in the field specified.',
                        return_type: 'Bool',
                        query_type_name: 'terms'
                    },
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

            query_statement: function () {
                let q = {};

                this.form.queries.forEach(function (query) {
                    let field_name = query.field_name;
                    let query_type = query.type.toLowerCase();
                    let content = query.content;
                    q = {
                        [query_type]: {
                            [field_name]: content
                        }
                    }
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
                        field_type = 'terms';
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
                    this.data = []
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
                axios.post('http://34.95.110.244/api/v1/skd/_search', query,
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
                            }
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