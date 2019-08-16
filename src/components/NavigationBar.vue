<template>
    <b-navbar toggleable="lg" type="light">
        <b-navbar-brand href="#">Hodejegeren</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">Link</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <Login></Login>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    import Login from "@/components/login/Login";

    export default {
        name: "NavigationBar",
        components: {Login}
    }
</script>

<style scoped>

</style>