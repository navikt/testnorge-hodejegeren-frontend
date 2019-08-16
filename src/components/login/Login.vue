<template>
    <div>
        <div v-if="!loggedIn">
            <b-form @submit="log_in" inline class="float-right">
                <b-form-group>
                    <b-form-input placeholder="username" id="username_input" v-model="username"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input placeholder="password" id="password_input" v-model="password"></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Login</b-button>
            </b-form>
        </div>
        <div v-if="loggedIn">
            <b-button class="float-right" variant="danger" @click="logout">Logout</b-button>
        </div>
    </div>
</template>

<script>


    import {mapGetters} from 'vuex'

    export default {
        name: "Login",
        computed: {
            ...mapGetters('login', {
                loggedIn: 'isLoggedIn'
            })
        },
        data() {
            return {
                username: null,
                password: null
            }
        },
        methods: {
            log_in(e) {
                e.preventDefault();
                this.$store.dispatch('login/doLogin', {
                    username: this.username,
                    password: this.password
                })
            },
            logout(e) {
                e.preventDefault();
                this.$store.dispatch('login/logout');
                this.username = null;
                this.password = null
            }
        }
    }
</script>

<style scoped>

</style>