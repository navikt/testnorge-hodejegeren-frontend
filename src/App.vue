<template>
    <div id="app">
        <NavigationBar></NavigationBar>
        <b-container>
            <router-view>
            </router-view>
        </b-container>
        <FooterNavBar></FooterNavBar>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        position: relative;
        min-height: 100vh;
        /*margin-top: 60px;*/
    }
</style>
<script>
    import NavigationBar from "@/components/HeaderNavBar";
    import FooterNavBar from "@/FooterNavBar";

    export default {
        components: {FooterNavBar, NavigationBar}
    }
</script>