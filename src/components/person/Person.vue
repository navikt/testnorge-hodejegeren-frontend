<template>
    <div class="Person">
        <div class="pointer" v-b-toggle="'item-' + this.id">
            <Navn :data="this.person.navn"/>
        </div>
        <b-collapse :id="'item-' + this.id" role="tabpanel">
            <b-container style="padding-top: 2%">
                <b-row>
                    <b-col cols="8">
                        <b-row>
                            <b-col>
                                <b-list-group>
                                    <b-list-group-item>
                                        <b>Kjønn</b>: {{kjoenn}}
                                    </b-list-group-item>
                                    <b-list-group-item>
                                        <b>Adresse</b>: {{adresse}}
                                    </b-list-group-item>
                                    <b-list-group-item>
                                        <b>Fødselsdato</b>: {{alder}}
                                    </b-list-group-item>
                                    <b-list-group-item v-if="_relasjoner.length > 0">
                                        <div v-for="(relasjon, index) in _relasjoner" :key="index">
                                            <b>{{relasjon.rolle}}</b>: {{relasjon.ident}}
                                        </div>
                                    </b-list-group-item>
                                </b-list-group>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <b-row>
                            <img :src="'https://avatars.dicebear.com/v2/' + this.kjoenn_image + '/' + this.id + '.svg'"
                                 alt="Kul avatar!">
                        </b-row>
                        <b-row>

                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </b-collapse>
    </div>
</template>

<script>
    import Navn from "@/components/person/Navn";

    export default {
        name: "Person",
        props: {
            person: Object,
            id: String,
            relasjoner: Array
        },
        components: {
            Navn
        },
        computed: {
            kjoenn_image: function () {
                let k = this.person.personInfo[0].personKjonn;
                if (k === 'M') {
                    return 'male'
                } else {
                    return 'female'
                }
            },
            kjoenn: function () {
                let k = this.person.personInfo[0].personKjonn;
                if (k === 'M') {
                    return 'mann'
                } else {
                    return 'kvinne'
                }
            },
            adresse: function () {
                if (!this.person.boadresse || this.person.boadresse.length === 0) {
                    return "INGEN ADRESSE"
                }
                let a = this.person.boadresse[0];
                let adresse = a.boAdresse;
                if (adresse.trim() === "") {
                    adresse = "Ingen gyldig adresse"
                }
                return adresse + " " + a.boKommune
            },
            alder: function () {
                return this.person.personInfo[0].personDatofodt
            },
            _relasjoner: function () {
                let result = [];
                this.relasjoner.forEach(function (item) {
                    switch (item.relasjonRolle) {
                        case 'MORA':
                            item.relasjonRolle = 'Mor';
                            break;
                        case 'FARA':
                            item.relasjonRolle = 'Far';
                            break;
                        case 'EKTE':
                            item.relasjonRolle = 'Ektefelle';
                            break;
                        default:
                            break;
                    }
                    result.push({
                        rolle: item.relasjonRolle,
                        ident: item.relasjonIdent
                    })
                });
                return result
            }
        }
    }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>