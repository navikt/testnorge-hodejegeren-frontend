<template>
    <b-navbar class="footer" type="light">
        <b-container>
            <b-row>
                <b-nav-text>Hodejegeren for personer i Mini-Norge</b-nav-text>
            </b-row>
            <b-row>
                <b-nav-text><a href="https://www.nav.no">NAV.no</a></b-nav-text>
            </b-row>
        </b-container>
    </b-navbar>
</template>

<script>
    export default {
        name: "FooterNavBar"
    }
</script>

<style scoped>
 .footer {
     position: absolute;
     bottom: 0;
     width: 100%;
     height: 2.5rem;
     padding-top: 2%;
 }
</style>