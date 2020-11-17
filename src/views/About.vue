<template>
<main>
  <v-container>
    <h1>Specific Contry Page</h1>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="3">
         <v-text-field
            @keypress="fetchStats"
            v-model="countryInput"
            label="Search Country..."
            clearable
          ></v-text-field>
      </v-col>
    </v-row>

    <section>
      <v-row align="center" justify="center">
    <StartCard v-for="card in cards" :key="card" :bgColor="card.bgColor" :cardIcon="card.icon" :cardTitle="card.title" :cardAmount="card.amount" :cardAmountNew="card.amountNew"></StartCard>
    </v-row>
    </section>
  </v-container>
</main>
</template>

<script>

import StartCard from '../components/StartCard'
export default {
  data(){
    return{
      name: 'About',
      components: {StartCard},
      countryInput: '',
      country: null,
      cards: [
        {
          title: 'total cases', bgColor: 'blue lighten-2', amount: 0, amountNew: 0, icon: 'mdi-alert-box'
        },
         {
          title: 'deaths', bgColor: 'red accent-2', amount: 0, amountNew: 0, icon: 'mdi-alpha-f-box'
        },
         {
          title: 'recoveries', bgColor: 'teal lighten-1', amount: 0, amountNew: 0, icon: 'mdi-hospital'
        }
        ],
        visuals: []
    }
  },
  methods: {
    fetchStats(e){
      if(e.key == "Enter"){
        this.axios
        .get(`https://corona.lmao.ninja/v2/countries/${this.countryInput}`)
        .then(response => { this.country = response; this.updateStats() })
        .catch(error => console.error(error))
      }
    },
    updateStats(){
      let data = this.country.data
      console.log(data)
    }
  }
}
</script>