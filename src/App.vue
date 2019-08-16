<template>
    <div id="app">
        <NavigationBar></NavigationBar>
        <b-container>
            <router-view>
            </router-view>
        </b-container>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        /*margin-top: 60px;*/
    }
</style>
<script>
    import NavigationBar from "@/components/HeaderNavBar";

    export default {
        components: {NavigationBar}
    }
</script>