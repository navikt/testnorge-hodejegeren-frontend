<template>
    <b-tab title="SKD">
        <b-list-group>
            <b-list-group-item class="pointer" v-for="(item, index) in data" :key="index">
                <Person :person="item.person" :relasjoner="item.relasjon" :id="item._id"></Person>
            </b-list-group-item>
        </b-list-group>
    </b-tab>
</template>

<script>

    import Person from '@/components/person/Person'

    export default {
        name: "SKD",
        components: {
            Person
        },
        props: {
            'data': Array
        }
    }
</script>

<style scoped>

</style>