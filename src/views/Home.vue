<template>
    <div class="home">
        <Result :data="data"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Result from '@/components/indexes/Result.vue'

    export default {
        name: 'home',
        components: {
            Result
        },
        props: {
          'data': Array
        }
    }
</script>

<style>
    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>
